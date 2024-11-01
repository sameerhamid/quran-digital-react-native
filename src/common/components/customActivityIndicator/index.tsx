import {ActivityIndicator, Modal, View} from 'react-native';
import styles from './styles';

interface Props {
  visible?: boolean;
}

const defaultProps: Props = {
  visible: false,
};

// parent component of all apps to show common loader

const CustomActivityIndicator = (
  props: typeof defaultProps,
): React.ReactElement => {
  return (
    <Modal visible={props?.visible} transparent>
      <View style={styles.container}>
        <View style={styles.backgroundVw} />
        <View style={styles.mnVw}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default CustomActivityIndicator;
