import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import useHomeScreenViewController from './useHomeScreenViewController';
import {Box, ScaledText} from 'urip-rn-kit';
import {Surah} from 'quran-kemenag/dist/intefaces';
import styles from './styles';
import Colors from '../../common/constants/Color.constants';
import {Images} from '../../common/constants/Imges';

const Home = () => {
  const stylesObj = styles();
  const {listOfSurah, onSurahItemPress} = useHomeScreenViewController();

  const renderSurahItem = (surah: Surah) => {
    return (
      <TouchableOpacity style={stylesObj.row} onPress={onSurahItemPress}>
        <View style={stylesObj.left}>
          <Box
            backgroundImage={Images.NUM_BACKGROUND}
            alignCenter
            justifyCenter
            width={34}
            height={34}>
            <ScaledText color={Colors.grey2} size={10} bold>
              {surah.surah_id}
            </ScaledText>
          </Box>
          <View>
            <ScaledText size={18} bold color={Colors.greyDark}>
              {surah.surah_name}
            </ScaledText>
            <ScaledText
              color={Colors.grey2}
              size={14}>{`${surah.surah_verse_count} verses`}</ScaledText>
          </View>
        </View>
        <View>
          <ScaledText color={Colors.purple1} size={18} bold>
            {surah.surah_name_arabic}
          </ScaledText>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={stylesObj.container}>
      <FlatList
        data={listOfSurah}
        keyExtractor={s => `${s.surah_id}`}
        renderItem={({item}: {item: Surah}) => renderSurahItem(item)}
      />
    </SafeAreaView>
  );
};

export default Home;
