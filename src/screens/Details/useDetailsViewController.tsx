import QuranKemenag from 'quran-kemenag';
import {Surah, Verse} from 'quran-kemenag/dist/intefaces';
import {useEffect, useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import {Quran, TranslationEnum} from 'islam.js';

export interface VerseType {
  id: number;
  verse: string;
  translation: string;
  urduTranslation: string;
}
interface DetailViewControllerTypes {
  surah: Surah | undefined;
  verses: Verse[] | [];
  togglePlayPause: (index: number) => void;
  playingIndex: number | undefined;
  isLoadingAudio: boolean;
  newVerses: VerseType[] | [];
}

const useDetailsViewController = (
  surahNumber: number,
  totolVerses: number,
): DetailViewControllerTypes => {
  // ----------- states----------
  const [surah, setSurah] = useState<Surah>();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [newVerses, setNewVerses] = useState<VerseType[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | undefined>();
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [playingVerse, setPlayingVerse] = useState<string | undefined>();

  // ----------  actions -------------

  const playSound = async (index: number): Promise<void> => {
    setIsLoadingAudio(true); // Set loading to true when starting to load audio
    setPlayingIndex(index);
    const url = verses[index].verse_audio;
    const match = url.match(/\/(\d{6})\.mp3$/);
    const audioCode = match ? match[1] : null;
    if (!audioCode) {
      return;
    }

    setPlayingVerse(audioCode);
    try {
      // Load audio file
      await SoundPlayer.loadUrl(
        `https://media.qurankemenag.net/audio/Abu_Bakr_Ash-Shaatree_aac64/${audioCode}.m4a`,
      );

      // Get audio duration
      const {duration} = await SoundPlayer.getInfo();

      SoundPlayer.play();

      // Stop loading when the audio is ready to play
      setIsLoadingAudio(false);

      // set isPlaying state false after audio is completed

      setTimeout(() => {
        setPlayingIndex(undefined);
      }, duration * 1000);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const pauseSound = async () => {
    setPlayingVerse(undefined);
    try {
      await SoundPlayer.pause();
      setPlayingIndex(undefined);
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  };

  const togglePlayPause = async (index: number) => {
    if (playingIndex === index && playingVerse) {
      // If the same index is clicked while audio is playing, pause it
      await pauseSound();
    } else {
      // Otherwise, play the new sound
      await playSound(index);
    }
  };

  // ----------- side effects-----------
  const getSurah = async (): Promise<void> => {
    const quran = new QuranKemenag();
    const data = await quran.getSurah(surahNumber);
    setSurah(data);
    setVerses(data.verses || []);
  };

  const getChapterByIndex = async (): Promise<void> => {
    const quran = new Quran();

    const verseNumbers = Array.from(
      {length: totolVerses},
      (_, index) => index + 1,
    );

    const versesWithTranslation = await Promise.all(
      verseNumbers.map(async verseNo => {
        // Fetch the verse data with translation
        const verseData = await quran.getMultipleVersesWithTranslation([
          {chapterNo: surahNumber, verseNo: verseNo},
        ]);

        // Fetch the Urdu translation
        const urduTranslation = await quran.getMultipleVersesWithTranslation(
          [{chapterNo: surahNumber, verseNo: verseNo}],
          TranslationEnum.Urdu,
        );

        // Return the combined object with both translations
        return {
          id: verseNo,
          ...verseData[0], // Original verse data
          urduTranslation: urduTranslation[0]?.translation || '', // Assuming the Urdu translation is stored in `text`
        };
      }),
    );

    setNewVerses(versesWithTranslation);
  };
  useEffect(() => {
    getSurah();
    getChapterByIndex();

    return () => {
      pauseSound(); // Pause audio when component unmounts
      setIsLoadingAudio(false);
      setPlayingIndex(undefined);
    };
  }, []);

  return {
    surah,
    verses,
    togglePlayPause,
    playingIndex,
    isLoadingAudio,
    newVerses,
  };
};

export default useDetailsViewController;
