import {
  FlexAlignType,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Colors from '../../constants/Color.constants';

type Styles = {
  container: ViewStyle;
  leftContainer: ViewStyle;
  leftImgVw: ViewStyle;
  leftImg: ImageStyle;
  middleContainer: ViewStyle;
  titleTxt: TextStyle;
  rightContainer: ViewStyle;
  rightImgVw: ViewStyle;
  rightImg: ImageStyle;
};

const styles = (
  headerTextAlignment: FlexAlignType | undefined = 'center',
  marginHorizontal: number = 10,
): Styles =>
  StyleSheet.create<Styles>({
    container: {
      backgroundColor: 'white', // Ensure there's a background color
      shadowColor: Colors.grey2, // iOS shadow color
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 1,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
    },
    leftContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    leftImgVw: {
      height: 28,
      width: 28,
      justifyContent: 'center',
      padding: 15,
    },
    leftImg: {
      height: 28,
      width: 28,
      resizeMode: 'contain',
      alignSelf: 'center',
      tintColor: Colors.purple1,
    },
    middleContainer: {
      flex: 1,
      alignItems: headerTextAlignment,
      justifyContent: 'center',
      marginHorizontal: marginHorizontal,
    },
    titleTxt: {
      fontSize: 22,
      color: Colors.purple1,
      fontWeight: 'bold',
    },
    rightContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    rightImgVw: {
      height: 28,
      width: 28,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    rightImg: {
      height: 28,
      width: 28,
      resizeMode: 'contain',
      alignSelf: 'center',
      tintColor: Colors.purple1,
    },
  });

export default styles;
