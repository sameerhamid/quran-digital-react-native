import {StyleSheet, ViewStyle} from 'react-native';

type DetailsStylesTypes = {
  container: ViewStyle;
};

const styles = (): DetailsStylesTypes =>
  StyleSheet.create<DetailsStylesTypes>({
    container: {
      flex: 1,
    },
  });

export default styles;
