import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../common/routes/appNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useDetailsViewController from './useDetailsViewController';
import {NavScreenTags} from '../../common/constants/navScreenTags';
import styles from './styles';
import CustomHeader from '../../common/components/customHeader/customHeader.component';
import {Images} from '../../common/constants/Imges';
import {goBack} from '../../common/utils/navigatorUtils';
type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NavScreenTags.DETAIL_SCREEN
>;

const Detail: React.FC<DetailScreenProps> = ({route}) => {
  const {surahNumber} = route.params;
  const {surah} = useDetailsViewController(surahNumber);
  const stylesObj = styles();

  return (
    <SafeAreaView style={stylesObj.container}>
      <CustomHeader
        titlle={`${surah?.surah_name} (${surah?.surah_name_arabic})`}
        leftAccessories={Images.Icons.BACK}
        leftAccessoriesPress={goBack}
      />
      <Text>Detail</Text>
    </SafeAreaView>
  );
};

export default Detail;
