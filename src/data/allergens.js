export const ALLERGENS = [
  { id: 1,  ko: '난류',    en: 'Eggs',        zh: '鸡蛋',  vi: 'Trứng',         fil: 'Itlog',      mn: 'Өндөг',        ru: 'Яйца',          ja: '卵',      emoji: '🥚', color: '#FFF9C4', border: '#F9A825' },
  { id: 2,  ko: '우유',    en: 'Milk',        zh: '牛奶',  vi: 'Sữa',           fil: 'Gatas',      mn: 'Сүү',          ru: 'Молоко',        ja: '乳',      emoji: '🥛', color: '#E3F2FD', border: '#1E88E5' },
  { id: 3,  ko: '메밀',    en: 'Buckwheat',   zh: '荞麦',  vi: 'Kiều mạch',     fil: 'Buckwheat',  mn: 'Гречих',       ru: 'Гречка',        ja: 'そば',    emoji: '🌾', color: '#EFEBE9', border: '#795548' },
  { id: 4,  ko: '땅콩',    en: 'Peanuts',     zh: '花生',  vi: 'Đậu phộng',     fil: 'Mani',       mn: 'Газрын самар', ru: 'Арахис',        ja: 'ピーナッツ', emoji: '🥜', color: '#FFF3E0', border: '#E65100' },
  { id: 5,  ko: '대두',    en: 'Soybeans',    zh: '大豆',  vi: 'Đậu nành',      fil: 'Soya',       mn: 'Соя',          ru: 'Соя',           ja: '大豆',    emoji: '🫘', color: '#F1F8E9', border: '#558B2F' },
  { id: 6,  ko: '밀',      en: 'Wheat',       zh: '小麦',  vi: 'Lúa mì',        fil: 'Trigo',      mn: 'Улаанбуудай',  ru: 'Пшеница',       ja: '小麦',    emoji: '🌾', color: '#FFFDE7', border: '#F57F17' },
  { id: 7,  ko: '고등어',  en: 'Mackerel',    zh: '鲭鱼', vi: 'Cá thu',        fil: 'Alumahan',   mn: 'Макрел',       ru: 'Скумбрия',      ja: 'サバ',    emoji: '🐟', color: '#E0F2F1', border: '#00897B' },
  { id: 8,  ko: '게',      en: 'Crab',        zh: '螃蟹', vi: 'Cua',           fil: 'Alimango',   mn: 'Хавч',         ru: 'Краб',          ja: 'カニ',    emoji: '🦀', color: '#FBE9E7', border: '#BF360C' },
  { id: 9,  ko: '새우',    en: 'Shrimp',      zh: '虾',   vi: 'Tôm',           fil: 'Hipon',      mn: 'Сам хорхой',   ru: 'Креветки',      ja: 'えび',    emoji: '🦐', color: '#FCE4EC', border: '#C62828' },
  { id: 10, ko: '돼지고기',en: 'Pork',        zh: '猪肉', vi: 'Thịt heo',      fil: 'Baboy',      mn: 'Гахайн мах',   ru: 'Свинина',       ja: '豚肉',    emoji: '🥩', color: '#FFF0F0', border: '#E53935' },
  { id: 11, ko: '복숭아',  en: 'Peach',       zh: '桃子', vi: 'Đào',           fil: 'Melokoton',  mn: 'Өрөгч',        ru: 'Персик',        ja: '桃',      emoji: '🍑', color: '#FCE4EC', border: '#E91E63' },
  { id: 12, ko: '토마토',  en: 'Tomato',      zh: '番茄', vi: 'Cà chua',       fil: 'Kamatis',    mn: 'Улаан лооль',  ru: 'Томат',         ja: 'トマト',  emoji: '🍅', color: '#FFEBEE', border: '#D32F2F' },
  { id: 13, ko: '아황산류',en: 'Sulfites',    zh: '亚硫酸盐',vi: 'Sulfite',     fil: 'Sulfite',    mn: 'Сульфит',      ru: 'Сульфиты',      ja: '亜硫酸塩', emoji: '⚗️', color: '#F3E5F5', border: '#7B1FA2' },
  { id: 14, ko: '호두',    en: 'Walnuts',     zh: '核桃', vi: 'Óc chó',        fil: 'Walnuts',    mn: 'Грецк самар',  ru: 'Грецкий орех',  ja: 'クルミ',  emoji: '🪨', color: '#EFEBE9', border: '#4E342E' },
  { id: 15, ko: '닭고기',  en: 'Chicken',     zh: '鸡肉', vi: 'Thịt gà',       fil: 'Manok',      mn: 'Тахианы мах',  ru: 'Курица',        ja: '鶏肉',    emoji: '🍗', color: '#FFFDE7', border: '#F9A825' },
  { id: 16, ko: '쇠고기',  en: 'Beef',        zh: '牛肉', vi: 'Thịt bò',       fil: 'Baka',       mn: 'Үхрийн мах',   ru: 'Говядина',      ja: '牛肉',    emoji: '🥩', color: '#FFEBEE', border: '#B71C1C' },
  { id: 17, ko: '오징어',  en: 'Squid',       zh: '鱿鱼', vi: 'Mực',           fil: 'Pusit',      mn: 'Далайн тахи',  ru: 'Кальмар',       ja: 'イカ',    emoji: '🦑', color: '#EDE7F6', border: '#512DA8' },
  { id: 18, ko: '조개류',  en: 'Shellfish',   zh: '贝类', vi: 'Động vật có vỏ',fil: 'Kabibe',     mn: 'Нялуун загас', ru: 'Моллюски',      ja: '貝',      emoji: '🐚', color: '#E0F7FA', border: '#006064' },
  { id: 19, ko: '잣',      en: 'Pine nuts',   zh: '松子', vi: 'Hạt thông',     fil: 'Pine nuts',  mn: 'Нарсны самар', ru: 'Кедровые орехи',ja: '松の実',  emoji: '🌰', color: '#F1F8E9', border: '#2E7D32' },
]

export const allergenById = Object.fromEntries(ALLERGENS.map(a => [a.id, a]))
