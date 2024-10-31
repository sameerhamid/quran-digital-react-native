import QuranKemenag from 'quran-kemenag';
import {Surah, Verse} from 'quran-kemenag/dist/intefaces';
import {useEffect, useState} from 'react';

interface DetailViewControllerTypes {
  surah: Surah | undefined;
  verses: Verse[] | [];
}

const useDetailsViewController = (
  surahNumber: number,
): DetailViewControllerTypes => {
  // ----------- states----------
  const [surah, setSurah] = useState<Surah>();
  const [verses, setVerses] = useState<Verse[]>([]);

  // ----------- side effects-----------
  const getSurah = async (): Promise<void> => {
    const quran = new QuranKemenag();
    const data = await quran.getSurah(surahNumber);
    setSurah(data);
    setVerses(data.verses || []);
  };

  useEffect(() => {
    getSurah();
  }, []);

  return {
    surah,
    verses,
  };
};

export default useDetailsViewController;
