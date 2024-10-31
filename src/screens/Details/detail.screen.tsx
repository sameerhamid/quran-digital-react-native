import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../common/routes/appNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useDetailsViewController from './useDetailsViewController';
import {NavScreenTags} from '../../common/constants/navScreenTags';
import styles from './styles';
import CustomHeader from '../../common/components/customHeader/customHeader.component';
import {Images} from '../../common/constants/Imges';
import {goBack} from '../../common/utils/navigatorUtils';
import {Box, ScaledText} from 'urip-rn-kit';
import {Verse} from 'quran-kemenag/dist/intefaces';
import Colors from '../../common/constants/Color.constants';
type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NavScreenTags.DETAIL_SCREEN
>;

const Detail: React.FC<DetailScreenProps> = ({route}) => {
  const {surahNumber} = route.params;
  const {surah, verses} = useDetailsViewController(surahNumber);
  const stylesObj = styles();

  const renderCard = (): React.JSX.Element => {
    return (
      <ImageBackground
        source={Images.BACKGROUND}
        style={stylesObj.cardContainer}>
        <ScaledText size={22} bold>
          {`${surah?.surah_name} - ${surah?.surah_name_arabic}`}
        </ScaledText>
        <ScaledText size={18}>{surah?.surah_name_bahasa}</ScaledText>
        <View style={stylesObj.spacer} />
        <ScaledText
          size={14}>{`${surah?.surah_verse_count} VERSES`}</ScaledText>
      </ImageBackground>
    );
  };

  const renderVerseItem = (verse: Verse, index: number) => {
    return (
      <View style={stylesObj.verseContainer}>
        <View style={stylesObj.verseHead}>
          <View style={stylesObj.verseNum}>
            <ScaledText size={12} bold>
              {index + 1}
            </ScaledText>
          </View>
          <View style={stylesObj.verseActions}>
            <TouchableOpacity style={stylesObj.verseActionImgCont}>
              <Image
                source={Images.Icons.PLAY}
                style={stylesObj.verseActionImg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={stylesObj.verseActionImgCont}>
              <Image
                source={Images.Icons.SHARE}
                style={stylesObj.verseActionImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesObj.verse}>
          <ScaledText color={Colors.greyDark} bold size={24}>
            {verse.verse_arabic}
          </ScaledText>
          <ScaledText color={Colors.greyDark} size={18}>
            {verse.verse_bahasa}
          </ScaledText>
        </View>
      </View>
    );
  };

  // main return
  return (
    <SafeAreaView style={stylesObj.container}>
      <CustomHeader
        titlle={`${surah?.surah_name} (${surah?.surah_name_arabic})`}
        leftAccessories={Images.Icons.BACK}
        leftAccessoriesPress={goBack}
      />
      <View style={stylesObj.contentContainer}>
        {renderCard()}

        <FlatList
          // contentContainerStyle={{marginTop: 20}}
          keyExtractor={v => `${v.verse_id}`}
          data={verses}
          renderItem={({item, index}: {item: Verse; index: number}) =>
            renderVerseItem(item, index)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Detail;
