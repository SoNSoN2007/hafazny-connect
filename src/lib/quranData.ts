
// This file contains the data structure for all Quran surahs

export interface Surah {
  id: number;
  name: string;
  arabicName: string;
  englishName: string;
  verses: number;
  meaning: string;
  type: 'meccan' | 'medinan';
  audioUrl?: string;
}

// Complete list of all 114 surahs of the Holy Quran
export const surahs: Surah[] = [
  { id: 1, name: "Al-Fatihah", arabicName: "الفاتحة", englishName: "The Opening", verses: 7, meaning: "The Opening", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/001.mp3" },
  { id: 2, name: "Al-Baqarah", arabicName: "البقرة", englishName: "The Cow", verses: 286, meaning: "The Cow", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/002.mp3" },
  { id: 3, name: "Aal-Imran", arabicName: "آل عمران", englishName: "The Family of Imran", verses: 200, meaning: "The Family of Imran", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/003.mp3" },
  { id: 4, name: "An-Nisa", arabicName: "النساء", englishName: "The Women", verses: 176, meaning: "The Women", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/004.mp3" },
  { id: 5, name: "Al-Ma'idah", arabicName: "المائدة", englishName: "The Table Spread", verses: 120, meaning: "The Table Spread", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/005.mp3" },
  { id: 6, name: "Al-An'am", arabicName: "الأنعام", englishName: "The Cattle", verses: 165, meaning: "The Cattle", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/006.mp3" },
  { id: 7, name: "Al-A'raf", arabicName: "الأعراف", englishName: "The Heights", verses: 206, meaning: "The Heights", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/007.mp3" },
  { id: 8, name: "Al-Anfal", arabicName: "الأنفال", englishName: "The Spoils of War", verses: 75, meaning: "The Spoils of War", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/008.mp3" },
  { id: 9, name: "At-Tawbah", arabicName: "التوبة", englishName: "The Repentance", verses: 129, meaning: "The Repentance", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/009.mp3" },
  { id: 10, name: "Yunus", arabicName: "يونس", englishName: "Jonah", verses: 109, meaning: "Jonah", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/010.mp3" },
  { id: 11, name: "Hud", arabicName: "هود", englishName: "Hud", verses: 123, meaning: "Hud", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/011.mp3" },
  { id: 12, name: "Yusuf", arabicName: "يوسف", englishName: "Joseph", verses: 111, meaning: "Joseph", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/012.mp3" },
  { id: 13, name: "Ar-Ra'd", arabicName: "الرعد", englishName: "The Thunder", verses: 43, meaning: "The Thunder", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/013.mp3" },
  { id: 14, name: "Ibrahim", arabicName: "إبراهيم", englishName: "Abraham", verses: 52, meaning: "Abraham", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/014.mp3" },
  { id: 15, name: "Al-Hijr", arabicName: "الحجر", englishName: "The Rocky Tract", verses: 99, meaning: "The Rocky Tract", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/015.mp3" },
  { id: 16, name: "An-Nahl", arabicName: "النحل", englishName: "The Bee", verses: 128, meaning: "The Bee", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/016.mp3" },
  { id: 17, name: "Al-Isra", arabicName: "الإسراء", englishName: "The Night Journey", verses: 111, meaning: "The Night Journey", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/017.mp3" },
  { id: 18, name: "Al-Kahf", arabicName: "الكهف", englishName: "The Cave", verses: 110, meaning: "The Cave", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/018.mp3" },
  { id: 19, name: "Maryam", arabicName: "مريم", englishName: "Mary", verses: 98, meaning: "Mary", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/019.mp3" },
  { id: 20, name: "Ta-Ha", arabicName: "طه", englishName: "Ta-Ha", verses: 135, meaning: "Ta-Ha", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/020.mp3" },
  { id: 21, name: "Al-Anbiya", arabicName: "الأنبياء", englishName: "The Prophets", verses: 112, meaning: "The Prophets", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/021.mp3" },
  { id: 22, name: "Al-Hajj", arabicName: "الحج", englishName: "The Pilgrimage", verses: 78, meaning: "The Pilgrimage", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/022.mp3" },
  { id: 23, name: "Al-Mu'minun", arabicName: "المؤمنون", englishName: "The Believers", verses: 118, meaning: "The Believers", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/023.mp3" },
  { id: 24, name: "An-Nur", arabicName: "النور", englishName: "The Light", verses: 64, meaning: "The Light", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/024.mp3" },
  { id: 25, name: "Al-Furqan", arabicName: "الفرقان", englishName: "The Criterion", verses: 77, meaning: "The Criterion", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/025.mp3" },
  { id: 26, name: "Ash-Shu'ara", arabicName: "الشعراء", englishName: "The Poets", verses: 227, meaning: "The Poets", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/026.mp3" },
  { id: 27, name: "An-Naml", arabicName: "النمل", englishName: "The Ant", verses: 93, meaning: "The Ant", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/027.mp3" },
  { id: 28, name: "Al-Qasas", arabicName: "القصص", englishName: "The Stories", verses: 88, meaning: "The Stories", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/028.mp3" },
  { id: 29, name: "Al-Ankabut", arabicName: "العنكبوت", englishName: "The Spider", verses: 69, meaning: "The Spider", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/029.mp3" },
  { id: 30, name: "Ar-Rum", arabicName: "الروم", englishName: "The Romans", verses: 60, meaning: "The Romans", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/030.mp3" },
  { id: 31, name: "Luqman", arabicName: "لقمان", englishName: "Luqman", verses: 34, meaning: "Luqman", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/031.mp3" },
  { id: 32, name: "As-Sajdah", arabicName: "السجدة", englishName: "The Prostration", verses: 30, meaning: "The Prostration", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/032.mp3" },
  { id: 33, name: "Al-Ahzab", arabicName: "الأحزاب", englishName: "The Combined Forces", verses: 73, meaning: "The Combined Forces", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/033.mp3" },
  { id: 34, name: "Saba", arabicName: "سبأ", englishName: "Sheba", verses: 54, meaning: "Sheba", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/034.mp3" },
  { id: 35, name: "Fatir", arabicName: "فاطر", englishName: "Originator", verses: 45, meaning: "Originator", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/035.mp3" },
  { id: 36, name: "Ya-Sin", arabicName: "يس", englishName: "Ya Sin", verses: 83, meaning: "Ya Sin", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/036.mp3" },
  { id: 37, name: "As-Saffat", arabicName: "الصافات", englishName: "Those who set the Ranks", verses: 182, meaning: "Those who set the Ranks", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/037.mp3" },
  { id: 38, name: "Sad", arabicName: "ص", englishName: "The Letter Sad", verses: 88, meaning: "The Letter Sad", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/038.mp3" },
  { id: 39, name: "Az-Zumar", arabicName: "الزمر", englishName: "The Troops", verses: 75, meaning: "The Troops", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/039.mp3" },
  { id: 40, name: "Ghafir", arabicName: "غافر", englishName: "The Forgiver", verses: 85, meaning: "The Forgiver", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/040.mp3" },
  { id: 41, name: "Fussilat", arabicName: "فصلت", englishName: "Explained in Detail", verses: 54, meaning: "Explained in Detail", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/041.mp3" },
  { id: 42, name: "Ash-Shura", arabicName: "الشورى", englishName: "The Consultation", verses: 53, meaning: "The Consultation", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/042.mp3" },
  { id: 43, name: "Az-Zukhruf", arabicName: "الزخرف", englishName: "The Ornaments of Gold", verses: 89, meaning: "The Ornaments of Gold", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/043.mp3" },
  { id: 44, name: "Ad-Dukhan", arabicName: "الدخان", englishName: "The Smoke", verses: 59, meaning: "The Smoke", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/044.mp3" },
  { id: 45, name: "Al-Jathiyah", arabicName: "الجاثية", englishName: "The Crouching", verses: 37, meaning: "The Crouching", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/045.mp3" },
  { id: 46, name: "Al-Ahqaf", arabicName: "الأحقاف", englishName: "The Wind-Curved Sandhills", verses: 35, meaning: "The Wind-Curved Sandhills", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/046.mp3" },
  { id: 47, name: "Muhammad", arabicName: "محمد", englishName: "Muhammad", verses: 38, meaning: "Muhammad", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/047.mp3" },
  { id: 48, name: "Al-Fath", arabicName: "الفتح", englishName: "The Victory", verses: 29, meaning: "The Victory", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/048.mp3" },
  { id: 49, name: "Al-Hujurat", arabicName: "الحجرات", englishName: "The Rooms", verses: 18, meaning: "The Rooms", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/049.mp3" },
  { id: 50, name: "Qaf", arabicName: "ق", englishName: "The Letter Qaf", verses: 45, meaning: "The Letter Qaf", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/050.mp3" },
  { id: 51, name: "Adh-Dhariyat", arabicName: "الذاريات", englishName: "The Winnowing Winds", verses: 60, meaning: "The Winnowing Winds", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/051.mp3" },
  { id: 52, name: "At-Tur", arabicName: "الطور", englishName: "The Mount", verses: 49, meaning: "The Mount", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/052.mp3" },
  { id: 53, name: "An-Najm", arabicName: "النجم", englishName: "The Star", verses: 62, meaning: "The Star", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/053.mp3" },
  { id: 54, name: "Al-Qamar", arabicName: "القمر", englishName: "The Moon", verses: 55, meaning: "The Moon", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/054.mp3" },
  { id: 55, name: "Ar-Rahman", arabicName: "الرحمن", englishName: "The Beneficent", verses: 78, meaning: "The Beneficent", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/055.mp3" },
  { id: 56, name: "Al-Waqi'ah", arabicName: "الواقعة", englishName: "The Inevitable", verses: 96, meaning: "The Inevitable", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/056.mp3" },
  { id: 57, name: "Al-Hadid", arabicName: "الحديد", englishName: "The Iron", verses: 29, meaning: "The Iron", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/057.mp3" },
  { id: 58, name: "Al-Mujadila", arabicName: "المجادلة", englishName: "The Pleading Woman", verses: 22, meaning: "The Pleading Woman", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/058.mp3" },
  { id: 59, name: "Al-Hashr", arabicName: "الحشر", englishName: "The Exile", verses: 24, meaning: "The Exile", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/059.mp3" },
  { id: 60, name: "Al-Mumtahanah", arabicName: "الممتحنة", englishName: "She That is to be Examined", verses: 13, meaning: "She That is to be Examined", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/060.mp3" },
  { id: 61, name: "As-Saf", arabicName: "الصف", englishName: "The Ranks", verses: 14, meaning: "The Ranks", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/061.mp3" },
  { id: 62, name: "Al-Jumu'ah", arabicName: "الجمعة", englishName: "Friday", verses: 11, meaning: "Friday", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/062.mp3" },
  { id: 63, name: "Al-Munafiqun", arabicName: "المنافقون", englishName: "The Hypocrites", verses: 11, meaning: "The Hypocrites", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/063.mp3" },
  { id: 64, name: "At-Taghabun", arabicName: "التغابن", englishName: "Mutual Disillusion", verses: 18, meaning: "Mutual Disillusion", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/064.mp3" },
  { id: 65, name: "At-Talaq", arabicName: "الطلاق", englishName: "Divorce", verses: 12, meaning: "Divorce", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/065.mp3" },
  { id: 66, name: "At-Tahrim", arabicName: "التحريم", englishName: "Prohibition", verses: 12, meaning: "Prohibition", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/066.mp3" },
  { id: 67, name: "Al-Mulk", arabicName: "الملك", englishName: "The Sovereignty", verses: 30, meaning: "The Sovereignty", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/067.mp3" },
  { id: 68, name: "Al-Qalam", arabicName: "القلم", englishName: "The Pen", verses: 52, meaning: "The Pen", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/068.mp3" },
  { id: 69, name: "Al-Haqqah", arabicName: "الحاقة", englishName: "The Reality", verses: 52, meaning: "The Reality", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/069.mp3" },
  { id: 70, name: "Al-Ma'arij", arabicName: "المعارج", englishName: "The Ascending Stairways", verses: 44, meaning: "The Ascending Stairways", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/070.mp3" },
  { id: 71, name: "Nuh", arabicName: "نوح", englishName: "Noah", verses: 28, meaning: "Noah", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/071.mp3" },
  { id: 72, name: "Al-Jinn", arabicName: "الجن", englishName: "The Jinn", verses: 28, meaning: "The Jinn", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/072.mp3" },
  { id: 73, name: "Al-Muzzammil", arabicName: "المزمل", englishName: "The Enshrouded One", verses: 20, meaning: "The Enshrouded One", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/073.mp3" },
  { id: 74, name: "Al-Muddathir", arabicName: "المدثر", englishName: "The Cloaked One", verses: 56, meaning: "The Cloaked One", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/074.mp3" },
  { id: 75, name: "Al-Qiyamah", arabicName: "القيامة", englishName: "The Resurrection", verses: 40, meaning: "The Resurrection", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/075.mp3" },
  { id: 76, name: "Al-Insan", arabicName: "الإنسان", englishName: "Man", verses: 31, meaning: "Man", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/076.mp3" },
  { id: 77, name: "Al-Mursalat", arabicName: "المرسلات", englishName: "The Emissaries", verses: 50, meaning: "The Emissaries", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/077.mp3" },
  { id: 78, name: "An-Naba", arabicName: "النبأ", englishName: "The Tidings", verses: 40, meaning: "The Tidings", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/078.mp3" },
  { id: 79, name: "An-Nazi'at", arabicName: "النازعات", englishName: "Those who drag forth", verses: 46, meaning: "Those who drag forth", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/079.mp3" },
  { id: 80, name: "Abasa", arabicName: "عبس", englishName: "He frowned", verses: 42, meaning: "He frowned", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/080.mp3" },
  { id: 81, name: "At-Takwir", arabicName: "التكوير", englishName: "The Overthrowing", verses: 29, meaning: "The Overthrowing", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/081.mp3" },
  { id: 82, name: "Al-Infitar", arabicName: "الانفطار", englishName: "The Cleaving", verses: 19, meaning: "The Cleaving", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/082.mp3" },
  { id: 83, name: "Al-Mutaffifin", arabicName: "المطففين", englishName: "Defrauding", verses: 36, meaning: "Defrauding", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/083.mp3" },
  { id: 84, name: "Al-Inshiqaq", arabicName: "الانشقاق", englishName: "The Splitting Open", verses: 25, meaning: "The Splitting Open", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/084.mp3" },
  { id: 85, name: "Al-Buruj", arabicName: "البروج", englishName: "The Mansions of the Stars", verses: 22, meaning: "The Mansions of the Stars", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/085.mp3" },
  { id: 86, name: "At-Tariq", arabicName: "الطارق", englishName: "The Morning Star", verses: 17, meaning: "The Morning Star", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/086.mp3" },
  { id: 87, name: "Al-A'la", arabicName: "الأعلى", englishName: "The Most High", verses: 19, meaning: "The Most High", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/087.mp3" },
  { id: 88, name: "Al-Ghashiyah", arabicName: "الغاشية", englishName: "The Overwhelming", verses: 26, meaning: "The Overwhelming", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/088.mp3" },
  { id: 89, name: "Al-Fajr", arabicName: "الفجر", englishName: "The Dawn", verses: 30, meaning: "The Dawn", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/089.mp3" },
  { id: 90, name: "Al-Balad", arabicName: "البلد", englishName: "The City", verses: 20, meaning: "The City", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/090.mp3" },
  { id: 91, name: "Ash-Shams", arabicName: "الشمس", englishName: "The Sun", verses: 15, meaning: "The Sun", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/091.mp3" },
  { id: 92, name: "Al-Layl", arabicName: "الليل", englishName: "The Night", verses: 21, meaning: "The Night", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/092.mp3" },
  { id: 93, name: "Ad-Duha", arabicName: "الضحى", englishName: "The Morning Hours", verses: 11, meaning: "The Morning Hours", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/093.mp3" },
  { id: 94, name: "Ash-Sharh", arabicName: "الشرح", englishName: "The Relief", verses: 8, meaning: "The Relief", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/094.mp3" },
  { id: 95, name: "At-Tin", arabicName: "التين", englishName: "The Fig", verses: 8, meaning: "The Fig", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/095.mp3" },
  { id: 96, name: "Al-Alaq", arabicName: "العلق", englishName: "The Clot", verses: 19, meaning: "The Clot", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/096.mp3" },
  { id: 97, name: "Al-Qadr", arabicName: "القدر", englishName: "The Power, Fate", verses: 5, meaning: "The Power, Fate", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/097.mp3" },
  { id: 98, name: "Al-Bayyinah", arabicName: "البينة", englishName: "The Clear Proof", verses: 8, meaning: "The Clear Proof", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/098.mp3" },
  { id: 99, name: "Az-Zalzalah", arabicName: "الزلزلة", englishName: "The Earthquake", verses: 8, meaning: "The Earthquake", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/099.mp3" },
  { id: 100, name: "Al-Adiyat", arabicName: "العاديات", englishName: "The Chargers", verses: 11, meaning: "The Chargers", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/100.mp3" },
  { id: 101, name: "Al-Qari'ah", arabicName: "القارعة", englishName: "The Calamity", verses: 11, meaning: "The Calamity", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/101.mp3" },
  { id: 102, name: "At-Takathur", arabicName: "التكاثر", englishName: "Competition", verses: 8, meaning: "Competition", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/102.mp3" },
  { id: 103, name: "Al-Asr", arabicName: "العصر", englishName: "The Declining Day", verses: 3, meaning: "The Declining Day", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/103.mp3" },
  { id: 104, name: "Al-Humazah", arabicName: "الهمزة", englishName: "The Traducer", verses: 9, meaning: "The Traducer", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/104.mp3" },
  { id: 105, name: "Al-Fil", arabicName: "الفيل", englishName: "The Elephant", verses: 5, meaning: "The Elephant", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/105.mp3" },
  { id: 106, name: "Quraysh", arabicName: "قريش", englishName: "Quraysh", verses: 4, meaning: "Quraysh", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/106.mp3" },
  { id: 107, name: "Al-Ma'un", arabicName: "الماعون", englishName: "Almsgiving", verses: 7, meaning: "Almsgiving", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/107.mp3" },
  { id: 108, name: "Al-Kawthar", arabicName: "الكوثر", englishName: "Abundance", verses: 3, meaning: "Abundance", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/108.mp3" },
  { id: 109, name: "Al-Kafirun", arabicName: "الكافرون", englishName: "The Disbelievers", verses: 6, meaning: "The Disbelievers", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/109.mp3" },
  { id: 110, name: "An-Nasr", arabicName: "النصر", englishName: "Divine Support", verses: 3, meaning: "Divine Support", type: "medinan", audioUrl: "https://server8.mp3quran.net/afs/110.mp3" },
  { id: 111, name: "Al-Masad", arabicName: "المسد", englishName: "The Palm Fiber", verses: 5, meaning: "The Palm Fiber", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/111.mp3" },
  { id: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", englishName: "Sincerity", verses: 4, meaning: "Sincerity", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/112.mp3" },
  { id: 113, name: "Al-Falaq", arabicName: "الفلق", englishName: "The Daybreak", verses: 5, meaning: "The Daybreak", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/113.mp3" },
  { id: 114, name: "An-Nas", arabicName: "الناس", englishName: "Mankind", verses: 6, meaning: "Mankind", type: "meccan", audioUrl: "https://server8.mp3quran.net/afs/114.mp3" }
];

// Utility function to get a specific surah by ID
export const getSurahById = (id: number): Surah | undefined => {
  return surahs.find(surah => surah.id === id);
};

// Available reciters with their base URLs
export const reciters = [
  { id: 'mishary', name: 'Mishary Rashid Alafasy', baseUrl: 'https://server8.mp3quran.net/afs/' },
  { id: 'sudais', name: 'Abdul Rahman Al-Sudais', baseUrl: 'https://server11.mp3quran.net/sds/' },
  { id: 'minshawi', name: 'Mohamed Siddiq El-Minshawi', baseUrl: 'https://server8.mp3quran.net/minsh/' },
  { id: 'husary', name: 'Mahmoud Khalil Al-Hussary', baseUrl: 'https://server13.mp3quran.net/husr/' }
];

// Function to format surah number for URL (e.g., 1 -> 001, 10 -> 010)
export const formatSurahNumber = (num: number): string => {
  return num.toString().padStart(3, '0');
};

// Get audio URL for a specific surah from a specific reciter
export const getAudioUrl = (surahId: number, reciterId: string = 'mishary'): string => {
  const reciter = reciters.find(r => r.id === reciterId);
  if (!reciter) return '';
  
  const formattedNumber = formatSurahNumber(surahId);
  return `${reciter.baseUrl}${formattedNumber}.mp3`;
};
