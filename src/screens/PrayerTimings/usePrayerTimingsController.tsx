import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {CalculationMethod, Coordinates, PrayerTimes} from 'adhan';
import PermissionUtils from '../../common/utils/permissionUtils';
//@ts-ignore
import HijriDate from 'hijri-date/lib/safe';

// Mapping of Hijri month numbers to Arabic names
const hijriMonthNames = [
  'محرّم', // 1
  'صفر', // 2
  'ربيع الأوّل', // 3
  'ربيع الآخر', // 4
  'جمادى الأولى', // 5
  'جمادى الآخرة', // 6
  'رجب', // 7
  'شعبان', // 8
  'رمضان', // 9
  'شوّال', // 10
  'ذو القعدة', // 11
  'ذو الحجة', // 12
];
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

// Format the current date to "Friday 01-11-24"
const formatCurrentDay = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {weekday: 'long'};
  const dayName = date.toLocaleDateString('en-US', options);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  return `${dayName} ${formattedDate}`;
};

interface PrayerTimingsControllerTypes {
  prayerTimes: PrayerTime[];
  error: string | null;
  loading: boolean;
  islamicDate: string | null;
  city: string | null;
  currentDay: string;
}

const usePrayerTimingsController = (): PrayerTimingsControllerTypes => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [islamicDate, setIslamicDate] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<string>(
    formatCurrentDay(new Date()), // Use the formatting function here
  );

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
          async position => {
            const {latitude, longitude} = position.coords;
            const date = new Date();
            const coordinates = new Coordinates(latitude, longitude);

            // Set the Islamic (Hijri) date
            const hijriDate = new HijriDate();
            const monthName = hijriMonthNames[hijriDate.getMonth()]; // Get the Arabic month name
            const formattedIslamicDate = `${hijriDate.getDate()} ${monthName} ${hijriDate.getFullYear()}`;
            setIslamicDate(formattedIslamicDate);

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

  return {prayerTimes, error, loading, islamicDate, city, currentDay};
};

export default usePrayerTimingsController;
