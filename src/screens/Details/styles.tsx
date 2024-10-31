import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import Colors from '../../common/constants/Color.constants';

type DetailsStylesTypes = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  spacer: ViewStyle;
  cardContainer: ImageStyle;
  verseContainer: ViewStyle;
  verseHead: ViewStyle;
  verseNum: ViewStyle;
  verseActions: ViewStyle;
  verseActionImgCont: ViewStyle;
  verseActionImg: ImageStyle;
  verse: ViewStyle;
};

const styles = (): DetailsStylesTypes =>
  StyleSheet.create<DetailsStylesTypes>({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    spacer: {
      height: 1,
      width: '80%',
      backgroundColor: Colors.grey1,
      columnGap: 20,
      marginTop: 4,
      marginBottom: 4,
    },
    cardContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      rowGap: 2,
      paddingVertical: 10,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,
    },
    verseContainer: {
      marginBottom: 16,
    },
    verseHead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: Colors.line,
      padding: 10,
      borderRadius: 10,
    },
    verseNum: {
      backgroundColor: Colors.purple1,
      width: 30,
      height: 30,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verseActions: {
      flexDirection: 'row',
      columnGap: 20,
    },
    verseActionImgCont: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
    },
    verseActionImg: {
      width: 30,
      height: 30,
      tintColor: Colors.purple1,
    },
    verse: {
      rowGap: 16,
      marginTop: 6,
      paddingHorizontal: 10,
      backgroundColor: Colors.grey1,
    },
  });

export default styles;
