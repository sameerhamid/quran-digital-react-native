import {Platform, PermissionsAndroid} from 'react-native';

export class PermissionUtils {
  // Static method to check and request location permission on Android
  static async requestLocationPermissionAndroid(): Promise<boolean> {
    if (Platform.OS === 'android') {
      // Check if permission has already been granted
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (hasPermission) {
        return true; // Permission already granted
      }

      // Request permission if not granted
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // Assume permission granted for iOS
  }
}

export default PermissionUtils;
