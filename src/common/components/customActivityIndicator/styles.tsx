import {StyleSheet, ViewStyle} from 'react-native';

type Styles = {
  container: ViewStyle;
  backgroundVw: ViewStyle;
  mnVw: ViewStyle;
};

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVw: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mnVw: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

export default styles;
