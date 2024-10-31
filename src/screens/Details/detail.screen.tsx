import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../common/routes/appNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useDetailsViewController from './useDetailsViewController';
import {NavScreenTags} from '../../common/constants/navScreenTags';

type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NavScreenTags.DETAIL_SCREEN
>;

const Detail: React.FC<DetailScreenProps> = ({route}) => {
  const {surahNumber} = route.params;
  const {} = useDetailsViewController(surahNumber);
  return (
    <SafeAreaView>
      <Text>Detail</Text>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({});
