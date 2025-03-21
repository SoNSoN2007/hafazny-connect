
// This file contains the verses of selected Surahs of the Quran for memorization
// In a production app, this would be fetched from an API or database

export type QuranVerse = {
  id: number;
  text: string;
  transliteration?: string;
  translation?: string;
};

export type QuranSurah = {
  id: number;
  name: string;
  arabicName: string;
  verses: QuranVerse[];
  hasBismillah: boolean;
};

// Bismillah text to be displayed at the beginning of most Surahs
export const bismillah = {
  arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  transliteration: "Bismillāhi r-raḥmāni r-raḥīm",
  translation: "In the name of Allah, the Most Gracious, the Most Merciful"
};

// Sample verses for Al-Fatiha
export const quranSurahs: QuranSurah[] = [
  {
    id: 1,
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    verses: [
      { id: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Most Gracious, the Most Merciful" },
      { id: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "All praise is due to Allah, Lord of the worlds" },
      { id: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Most Gracious, the Most Merciful" },
      { id: 4, text: "مَالِكِ يَوْمِ الدِّينِ", translation: "Master of the Day of Judgment" },
      { id: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help" },
      { id: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path" },
      { id: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray" }
    ],
    hasBismillah: true
  },
  {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    verses: [
      { id: 1, text: "الم", translation: "Alif, Lam, Meem" },
      { id: 2, text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah" },
      { id: 3, text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", translation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them" },
      { id: 4, text: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", translation: "And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith]" },
      { id: 5, text: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", translation: "Those are upon [right] guidance from their Lord, and it is those who are the successful" }
      // More verses would be added in a real application
    ],
    hasBismillah: true
  },
  {
    id: 112,
    name: "Al-Ikhlas",
    arabicName: "الإخلاص",
    verses: [
      { id: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One'" },
      { id: 2, text: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge" },
      { id: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born" },
      { id: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "Nor is there to Him any equivalent'" }
    ],
    hasBismillah: true
  }
  // More Surahs would be added in a real application
];

// Function to get surah by ID
export const getSurahById = (id: number): QuranSurah | undefined => {
  return quranSurahs.find(surah => surah.id === id);
};

// Function to get all verses of a specific surah
export const getSurahVerses = (surahId: number): QuranVerse[] => {
  const surah = getSurahById(surahId);
  return surah ? surah.verses : [];
};

// Function to check if a surah has Bismillah
export const hasBismillah = (surahId: number): boolean => {
  const surah = getSurahById(surahId);
  // All Surahs except Surah At-Tawbah (9) begin with Bismillah
  return surah ? surah.hasBismillah : (surahId !== 9);
};
