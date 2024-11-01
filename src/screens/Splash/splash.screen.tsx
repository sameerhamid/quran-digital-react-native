import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {replace} from '../../common/utils/navigatorUtils';
import {NavScreenTags} from '../../common/constants/navScreenTags';
import Colors from '../../common/constants/Color.constants';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  const animationRef = useRef<LottieView>(null);

  // Animations for opacity and scale
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim1 = useRef(new Animated.Value(0.8)).current; // Initial scale set to 0.8
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Scale for Lottie

  useEffect(() => {
    SplashScreen.hide();

    animationRef.current?.play();

    // Trigger animations in sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 1000,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim1, {
          toValue: 1,
          duration: 1000,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleAnimationFinish = () => {
    replace(NavScreenTags.BOTTOM_TABS);
  };

  return (
    <View style={styles.container}>
      {/* Lottie animation with scaling */}

      <LottieView
        style={styles.animation}
        ref={animationRef}
        source={require('./quran_digital_splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />

      {/* First text with fade and scale */}
      <Animated.Text
        style={[
          styles.welcomeText,
          {opacity: fadeAnim1, transform: [{scale: scaleAnim1}]},
        ]}>
        Welcome to Quran Digital
      </Animated.Text>

      {/* Second text with fade, scale, and slide */}
      <Animated.Text
        style={[
          styles.subtitleText,
          {
            opacity: fadeAnim2,
            transform: [{scale: scaleAnim2}, {translateY: slideAnim}],
          },
        ]}>
        Your companion in exploring the divine words
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple1,
    alignItems: 'center',
  },
  animation: {
    marginTop: 100,
    width: '100%',
    height: '55%',
  },
  welcomeText: {
    fontSize: 26,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitleText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Splash;
