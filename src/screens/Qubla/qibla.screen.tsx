import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Animated,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CompassHeading from 'react-native-compass-heading';
import {Images} from '../../common/constants/Imges';

const QIBLA_DIRECTION = 50; // The Qibla direction in degrees from North

const Qibla: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const rotateValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    requestLocationPermission();

    const updateFrequency = 0.5; // Frequency of compass updates in seconds
    const headingUpdate = CompassHeading.start(updateFrequency, ({heading}) => {
      setCompassHeading(heading);
      rotateValue.setValue(heading); // Directly update the heading for rotation
    });

    return () => {
      headingUpdate.stop();
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setError('Location permission denied');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        setError(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getQiblaDirection = (): number | null => {
    if (latitude === null || longitude === null || compassHeading === null)
      return null;
    const qiblaAngle = (QIBLA_DIRECTION - compassHeading + 360) % 360; // Calculate the Qibla angle
    return qiblaAngle;
  };

  const qiblaDirection = getQiblaDirection();

  // Interpolating the animated value for rotation
  const rotate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const qiblaRotate = qiblaDirection !== null ? `${qiblaDirection}deg` : '0deg';

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      {latitude !== null && longitude !== null ? (
        <View style={styles.info}>
          <Text style={styles.text}>Your Location:</Text>
          <Text style={styles.text}>Latitude: {latitude.toFixed(6)}</Text>
          <Text style={styles.text}>Longitude: {longitude.toFixed(6)}</Text>
          {qiblaDirection !== null && (
            <View style={styles.compass}>
              <Text style={styles.text}>
                Qibla Direction: {qiblaDirection.toFixed(2)}° from North
              </Text>
              <View style={styles.compassContainer}>
                <Animated.Image
                  source={Images.Icons.Qibla} // Make sure this image is a compass image
                  style={[styles.compassImage, {transform: [{rotate}]}]}
                />
                <Animated.Image
                  source={Images.Icons.ARROW_UP} // Path to your Qibla indicator image
                  style={[
                    styles.indicatorImage,
                    {transform: [{rotate: qiblaRotate}]},
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  info: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  compass: {
    alignItems: 'center',
  },
  compassContainer: {
    position: 'relative',
  },
  compassImage: {
    width: 100, // Adjust size as needed
    height: 100,
    transform: [{rotate: '0deg'}], // Initial rotation
  },
  indicatorImage: {
    width: 30, // Size of the indicator
    height: 30,
    position: 'absolute',
    top: '50%', // Center it vertically
    left: '50%', // Center it horizontally
    marginLeft: -15, // Half of the indicator's width
    marginTop: -15, // Half of the indicator's height
  },
  error: {
    color: 'red',
  },
});

export default Qibla;
