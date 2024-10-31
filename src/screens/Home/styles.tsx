import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from '../../common/constants/Color.constants';

type Styles = {
  container: ViewStyle;
  row: ViewStyle;
  left: ViewStyle;
};

const styles = (): Styles =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    row: {
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.grey2,
      paddingVertical: 10,
    },
    left: {
      flexDirection: 'row',
      columnGap: 20,
      alignItems: 'center',
    },
  });

export default styles;
