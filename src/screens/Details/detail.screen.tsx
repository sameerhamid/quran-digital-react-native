import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../common/routes/appNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useDetailsViewController, {VerseType} from './useDetailsViewController';
import {NavScreenTags} from '../../common/constants/navScreenTags';
import styles from './styles';
import CustomHeader from '../../common/components/customHeader/customHeader.component';
import {Images} from '../../common/constants/Imges';
import {goBack} from '../../common/utils/navigatorUtils';
import {ScaledText} from 'urip-rn-kit';
import {Verse} from 'quran-kemenag/dist/intefaces';
import Colors from '../../common/constants/Color.constants';
import CustomActivityIndicator from '../../common/components/customActivityIndicator';

type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NavScreenTags.DETAIL_SCREEN
>;

const Detail: React.FC<DetailScreenProps> = ({route}) => {
  const {surahNumber, totalVerses} = route.params;
  const {
    surah,
    verses,
    togglePlayPause,
    playingIndex,
    isLoadingAudio,
    newVerses,
    isLoading,
  } = useDetailsViewController(surahNumber, totalVerses);
  const stylesObj = styles();

  if (isLoading) {
    return <CustomActivityIndicator />;
  }

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

  const renderVerseItem = (verse: VerseType, index: number) => {
    return (
      <View style={stylesObj.verseContainer}>
        <View style={stylesObj.verseHead}>
          <View style={stylesObj.verseNum}>
            <ScaledText size={12} bold>
              {index + 1}
            </ScaledText>
          </View>
          <View style={stylesObj.verseActions}>
            <TouchableOpacity
              style={stylesObj.verseActionImgCont}
              onPress={() => togglePlayPause(index)}>
              {isLoadingAudio && playingIndex === index ? (
                <ActivityIndicator size="large" color={Colors.purple1} />
              ) : (
                <Image
                  source={
                    playingIndex === index
                      ? Images.Icons.PAUSE
                      : Images.Icons.PLAY
                  }
                  style={stylesObj.verseActionImg}
                />
              )}
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
            {verse.verse}
          </ScaledText>
          <ScaledText color={Colors.greyDark} size={18}>
            {verse.translation}
          </ScaledText>
          <ScaledText color={Colors.greyDark} size={18}>
            {verse.urduTranslation}
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
          contentContainerStyle={{paddingBottom: 200}}
          keyExtractor={verse => `${verse.id}`}
          data={newVerses}
          renderItem={({item, index}: {item: VerseType; index: number}) =>
            renderVerseItem(item, index)
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Detail;
