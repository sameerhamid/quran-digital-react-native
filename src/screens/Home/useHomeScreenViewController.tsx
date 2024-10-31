import QuranKemenag from 'quran-kemenag';
import {Surah} from 'quran-kemenag/dist/intefaces';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {navigate} from '../../common/utils/navigatorUtils';
import {NavScreenTags} from '../../common/constants/navScreenTags';

interface HomeScreenViewTypes {
  listOfSurah: Surah[] | undefined;
  onSurahItemPress: () => void;
}
const useHomeScreenViewController = (): HomeScreenViewTypes => {
  // ----------- states----------
  const [listOfSurah, setListOfSurah] = useState<Surah[]>();

  // ------------ handlers----------

  const onSurahItemPress = (): void => {
    navigate(NavScreenTags.DETAIL_SCREEN);
  };

  // ---------side effects---------

  const getData = async (): Promise<void> => {
    const quran = new QuranKemenag();
    const data = await quran.getListSurah();
    setListOfSurah(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    listOfSurah,
    onSurahItemPress,
  };
};

export default useHomeScreenViewController;