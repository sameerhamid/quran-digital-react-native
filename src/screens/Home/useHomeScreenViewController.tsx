import QuranKemenag from 'quran-kemenag';
import {Surah} from 'quran-kemenag/dist/intefaces';
import {useEffect, useState} from 'react';
import {navigate} from '../../common/utils/navigatorUtils';
import {NavScreenTags} from '../../common/constants/navScreenTags';
import {Chapter, Quran} from 'islam.js';
interface HomeScreenViewTypes {
  listOfSurah: Surah[] | undefined;
  onSurahItemPress: (surahId: number, versesCount: number) => void;
  chapters: Chapter[] | undefined;
}
const useHomeScreenViewController = (): HomeScreenViewTypes => {
  // ----------- states----------
  const [listOfSurah, setListOfSurah] = useState<Surah[]>();
  const [chapters, setChapters] = useState<Chapter[]>();

  // ------------ handlers----------

  const onSurahItemPress = (surahId: number, versesCount: number): void => {
    navigate(NavScreenTags.DETAIL_SCREEN, {
      surahNumber: surahId,
      totalVerses: versesCount,
    });
  };

  // ---------side effects---------

  const getData = async (): Promise<void> => {
    const quran = new QuranKemenag();
    const data = await quran.getListSurah();
    setListOfSurah(data);
  };

  // const getAllChapters = async (): Promise<void> => {
  //   const quran = new Quran();
  //   const data = await quran.getAllChapters();
  //   setChapters(data);
  // };

  useEffect(() => {
    // getAllChapters();
    getData();
  }, []);

  return {
    listOfSurah,
    onSurahItemPress,
    chapters,
  };
};

export default useHomeScreenViewController;
