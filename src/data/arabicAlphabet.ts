
// Arabic alphabet data with letter information
export interface ArabicLetter {
  letter: string;
  name: string;
  transliteration: string;
  audioUrl: string;
}

export const arabicAlphabet: ArabicLetter[] = [
  { letter: 'ا', name: 'Alif', transliteration: 'a', audioUrl: '' },
  { letter: 'ب', name: 'Ba', transliteration: 'b', audioUrl: '' },
  { letter: 'ت', name: 'Ta', transliteration: 't', audioUrl: '' },
  { letter: 'ث', name: 'Tha', transliteration: 'th', audioUrl: '' },
  { letter: 'ج', name: 'Jim', transliteration: 'j', audioUrl: '' },
  { letter: 'ح', name: 'Ha', transliteration: 'ḥ', audioUrl: '' },
  { letter: 'خ', name: 'Kha', transliteration: 'kh', audioUrl: '' },
  { letter: 'د', name: 'Dal', transliteration: 'd', audioUrl: '' },
  { letter: 'ذ', name: 'Dhal', transliteration: 'dh', audioUrl: '' },
  { letter: 'ر', name: 'Ra', transliteration: 'r', audioUrl: '' },
  { letter: 'ز', name: 'Zay', transliteration: 'z', audioUrl: '' },
  { letter: 'س', name: 'Sin', transliteration: 's', audioUrl: '' },
  { letter: 'ش', name: 'Shin', transliteration: 'sh', audioUrl: '' },
  { letter: 'ص', name: 'Sad', transliteration: 'ṣ', audioUrl: '' },
  { letter: 'ض', name: 'Dad', transliteration: 'ḍ', audioUrl: '' },
  { letter: 'ط', name: 'Taa', transliteration: 'ṭ', audioUrl: '' },
  { letter: 'ظ', name: 'Zha', transliteration: 'ẓ', audioUrl: '' },
  { letter: 'ع', name: 'Ayn', transliteration: '`', audioUrl: '' },
  { letter: 'غ', name: 'Ghayn', transliteration: 'gh', audioUrl: '' },
  { letter: 'ف', name: 'Fa', transliteration: 'f', audioUrl: '' },
  { letter: 'ق', name: 'Qaf', transliteration: 'q', audioUrl: '' },
  { letter: 'ك', name: 'Kaf', transliteration: 'k', audioUrl: '' },
  { letter: 'ل', name: 'Lam', transliteration: 'l', audioUrl: '' },
  { letter: 'م', name: 'Mim', transliteration: 'm', audioUrl: '' },
  { letter: 'ن', name: 'Nun', transliteration: 'n', audioUrl: '' },
  { letter: 'ه', name: 'Haa', transliteration: 'h', audioUrl: '' },
  { letter: 'و', name: 'Waw', transliteration: 'w', audioUrl: '' },
  { letter: 'ي', name: 'Ya', transliteration: 'y', audioUrl: '' },
];

// Map letter names to Arabic pronunciations
export const arabicPronunciations: Record<string, string> = {
  'Alif': 'أَلِف',
  'Ba': 'بَاء',
  'Ta': 'تَاء',
  'Tha': 'ثَاء',
  'Jim': 'جِيم',
  'Ha': 'حَاء',
  'Kha': 'خَاء',
  'Dal': 'دَال',
  'Dhal': 'ذَال',
  'Ra': 'رَاء',
  'Zay': 'زَاي',
  'Sin': 'سِين',
  'Shin': 'شِين',
  'Sad': 'صَاد',
  'Dad': 'ضَاد',
  'Taa': 'طَاء',
  'Zha': 'ظَاء',
  'Ayn': 'عَيْن',
  'Ghayn': 'غَيْن',
  'Fa': 'فَاء',
  'Qaf': 'قَاف',
  'Kaf': 'كَاف',
  'Lam': 'لَام',
  'Mim': 'مِيم',
  'Nun': 'نُون',
  'Haa': 'هَاء',
  'Waw': 'وَاو',
  'Ya': 'يَاء',
};
