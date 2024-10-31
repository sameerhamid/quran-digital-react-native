import QuranKemenag from 'quran-kemenag';
import {Surah, Verse} from 'quran-kemenag/dist/intefaces';
import {useEffect, useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
interface DetailViewControllerTypes {
  surah: Surah | undefined;
  verses: Verse[] | [];
  togglePlayPause: (index: number) => void;
  playingIndex: number | undefined;
  isLoadingAudio: boolean;
}

const useDetailsViewController = (
  surahNumber: number,
): DetailViewControllerTypes => {
  // ----------- states----------
  const [surah, setSurah] = useState<Surah>();
  const [verses, setVerses] = useState<Verse[]>([]);
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
    if (playingIndex || playingVerse) {
      await pauseSound();
    } else {
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

  useEffect(() => {
    getSurah();

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
  };
};

export default useDetailsViewController;
