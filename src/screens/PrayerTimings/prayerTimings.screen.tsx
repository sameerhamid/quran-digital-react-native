import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

import usePrayerTimingsController from './usePrayerTimingsController';
import CustomActivityIndicator from '../../common/components/customActivityIndicator';
import CustomHeader from '../../common/components/customHeader/customHeader.component';
import Colors from '../../common/constants/Color.constants';
import {Images} from '../../common/constants/Imges';

const PrayerTimesComponent: React.FC = () => {
  const {prayerTimes, error, loading, islamicDate, city, currentDay} =
    usePrayerTimingsController();

  if (loading) {
    return <CustomActivityIndicator />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <CustomHeader titlle="Prayer Timings" />

      <View style={styles.contentCont}>
        <ImageBackground style={styles.dayContainer} source={Images.BACKGROUND}>
          <Text style={styles.whiteTxt}>{islamicDate}</Text>
          <Text style={styles.whiteTxt}> {currentDay}</Text>
        </ImageBackground>
        <View style={styles.data}>
          <Text style={styles.primaryTxt}>Prayer</Text>
          <Text style={styles.primaryTxt}>Start time</Text>
          <Text style={styles.primaryTxt}>End time</Text>
        </View>
        {prayerTimes.map(prayer => (
          <View key={prayer.name} style={[styles.data, styles.row]}>
            <Text style={styles.name}>{prayer.name}</Text>
            <Text style={styles.start}>{prayer.startTime}</Text>
            <Text style={styles.end}>{prayer.endTime}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 70,
    paddingHorizontal: 14,
    borderRadius: 10,
    overflow: 'hidden',
  },
  primaryTxt: {
    color: Colors.purple1,
    fontWeight: 'bold',
    fontSize: 18,
  },

  contentCont: {
    padding: 20,
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  row: {
    backgroundColor: Colors.line,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.greyDark,
    flex: 1,
  },
  start: {
    color: Colors.green,
    flex: 1,
  },
  end: {
    color: Colors.danger,
  },
  whiteTxt: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default PrayerTimesComponent;
