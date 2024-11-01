// PrayerTimes.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import usePrayerTimingsController from './usePrayerTimingsController';

const PrayerTimesComponent: React.FC = () => {
  const {error, prayerTimes} = usePrayerTimingsController();

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prayer Times for Kashmir</Text>
      {prayerTimes.map(prayer => (
        <Text key={prayer.name} style={{color: 'black'}}>
          {prayer.name}: {prayer.startTime} - {prayer.endTime}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  error: {
    color: 'red',
  },
});

export default PrayerTimesComponent;
