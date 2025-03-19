import { SurahType, TajweedRule, ArabicLesson } from "@/types";

export interface Surah {
  id: number;
  name: string;
  arabicName: string;
  englishName: string;
  meaning: string;
  verses: number;
  type: SurahType;
}

export const surahs: Surah[] = [
  {
    id: 1,
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    englishName: "The Opener",
    meaning: "The Opening",
    verses: 7,
    type: "meccan",
  },
  {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    englishName: "The Cow",
    meaning: "The Heifer",
    verses: 286,
    type: "medinan",
  },
  {
    id: 3,
    name: "Aal-e-Imran",
    arabicName: "آل عمران",
    englishName: "The Family of Imran",
    meaning: "The House of Imran",
    verses: 200,
    type: "medinan",
  },
  {
    id: 4,
    name: "An-Nisa",
    arabicName: "النساء",
    englishName: "The Women",
    meaning: "The Women",
    verses: 176,
    type: "medinan",
  },
  {
    id: 5,
    name: "Al-Ma'idah",
    arabicName: "المائدة",
    englishName: "The Table Spread",
    meaning: "The Table",
    verses: 120,
    type: "medinan",
  },
  {
    id: 6,
    name: "Al-An'am",
    arabicName: "الأنعام",
    englishName: "The Cattle",
    meaning: "The Cattle",
    verses: 165,
    type: "meccan",
  },
  {
    id: 7,
    name: "Al-A'raf",
    arabicName: "الأعراف",
    englishName: "The Heights",
    meaning: "The Heights",
    verses: 206,
    type: "meccan",
  },
  {
    id: 8,
    name: "Al-Anfal",
    arabicName: "الأنفال",
    englishName: "The Spoils of War",
    meaning: "The Spoils",
    verses: 75,
    type: "medinan",
  },
  {
    id: 9,
    name: "At-Tawbah",
    arabicName: "التوبة",
    englishName: "The Repentance",
    meaning: "The Repentance",
    verses: 129,
    type: "medinan",
  },
  {
    id: 10,
    name: "Yunus",
    arabicName: "يونس",
    englishName: "Jonah",
    meaning: "Jonah",
    verses: 109,
    type: "meccan",
  },
  {
    id: 11,
    name: "Hud",
    arabicName: "هود",
    englishName: "Hud",
    meaning: "Hud",
    verses: 123,
    type: "meccan",
  },
  {
    id: 12,
    name: "Yusuf",
    arabicName: "يوسف",
    englishName: "Joseph",
    meaning: "Joseph",
    verses: 111,
    type: "meccan",
  },
  {
    id: 13,
    name: "Ar-Ra'd",
    arabicName: "الرعد",
    englishName: "The Thunder",
    meaning: "The Thunder",
    verses: 43,
    type: "medinan",
  },
  {
    id: 14,
    name: "Ibrahim",
    arabicName: "إبراهيم",
    englishName: "Abraham",
    meaning: "Abraham",
    verses: 52,
    type: "meccan",
  },
  {
    id: 15,
    name: "Al-Hijr",
    arabicName: "الحجر",
    englishName: "The Rocky Tract",
    meaning: "The Stoneland",
    verses: 99,
    type: "meccan",
  },
  {
    id: 16,
    name: "An-Nahl",
    arabicName: "النحل",
    englishName: "The Bee",
    meaning: "The Bee",
    verses: 128,
    type: "meccan",
  },
  {
    id: 17,
    name: "Al-Isra",
    arabicName: "الإسراء",
    englishName: "The Night Journey",
    meaning: "The Night Journey",
    verses: 111,
    type: "meccan",
  },
  {
    id: 18,
    name: "Al-Kahf",
    arabicName: "الكهف",
    englishName: "The Cave",
    meaning: "The Cave",
    verses: 110,
    type: "meccan",
  },
  {
    id: 19,
    name: "Maryam",
    arabicName: "مريم",
    englishName: "Mary",
    meaning: "Mary",
    verses: 98,
    type: "meccan",
  },
  {
    id: 20,
    name: "Ta-Ha",
    arabicName: "طه",
    englishName: "Ta-Ha",
    meaning: "Ta-Ha",
    verses: 135,
    type: "meccan",
  },
  {
    id: 21,
    name: "Al-Anbiya",
    arabicName: "الأن��ياء",
    englishName: "The Prophets",
    meaning: "The Prophets",
    verses: 112,
    type: "meccan",
  },
  {
    id: 22,
    name: "Al-Hajj",
    arabicName: "الحج",
    englishName: "The Pilgrimage",
    meaning: "The Pilgrimage",
    verses: 78,
    type: "medinan",
  },
  {
    id: 23,
    name: "Al-Mu'minun",
    arabicName: "المؤمنون",
    englishName: "The Believers",
    meaning: "The Believers",
    verses: 118,
    type: "meccan",
  },
  {
    id: 24,
    name: "An-Nur",
    arabicName: "النور",
    englishName: "The Light",
    meaning: "The Light",
    verses: 64,
    type: "medinan",
  },
  {
    id: 25,
    name: "Al-Furqan",
    arabicName: "الفرقان",
    englishName: "The Criterion",
    meaning: "The Standard",
    verses: 77,
    type: "meccan",
  },
  {
    id: 26,
    name: "Ash-Shu'ara",
    arabicName: "الشعراء",
    englishName: "The Poets",
    meaning: "The Poets",
    verses: 227,
    type: "meccan",
  },
  {
    id: 27,
    name: "An-Naml",
    arabicName: "النمل",
    englishName: "The Ant",
    meaning: "The Ant",
    verses: 93,
    type: "meccan",
  },
  {
    id: 28,
    name: "Al-Qasas",
    arabicName: "القصص",
    englishName: "The Stories",
    meaning: "The Narrations",
    verses: 88,
    type: "meccan",
  },
  {
    id: 29,
    name: "Al-Ankabut",
    arabicName: "العنكبوت",
    englishName: "The Spider",
    meaning: "The Spider",
    verses: 69,
    type: "meccan",
  },
  {
    id: 30,
    name: "Ar-Rum",
    arabicName: "الروم",
    englishName: "The Romans",
    meaning: "The Romans",
    verses: 60,
    type: "meccan",
  },
  {
    id: 31,
    name: "Luqman",
    arabicName: "لقمان",
    englishName: "Luqman",
    meaning: "Luqman",
    verses: 34,
    type: "meccan",
  },
  {
    id: 32,
    name: "As-Sajdah",
    arabicName: "السجدة",
    englishName: "The Prostration",
    meaning: "The Adoration",
    verses: 30,
    type: "meccan",
  },
  {
    id: 33,
    name: "Al-Ahzab",
    arabicName: "الأحزاب",
    englishName: "The Combined Forces",
    meaning: "The Clans",
    verses: 73,
    type: "medinan",
  },
  {
    id: 34,
    name: "Saba",
    arabicName: "سبأ",
    englishName: "Sheba",
    meaning: "Sheba",
    verses: 54,
    type: "meccan",
  },
  {
    id: 35,
    name: "Fatir",
    arabicName: "فاطر",
    englishName: "Originator",
    meaning: "The Creator",
    verses: 45,
    type: "meccan",
  },
  {
    id: 36,
    name: "Ya-Sin",
    arabicName: "يس",
    englishName: "Ya-Sin",
    meaning: "Ya-Sin",
    verses: 83,
    type: "meccan",
  },
  {
    id: 37,
    name: "As-Saffat",
    arabicName: "الصافات",
    englishName: "Those who set the ranks",
    meaning: "Drawn Up in Ranks",
    verses: 182,
    type: "meccan",
  },
  {
    id: 38,
    name: "Sad",
    arabicName: "ص",
    englishName: "Sad",
    meaning: "The Letter \"Saad\"",
    verses: 88,
    type: "meccan",
  },
  {
    id: 39,
    name: "Az-Zumar",
    arabicName: "الزمر",
    englishName: "The Troops",
    meaning: "The Crowds",
    verses: 75,
    type: "meccan",
  },
  {
    id: 40,
    name: "Ghafir",
    arabicName: "غافر",
    englishName: "The Forgiver",
    meaning: "The All-Forgiving",
    verses: 85,
    type: "meccan",
  },
  {
    id: 41,
    name: "Fussilat",
    arabicName: "فصلت",
    englishName: "Explained in Detail",
    meaning: "Clearly Expounded",
    verses: 54,
    type: "meccan",
  },
  {
    id: 42,
    name: "Ash-Shura",
    arabicName: "الشورى",
    englishName: "The Consultation",
    meaning: "The Consultation",
    verses: 53,
    type: "meccan",
  },
  {
    id: 43,
    name: "Az-Zukhruf",
    arabicName: "الزخرف",
    englishName: "The Ornaments of gold",
    meaning: "Gold Adornments",
    verses: 89,
    type: "meccan",
  },
  {
    id: 44,
    name: "Ad-Dukhan",
    arabicName: "الدخان",
    englishName: "The Smoke",
    meaning: "The Smoke",
    verses: 59,
    type: "meccan",
  },
  {
    id: 45,
    name: "Al-Jathiyah",
    arabicName: "الجاثية",
    englishName: "The Crouching",
    meaning: "The Kneeling",
    verses: 37,
    type: "meccan",
  },
  {
    id: 46,
    name: "Al-Ahqaf",
    arabicName: "الأحقاف",
    englishName: "The Wind-Curved Sandhills",
    meaning: "The Dunes",
    verses: 35,
    type: "meccan",
  },
  {
    id: 47,
    name: "Muhammad",
    arabicName: "محمد",
    englishName: "Muhammad",
    meaning: "Muhammad",
    verses: 38,
    type: "medinan",
  },
  {
    id: 48,
    name: "Al-Fath",
    arabicName: "الفتح",
    englishName: "The Victory",
    meaning: "The Victory",
    verses: 29,
    type: "medinan",
  },
  {
    id: 49,
    name: "Al-Hujurat",
    arabicName: "الحجرات",
    englishName: "The Dwellings",
    meaning: "The Inner Apartments",
    verses: 18,
    type: "medinan",
  },
  {
    id: 50,
    name: "Qaf",
    arabicName: "ق",
    englishName: "Qaf",
    meaning: "The Letter \"Qaf\"",
    verses: 45,
    type: "meccan",
  },
  {
    id: 51,
    name: "Adh-Dhariyat",
    arabicName: "الذاريات",
    englishName: "The Winnowing Winds",
    meaning: "The Scatterers",
    verses: 60,
    type: "meccan",
  },
  {
    id: 52,
    name: "At-Tur",
    arabicName: "الطور",
    englishName: "The Mount",
    meaning: "The Mount",
    verses: 49,
    type: "meccan",
  },
  {
    id: 53,
    name: "An-Najm",
    arabicName: "النجم",
    englishName: "The Star",
    meaning: "The Star",
    verses: 62,
    type: "meccan",
  },
  {
    id: 54,
    name: "Al-Qamar",
    arabicName: "القمر",
    englishName: "The Moon",
    meaning: "The Moon",
    verses: 55,
    type: "meccan",
  },
  {
    id: 55,
    name: "Ar-Rahman",
    arabicName: "الرحمن",
    englishName: "The Most Gracious",
    meaning: "The Most Gracious",
    verses: 78,
    type: "medinan",
  },
  {
    id: 56,
    name: "Al-Waqi'ah",
    arabicName: "الواقعة",
    englishName: "The Inevitable",
    meaning: "The Event",
    verses: 96,
    type: "meccan",
  },
  {
    id: 57,
    name: "Al-Hadid",
    arabicName: "الحديد",
    englishName: "The Iron",
    meaning: "The Iron",
    verses: 29,
    type: "medinan",
  },
  {
    id: 58,
    name: "Al-Mujadila",
    arabicName: "المجادلة",
    englishName: "The Pleading Woman",
    meaning: "She That Disputeth",
    verses: 22,
    type: "medinan",
  },
  {
    id: 59,
    name: "Al-Hashr",
    arabicName: "الحشر",
    englishName: "The Exile",
    meaning: "The Mustering",
    verses: 24,
    type: "medinan",
  },
  {
    id: 60,
    name: "Al-Mumtahanah",
    arabicName: "الممتحنة",
    englishName: "The Woman to be examined",
    meaning: "The Examined One",
    verses: 13,
    type: "medinan",
  },
  {
    id: 61,
    name: "As-Saff",
    arabicName: "الصف",
    englishName: "The Row",
    meaning: "The Ranks",
    verses: 14,
    type: "medinan",
  },
  {
    id: 62,
    name: "Al-Jumu'ah",
    arabicName: "الجمعة",
    englishName: "The Congregation",
    meaning: "Friday",
    verses: 11,
    type: "medinan",
  },
  {
    id: 63,
    name: "Al-Munafiqun",
    arabicName: "المنافقون",
    englishName: "The Hypocrites",
    meaning: "The Hypocrites",
    verses: 11,
    type: "medinan",
  },
  {
    id: 64,
    name: "At-Taghabun",
    arabicName: "التغابن",
    englishName: "The Mutual Loss",
    meaning: "The Cheating",
    verses: 18,
    type: "medinan",
  },
  {
    id: 65,
    name: "At-Talaq",
    arabicName: "الطلاق",
    englishName: "The Divorce",
    meaning: "Divorce",
    verses: 12,
    type: "medinan",
  },
  {
    id: 66,
    name: "At-Tahrim",
    arabicName: "التحريم",
    englishName: "The Prohibition",
    meaning: "The Banning",
    verses: 12,
    type: "medinan",
  },
  {
    id: 67,
    name: "Al-Mulk",
    arabicName: "الملك",
    englishName: "The Dominion",
    meaning: "The Sovereignty",
    verses: 30,
    type: "meccan",
  },
  {
    id: 68,
    name: "Al-Qalam",
    arabicName: "القلم",
    englishName: "The Pen",
    meaning: "The Pen",
    verses: 52,
    type: "meccan",
  },
  {
    id: 69,
    name: "Al-Haqqah",
    arabicName: "الحاقة",
    englishName: "The Reality",
    meaning: "The Sure Truth",
    verses: 52,
    type: "meccan",
  },
  {
    id: 70,
    name: "Al-Ma'arij",
    arabicName: "المعارج",
    englishName: "The Ascending Stairways",
    meaning: "The Ways of Ascent",
    verses: 44,
    type: "meccan",
  },
  {
    id: 71,
    name: "Nuh",
    arabicName: "نوح",
    englishName: "Noah",
    meaning: "Noah",
    verses: 28,
    type: "meccan",
  },
  {
    id: 72,
    name: "Al-Jinn",
    arabicName: "الجن",
    englishName: "The Jinn",
    meaning: "The Jinn",
    verses: 28,
    type: "meccan",
  },
  {
    id: 73,
    name: "Al-Muzzammil",
    arabicName: "المزمل",
    englishName: "The Enshrouded One",
    meaning: "The Enfolded One",
    verses: 20,
    type: "meccan",
  },
  {
    id: 74,
    name: "Al-Muddaththir",
    arabicName: "المدثر",
    englishName: "The Cloaked One",
    meaning: "The Covered One",
    verses: 56,
    type: "meccan",
  },
  {
    id: 75,
    name: "Al-Qiyamah",
    arabicName: "القيامة",
    englishName: "The Resurrection",
    meaning: "The Rising of the Dead",
    verses: 40,
    type: "meccan",
  },
  {
    id: 76,
    name: "Al-Insan",
    arabicName: "الانسان",
    englishName: "The Man",
    meaning: "Man",
    verses: 31,
    type: "medinan",
  },
  {
    id: 77,
    name: "Al-Mursalat",
    arabicName: "المرسلات",
    englishName: "Those Sent Forth",
    meaning: "The Emissaries",
    verses: 50,
    type: "meccan",
  },
  {
    id: 78,
    name: "An-Naba",
    arabicName: "النبأ",
    englishName: "The Great News",
    meaning: "The Tidings",
    verses: 40,
    type: "meccan",
  },
  {
    id: 79,
    name: "An-Nazi'at",
    arabicName: "النازعات",
    englishName: "Those who drag forth",
    meaning: "Those Who Pluck Out",
    verses: 46,
    type: "meccan",
  },
  {
    id: 80,
    name: "Abasa",
    arabicName: "عبس",
    englishName: "He frowned",
    meaning: "He Frowned",
    verses: 42,
    type: "meccan",
  },
  {
    id: 81,
    name: "At-Takwir",
    arabicName: "التكوير",
    englishName: "The Overthrowing",
    meaning: "The Folding Up",
    verses: 29,
    type: "meccan",
  },
  {
    id: 82,
    name: "Al-Infitar",
    arabicName: "الإنفطار",
    englishName: "The Cleaving",
    meaning: "The Bursting Apart",
    verses: 19,
    type: "meccan",
  },
  {
    id: 83,
    name: "Al-Mutaffifin",
    arabicName: "المطففين",
    englishName: "Those Who Deal Unjustly",
    meaning: "The Defrauding",
    verses: 36,
    type: "meccan",
  },
  {
    id: 84,
    name: "Al-Inshiqaq",
    arabicName: "الإنشقاق",
    englishName: "The Splitting Open",
    meaning: "The Sundering",
    verses: 25,
    type: "meccan",
  },
  {
    id: 85,
    name: "Al-Buruj",
    arabicName: "البروج",
    englishName: "The Constellations",
    meaning: "The Mansions of the Stars",
    verses: 22,
    type: "meccan",
  },
  {
    id: 86,
    name: "At-Tariq",
    arabicName: "الطارق",
    englishName: "The Nightcomer",
    meaning: "The Night Visitant",
    verses: 17,
    type: "meccan",
  },
  {
    id: 87,
    name: "Al-A'la",
    arabicName: "الأعلى",
    englishName: "The Most High",
    meaning: "The Most Exalted",
    verses: 19,
    type: "meccan",
  },
  {
    id: 88,
    name: "Al-Ghashiyah",
    arabicName: "الغاشية",
    englishName: "The Overwhelming",
    meaning: "The Overshadowing",
    verses: 26,
    type: "meccan",
  },
  {
    id: 89,
    name: "Al-Fajr",
    arabicName: "الفجر",
    englishName: "The Dawn",
    meaning: "The Daybreak",
    verses: 30,
    type: "meccan",
  },
  {
    id: 90,
    name: "Al-Balad",
    arabicName: "البلد",
    englishName: "The City",
    meaning: "The City",
    verses: 20,
    type: "meccan",
  },
  {
    id: 91,
    name: "Ash-Shams",
    arabicName: "الشمس",
    englishName: "The Sun",
    meaning: "The Sun",
    verses: 15,
    type: "meccan",
  },
  {
    id: 92,
    name: "Al-Layl",
    arabicName: "الليل",
    englishName: "The Night",
    meaning: "The Night",
    verses: 21,
    type: "meccan",
  },
  {
    id: 93,
    name: "Ad-Duha",
    arabicName: "الضحى",
    englishName: "The Forenoon",
    meaning: "The Morning Hours",
    verses: 11,
    type: "meccan",
  },
  {
    id: 94,
    name: "Ash-Sharh",
    arabicName: "الشرح",
    englishName: "The Relief",
    meaning: "The Expansion",
    verses: 8,
    type: "meccan",
  },
  {
    id: 95,
    name: "At-Tin",
    arabicName: "التين",
    englishName: "The Fig",
    meaning: "The Fig",
    verses: 8,
    type: "meccan",
  },
  {
    id: 96,
    name: "Al-Alaq",
    arabicName: "العلق",
    englishName: "The Clot",
    meaning: "The Clot",
    verses: 19,
    type: "meccan",
  },
  {
    id: 97,
    name: "Al-Qadr",
    arabicName: "القدر",
    englishName: "The Power",
    meaning: "The Majesty",
    verses: 5,
    type: "meccan",
  },
  {
    id: 98,
    name: "Al-Bayyinah",
    arabicName: "البينة",
    englishName: "The Clear Proof",
    meaning: "The Evidence",
    verses: 8,
    type: "medinan",
  },
  {
    id: 99,
    name: "Az-Zalzalah",
    arabicName: "الزلزلة",
    englishName: "The Earthquake",
    meaning: "The Earthquake",
    verses: 8,
    type: "medinan",
  },
  {
    id: 100,
    name: "Al-Adiyat",
    arabicName: "العاديات",
    englishName: "Those That Run",
    meaning: "The Chargers",
    verses: 11,
    type: "meccan",
  },
  {
    id: 101,
    name: "Al-Qari'ah",
    arabicName: "القارعة",
    englishName: "The Calamity",
    meaning: "The Striking Hour",
    verses: 11,
    type: "meccan",
  },
  {
    id: 102,
    name: "At-Takathur",
    arabicName: "التكاثر",
    englishName: "The Rivalry in world increase",
    meaning: "Competition",
    verses: 8,
    type: "meccan",
  },
  {
    id: 103,
    name: "Al-Asr",
    arabicName: "العصر",
    englishName: "The Time",
    meaning: "The Declining Day",
    verses: 3,
    type: "meccan",
  },
  {
    id: 104,
    name: "Al-Humazah",
    arabicName: "الهمزة",
    englishName: "The Slanderer",
    meaning: "The Scandalmonger",
    verses: 9,
    type: "meccan",
  },
  {
    id: 105,
    name: "Al-Fil",
    arabicName: "الفيل",
    englishName: "The Elephant",
    meaning: "The Elephant",
    verses: 5,
    type: "meccan",
  },
  {
    id: 106,
    name: "Quraish",
    arabicName: "قريش",
    englishName: "Quraish",
    meaning: "Quraysh",
    verses: 4,
    type: "meccan",
  },
  {
    id: 107,
    name: "Al-Ma'un",
    arabicName: "الماعون",
    englishName: "The Small Kindnesses",
    meaning: "The Assistance",
    verses: 7,
    type: "meccan",
  },
  {
    id: 108,
    name: "Al-Kauthar",
    arabicName: "الكوثر",
    englishName: "A river in Paradise",
    meaning: "Abundance",
    verses: 3,
    type: "meccan",
  },
  {
    id: 109,
    name: "Al-Kafirun",
    arabicName: "الكافرون",
    englishName: "The Disbelievers",
    meaning: "The Disbelievers",
    verses: 6,
    type: "meccan",
  },
  {
    id: 110,
    name: "An-Nasr",
    arabicName: "النصر",
    englishName: "The Help",
    meaning: "The Divine Support",
    verses: 3,
    type: "medinan",
  },
  {
    id: 111,
    name: "Al-Masad",
    arabicName: "المسد",
    englishName: "The Palm Fiber",
    meaning: "The Palm Fiber",
    verses: 5,
    type: "meccan",
  },
  {
    id: 112,
    name: "Al-Ikhlas",
    arabicName: "الإخلاص",
    englishName: "The Sincerity",
    meaning: "The Purity",
    verses: 4,
    type: "meccan",
  },
  {
    id: 113,
    name: "Al-Falaq",
    arabicName: "الفلق",
    englishName: "The Daybreak",
    meaning: "The Dawn",
    verses: 5,
    type: "meccan",
  },
  {
    id: 114,
    name: "An-Nas",
    arabicName: "الناس",
    englishName: "The Mankind",
    meaning: "The Mankind",
    verses: 6,
    type: "meccan",
  },
];

export const getSurahById = (id: number): Surah | undefined => {
  return surahs.find((surah) => surah.id === id);
};

export const reciters = [
  { id: 'mishary', name: 'Mishary Rashid Alafasy' },
  { id: 'sudais', name: 'Abdurrahman As-Sudais' },
  { id: 'abdulbasit', name: 'Abdul Basit Abdul Samad' },
  { id: 'shuraim', name: 'Saud Al-Shuraim' },
  { id: 'alghamdi', name: 'Saad Al-Ghamdi' },
  { id: 'dosari', name: 'Yasser Al-Dosari' },
  { id: 'ajmi', name: 'Ahmed Al-Ajmi' },
  { id: 'husary', name: 'Mahmoud Khalil Al-Husary' },
  { id: 'minshawi', name: 'Mohamed Siddiq El-Minshawi' }
];

export const getAudioUrl = (surahId: number, reciterId: string): string => {
  const formattedSurahId = surahId.toString().padStart(3, '0');
  return `https://audio.qurancdn.com/${reciterId}/murattal/${formattedSurahId}.mp3`;
};

export const tajweedRules: TajweedRule[] = [
  {
    id: 1,
    name: "Ghunnah",
    arabicName: "غُنَّة",
    description: "Nasal sound when pronouncing Noon and Meem with Shaddah",
    example: "إِنَّ",
    color: "bg-blue-200"
  },
  {
    id: 2,
    name: "Idgham",
    arabicName: "إدغام",
    description: "Merging of letters when Noon Sakinah or Tanween is followed by certain letters",
    example: "مَن يَعْمَلْ",
    color: "bg-green-200"
  },
  {
    id: 3,
    name: "Ikhfa",
    arabicName: "إخفاء",
    description: "Partial sound of Noon Sakinah or Tanween when followed by specific letters",
    example: "مِن كُلِّ",
    color: "bg-yellow-200"
  },
  {
    id: 4,
    name: "Qalqalah",
    arabicName: "قلقلة",
    description: "Sound produced when pronouncing the letters ق ط ب ج د when they have sukoon",
    example: "يَخْرُجُ",
    color: "bg-purple-200"
  },
  {
    id: 5,
    name: "Idgham Meem",
    arabicName: "إدغام الميم",
    description: "Merging when Meem Sakinah is followed by another Meem",
    example: "لَهُم مَّا",
    color: "bg-pink-200"
  },
  {
    id: 6,
    name: "Ikhfa Shafawi",
    arabicName: "إخفاء شفوي",
    description: "Partial pronunciation of Meem Sakinah when followed by Baa",
    example: "هُم بِالْآخِرَةِ",
    color: "bg-orange-200"
  }
];

export const arabicLessons: ArabicLesson[] = [
  {
    id: 1,
    title: "Arabic Alphabet",
    description: "Learn the basic Arabic letters and their pronunciation",
    level: "beginner",
    duration: 30,
    progress: 100,
    category: "Basics",
    content: "Start by learning the shapes and sounds of the Arabic alphabet. Each letter has multiple forms depending on its position in a word."
  },
  {
    id: 2,
    title: "Short Vowels",
    description: "Understanding Fatha, Kasra, and Damma",
    level: "beginner",
    duration: 25,
    progress: 75,
    category: "Basics",
    content: "Arabic short vowels (called harakat) are written as marks above or below the consonants. Fatha (فَتْحَة) is a diagonal stroke above a letter, Kasra (كَسْرَة) is a diagonal stroke below, and Damma (ضَمَّة) is a small و above."
  },
  {
    id: 3,
    title: "Long Vowels",
    description: "Learning Alif, Waw, and Yaa as vowels",
    level: "beginner",
    duration: 25,
    progress: 50,
    category: "Basics",
    content: "Arabic long vowels extend the sound of short vowels. The long vowel Alif (ا) extends Fatha, Waw (و) extends Damma, and Yaa (ي) extends Kasra."
  },
  {
    id: 4,
    title: "Sukoon and Shaddah",
    description: "Understanding the absence of vowels and letter doubling",
    level: "beginner",
    duration: 20,
    progress: 0,
    category: "Basics",
    content: "Sukoon (سُكُون) indicates absence of vowel, while Shaddah (شَدَّة) indicates doubled consonant sound."
  },
  {
    id: 5,
    title: "Basic Vocabulary",
    description: "Essential Quranic words and their meanings",
    level: "intermediate",
    duration: 45,
    progress: 0,
    category: "Vocabulary",
    content: "Learn the most common words used in the Quran, starting with those that appear hundreds of times throughout the text."
  },
  {
    id: 6,
    title: "Simple Grammar",
    description: "Introduction to Arabic sentence structure",
    level: "intermediate",
    duration: 40,
    progress: 0,
    category: "Grammar",
    content: "Arabic sentences follow either verbal (verb-subject-object) or nominal (subject-predicate) structure. This lesson covers basic patterns and how to identify them."
  }
];
