import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {CalculationMethod, Coordinates, PrayerTimes} from 'adhan';
import PermissionUtils from '../../common/utils/permissionUtils';

interface PrayerTime {
  name: string;
  startTime: string;
  endTime: string;
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

interface PrayerTimingsControllerTypes {
  prayerTimes: PrayerTime[];
  error: string | null;
  loading: boolean;
}

const usePrayerTimingsController = (): PrayerTimingsControllerTypes => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      try {
        const hasPermission =
          await PermissionUtils.requestLocationPermissionAndroid();
        if (!hasPermission) {
          setError('Location permission denied');
          setLoading(false);
          return;
        }

        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const date = new Date();
            const coordinates = new Coordinates(latitude, longitude);

            const params = CalculationMethod.UmmAlQura();
            params.adjustments = {
              fajr: 2,
              sunrise: 2,
              dhuhr: 2,
              asr: 2,
              maghrib: 2,
              isha: 2,
            };

            const times = new PrayerTimes(coordinates, date, params);
            const prayerTimesArray: PrayerTime[] = [
              {
                name: 'Fajr',
                startTime: formatTime(times.fajr),
                endTime: formatTime(
                  new Date(times.fajr.getTime() + 90 * 60 * 1000),
                ),
              },
              {
                name: 'Dhuhr',
                startTime: formatTime(times.dhuhr),
                endTime: formatTime(times.asr),
              },
              {
                name: 'Asr',
                startTime: formatTime(times.asr),
                endTime: formatTime(times.maghrib),
              },
              {
                name: 'Maghrib',
                startTime: formatTime(times.maghrib),
                endTime: formatTime(times.isha),
              },
              {
                name: 'Isha',
                startTime: formatTime(times.isha),
                endTime: formatTime(times.fajr),
              },
            ];

            setPrayerTimes(prayerTimesArray);
            setLoading(false);
          },
          error => {
            setError('Failed to get location');
            setLoading(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } catch (err) {
        setError('Could not fetch prayer times');
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  return {prayerTimes, error, loading};
};

export default usePrayerTimingsController;
