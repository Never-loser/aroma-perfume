export type Gender = "زنانه" | "مردانه" | "یونی‌سکس";

export interface ProductSize {
  ml: number;
  price: number; // toman
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  category: string;
  gender: Gender;
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sizes: ProductSize[];
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  bestseller: boolean;
  isNew: boolean;
  launchYear: number;
  longevity: number;
  sillage: number;
  liquid: string;
  cap: string;
  accent: string;
  image: string;
  images: string[];
}

export const CATEGORIES = [
  "همه",
  "گل‌ایی",
  "چوبی",
  "شرقی",
  "تازه و مرکباتی",
  "خوشبو و شیرین",
  "خاج و آروماتیک",
] as const;

export const BRANDS = [
  "Chanel",
  "Dior",
  "Tom Ford",
  "Creed",
  "Versace",
  "Giorgio Armani",
  "Maison Francis Kurkdjian",
  "Jean Paul Gaultier",
  "Yves Saint Laurent",
  "Guerlain",
] as const;

export const toman = (n: number) => n.toLocaleString("fa-IR");

const img = (_n: number) => "";
const LOCAL = [
  "/images/perfume-gold.jpg",
  "/images/perfume-dark.jpg",
  "/images/perfume-rose.jpg",
  "/images/perfume-blue.jpg",
  "/images/perfume-amber.jpg",
  "/images/perfume-purple.jpg",
  "/images/perfume-green.jpg",
  "/images/perfume-black.jpg",
];

const _raw: Omit<Product, "images">[] = [
  {
    id: "coco-mademoiselle",
    name: "کوکو مادموازل",
    nameEn: "Coco Mademoiselle",
    brand: "Chanel",
    category: "گل‌ایی",
    gender: "زنانه",
    description:
      "یک عطر چوبی شرقی ابریشمی که تجسمی از جسارت و جذابیت زنانه است. ترکیبی درخشان از مرکبات تازه و پچولی گرم که امضای زنان مدرن و بااعتماد‌به‌نفس است.",
    topNotes: ["پرتقال", "ماندارین", "برگاموت", "لیچی"],
    heartNotes: ["رز", "یاسمین", "لی‌چی", "پچولی"],
    baseNotes: ["وتیور", "وانیل", "موس", "تونکا بین"],
    sizes: [{ ml: 50, price: 8900000 }, { ml: 100, price: 14200000 }, { ml: 200, price: 23800000 }],
    oldPrice: 16500000,
    rating: 4.9, reviews: 2148, sold: 9821,
    bestseller: true, isNew: false, launchYear: 2001, longevity: 5, sillage: 4,
    liquid: "#E5C583,#B88B3E", cap: "#1a1a1a", accent: "#E5C583",
    image: img(11711808),
  },
  {
    id: "sauvage-edp",
    name: "سواژ ای دی پی",
    nameEn: "Sauvage Elixir",
    brand: "Dior",
    category: "خاج و آروماتیک",
    gender: "مردانه",
    description:
      "بوی خالص و اعتیادآور، نسخه‌ای فشرده و متمرکز از سواژ با ریگالیس، مصطکی، فلفل سیاه و دارچین. مردانه، گرم و به‌شدت ماندگار.",
    topNotes: ["فلفل سیاه", "دارچین", "نعناع", "نان خشک"],
    heartNotes: ["مصطکی", "ریگالیس", "اسطوخودوس"],
    baseNotes: ["عنبر", "چوب سدر", "هیپری", "وتیور"],
    sizes: [{ ml: 60, price: 9200000 }, { ml: 100, price: 14800000 }],
    rating: 4.8, reviews: 1876, sold: 7640,
    bestseller: true, isNew: false, launchYear: 2021, longevity: 5, sillage: 5,
    liquid: "#5a2d1f,#2a130b", cap: "#0a0a0a", accent: "#C9A227",
    image: img(12562773),
  },
  {
    id: "oud-wood",
    name: "عود وود",
    nameEn: "Oud Wood",
    brand: "Tom Ford",
    category: "چوبی",
    gender: "یونی‌سکس",
    description:
      "از مجموعه‌ی خصوصی تام فورد؛ عود کمیاب، چوب صندل، رزماری و کاراداموم در هم آمیخته تا بوی نجیب و مرموزی پدید آید. تجمل شرقی در اوج ظرافت.",
    topNotes: ["رزماری", "فلفل صورتی", "کاراداموم"],
    heartNotes: ["عود", "چوب صندل", "زعفران"],
    baseNotes: ["چوب سدر", "عنبر", "تونکا"],
    sizes: [{ ml: 50, price: 16500000 }, { ml: 100, price: 26400000 }],
    rating: 4.9, reviews: 942, sold: 3120,
    bestseller: false, isNew: false, launchYear: 2007, longevity: 5, sillage: 3,
    liquid: "#6b4423,#2e1a0c", cap: "#3a2a1a", accent: "#C9A227",
    image: img(7850600),
  },
  {
    id: "avaris",
    name: "آواریوس",
    nameEn: "Aventus",
    brand: "Creed",
    category: "خاج و آروماتیک",
    gender: "مردانه",
    description:
      "افسانه‌ای و نماد پیروزی؛ اناناس، سیب سیاه، توسکا و بِرگاموت با پایه‌ای از مشک و چوب. خوش‌بو، قدرتمند و مسحورکننده برای آقایان با‌کلاس.",
    topNotes: ["اناناس", "برگاموت", "سیب سیاه", "توسکا"],
    heartNotes: ["توسکا", "موس", "زنجبیل"],
    baseNotes: ["مشک", "چوب سدر", "بلوط"],
    sizes: [{ ml: 50, price: 18900000 }, { ml: 100, price: 30500000 }],
    oldPrice: 33000000,
    rating: 4.9, reviews: 1530, sold: 5840,
    bestseller: true, isNew: false, launchYear: 2010, longevity: 4, sillage: 5,
    liquid: "#caa84a,#7a5e1e", cap: "#1a1a1a", accent: "#E5C583",
    image: img(13800860),
  },
  {
    id: "eros-flame",
    name: "اروس فلیم",
    nameEn: "Eros Flame",
    brand: "Versace",
    category: "خاج و آروماتیک",
    gender: "مردانه",
    description:
      "شعله‌ای از شور و اشتیاق؛ لیمو، فلفل سیاه، رزماری و فلفل قرمز در کنار چوب سیگار و صندل. گرم، اغواگر و پرانرژی.",
    topNotes: ["لیمو", "فلفل سیاه", "رزماری", "توسکا"],
    heartNotes: ["فلفل قرمز", "پتچولی", "رز سیاه"],
    baseNotes: ["چوب سیگار", "چوب سدر", "تونکا", "صندل"],
    sizes: [{ ml: 50, price: 6200000 }, { ml: 100, price: 9800000 }, { ml: 200, price: 16200000 }],
    rating: 4.6, reviews: 1124, sold: 6210,
    bestseller: false, isNew: false, launchYear: 2018, longevity: 4, sillage: 4,
    liquid: "#b3402e,#5c140b", cap: "#caa84a", accent: "#E08B69",
    image: img(11517300),
  },
  {
    id: "acqua-di-gio",
    name: "آکوا دی جیو پروفاندو",
    nameEn: "Acqua di Gio Profondo",
    brand: "Giorgio Armani",
    category: "تازه و مرکباتی",
    gender: "مردانه",
    description:
      "نفسی از اعماق اقیانوس؛ نت‌های آبی، برگاموت، نعناع دریایی و نت‌های معدنی. خنک، تازه و مدرن برای روزهای گرم و مراسم ساحلی.",
    topNotes: ["برگاموت", "نعناع دریایی", "گل مینتو"],
    heartNotes: ["نت‌های آبی", "رزماری", "هیپری"],
    baseNotes: ["موس", "پچولی", "نت‌های معدنی"],
    sizes: [{ ml: 40, price: 5400000 }, { ml: 75, price: 8600000 }, { ml: 125, price: 12400000 }],
    rating: 4.7, reviews: 2034, sold: 8990,
    bestseller: true, isNew: false, launchYear: 2020, longevity: 3, sillage: 4,
    liquid: "#2e7d8f,#0f3a44", cap: "#0a1f2a", accent: "#6fd3c4",
    image: img(32630380),
  },
  {
    id: "baccarat-rouge",
    name: "باکارا روژ ۵۴۰",
    nameEn: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "خوشبو و شیرین",
    gender: "یونی‌سکس",
    description:
      "شاهکار کم‌نظیر؛ سافران، عنبر و کاراملی از جنس بلور باکارا. درخشان، شیرین، گرم و مسحورکننده که دیگران را مبهوت می‌کند.",
    topNotes: ["زعفران", "یاسمین"],
    heartNotes: ["عنبروود", "عنبر"],
    baseNotes: ["چوب سدر", "کارامل"],
    sizes: [{ ml: 35, price: 14500000 }, { ml: 70, price: 24500000 }],
    oldPrice: 27000000,
    rating: 5.0, reviews: 1690, sold: 4980,
    bestseller: true, isNew: false, launchYear: 2015, longevity: 5, sillage: 5,
    liquid: "#d8624a,#7a1f12", cap: "#d9b34a", accent: "#E08B69",
    image: img(13875786),
  },
  {
    id: "le-male",
    name: "لومال لوپارفوم",
    nameEn: "Le Male Le Parfum",
    brand: "Jean Paul Gaultier",
    category: "خوشبو و شیرین",
    gender: "مردانه",
    description:
      "بوی فریبنده و شیرین با اَبَر‌نت‌های فاوانیا، وانیل و کاراداموم. جسورانه، گرم و اغواگر در بطری نمادین تورسو.",
    topNotes: ["برگاموت", "فلفل صورتی"],
    heartNotes: ["فاوانیا", "کاراداموم"],
    baseNotes: ["وانیل", "تونکا", "چوب سدر"],
    sizes: [{ ml: 75, price: 5800000 }, { ml: 125, price: 8400000 }],
    rating: 4.7, reviews: 1455, sold: 7020,
    bestseller: false, isNew: true, launchYear: 2020, longevity: 5, sillage: 4,
    liquid: "#b89b5a,#5c4a25", cap: "#0a0a0a", accent: "#E5C583",
    image: img(13882813),
  },
  {
    id: "black-opium",
    name: "بلک اوپیوم",
    nameEn: "Black Opium Extreme",
    brand: "Yves Saint Laurent",
    category: "شرقی",
    gender: "زنانه",
    description:
      "اعتیاد شبانه؛ قهوه، فاوانیا و وانیل با پایه‌ای از عنبر و اود. گرم، تاریک، شیرین و به‌شدت جذاب برای شب‌های خاص.",
    topNotes: ["قهوه", "ابسولوت نارگیل"],
    heartNotes: ["فاوانیا", "یاسمین", "پرنغرین"],
    baseNotes: ["عنبر", "عود", "وانیل", "چوب"],
    sizes: [{ ml: 50, price: 7200000 }, { ml: 90, price: 10800000 }],
    rating: 4.8, reviews: 1870, sold: 6430,
    bestseller: true, isNew: false, launchYear: 2021, longevity: 5, sillage: 4,
    liquid: "#1f1010,#000000", cap: "#0a0a0a", accent: "#E08B69",
    image: img(12053219),
  },
  {
    id: "shalimar",
    name: "شالیمار",
    nameEn: "Shalimar",
    brand: "Guerlain",
    category: "شرقی",
    gender: "زنانه",
    description:
      "افسانه‌ای و جاودانه؛ اولین عطر شرقی تاریخ. برگاموت، ایریس، وانیل و انسانس در دامی از عشق و معمای شرق. کلاسیک بی‌‌مرگ.",
    topNotes: ["برگاموت", "لیمو"],
    heartNotes: ["ایریس", "یاسمین", "رز"],
    baseNotes: ["وانیل", "تونکا", "انسانس", "موس"],
    sizes: [{ ml: 50, price: 6900000 }, { ml: 100, price: 11200000 }],
    rating: 4.7, reviews: 980, sold: 2310,
    bestseller: false, isNew: false, launchYear: 1925, longevity: 5, sillage: 3,
    liquid: "#c9a24a,#6b4a1a", cap: "#1a3b5c", accent: "#E5C583",
    image: img(29986521),
  },
  {
    id: "chance-eau-tendre",
    name: "شانس او تاندر",
    nameEn: "Chance Eau Tendre",
    brand: "Chanel",
    category: "گل‌ایی",
    gender: "زنانه",
    description:
      "نرم، شاداب و دل‌انگیز؛ کوارز، گل‌ابی، یاسمین و مسک چوبی. عطری رمانتیک و تازه برای روز و کار، الهام‌گرفته از شانس و بخت.",
    topNotes: ["کوارز", "انار"],
    heartNotes: ["یاسمین", "هیاسنت", "گل‌ابی"],
    baseNotes: ["مسک چوبی", "ایریس", "سدر"],
    sizes: [{ ml: 50, price: 7400000 }, { ml: 100, price: 11800000 }, { ml: 150, price: 16900000 }],
    rating: 4.8, reviews: 1655, sold: 5210,
    bestseller: true, isNew: false, launchYear: 2010, longevity: 4, sillage: 3,
    liquid: "#e8c7d8,#b58aa8", cap: "#d9d9d9", accent: "#E08B69",
    image: img(34113440),
  },
  {
    id: "bleu-de-chanel",
    name: "بلو دو شنل پارفام",
    nameEn: "Bleu de Chanel Parfum",
    brand: "Chanel",
    category: "خاج و آروماتیک",
    gender: "مردانه",
    description:
      "آرام، عمیق و بی‌نهایت مردانه؛ مرکبات، نعناع، سدر و صندل با پایه‌ای از چوب و طایر. نماد آقایان بااراده و رازآلود.",
    topNotes: ["برگاموت", "لیمو", "نعناع", "گل‌رز"],
    heartNotes: ["چوب سدر", "صندل", "هیاسنت"],
    baseNotes: ["طایر", "موس", "عنبر"],
    sizes: [{ ml: 50, price: 8600000 }, { ml: 100, price: 13800000 }, { ml: 150, price: 19900000 }],
    rating: 4.9, reviews: 2240, sold: 9100,
    bestseller: true, isNew: false, launchYear: 2018, longevity: 5, sillage: 4,
    liquid: "#233a6b,#0c1530", cap: "#0a0a0a", accent: "#7ba0e5",
    image: img(31007014),
  },
  {
    id: "oud-satin-mood",
    name: "اود ساتن مود",
    nameEn: "Oud Satin Mood",
    brand: "Maison Francis Kurkdjian",
    category: "شرقی",
    gender: "یونی‌سکس",
    description:
      "حریر آغشته به عود؛ وانیل، بنفشه، رز و عود کمیاب. لطیف، زنانه و در عین حال قدرتمند؛ بوی نرمی و شکوه شرقی.",
    topNotes: ["بنفشه", "فلفل صورتی"],
    heartNotes: ["رز بلغاری", "عنبر"],
    baseNotes: ["عود کمبوجی", "وانیل", "موس"],
    sizes: [{ ml: 35, price: 13800000 }, { ml: 70, price: 23200000 }],
    rating: 4.8, reviews: 610, sold: 1740,
    bestseller: false, isNew: true, launchYear: 2020, longevity: 5, sillage: 4,
    liquid: "#6b2b4a,#2c0f1c", cap: "#c9a24a", accent: "#E08B69",
    image: img(30238399),
  },
  {
    id: "neroli-portofino",
    name: "نرولی پورتو‌فینو",
    nameEn: "Neroli Portofino",
    brand: "Tom Ford",
    category: "تازه و مرکباتی",
    gender: "یونی‌سکس",
    description:
      "تعطیلات در ریویرای ایتالیا؛ نرولی، برگاموت، یاسمین نرولی و آویشن. خنک، روشن و خوش‌رو برای روزهای پر از آفتاب.",
    topNotes: ["برگاموت", "نرولی", "لیمو", "سیسالی"],
    heartNotes: ["یاسمین نرولی", "آویشن", "نارنج"],
    baseNotes: ["موس", "عنبر", "چوب سدر"],
    sizes: [{ ml: 50, price: 14200000 }, { ml: 100, price: 22800000 }],
    rating: 4.7, reviews: 730, sold: 2050,
    bestseller: false, isNew: false, launchYear: 2011, longevity: 3, sillage: 4,
    liquid: "#e6e0a8,#b5b06a", cap: "#1a3b5c", accent: "#E5C583",
    image: img(965990),
  },
  {
    id: "good-girl",
    name: "گود گرل",
    nameEn: "Good Girl",
    brand: "Yves Saint Laurent",
    category: "گل‌ایی",
    gender: "زنانه",
    description:
      "جسور و غیرقابل‌پیش‌بینی؛ توبِرز، یاس، پرنغرین، کاکائو و تونکا در بطری کفش پاشنه‌بلند نمادین. تاریک، گرم و اغواگر.",
    topNotes: ["بادام", "برگاموت", "لیکوریس"],
    heartNotes: ["توبِرز", "یاسمین", "پرنغرین"],
    baseNotes: ["کاکائو", "تونکا", "پرنو", "چوب"],
    sizes: [{ ml: 50, price: 6800000 }, { ml: 80, price: 9600000 }],
    rating: 4.6, reviews: 1310, sold: 4870,
    bestseller: false, isNew: false, launchYear: 2016, longevity: 4, sillage: 4,
    liquid: "#c9b8d8,#6b4a8a", cap: "#1a1a1a", accent: "#E08B69",
    image: img(34833289),
  },
];

export const products: Product[] = _raw.map((p, i) => {
  const main = LOCAL[i % LOCAL.length];
  const gallery = [LOCAL[(i + 1) % LOCAL.length], LOCAL[(i + 3) % LOCAL.length], LOCAL[(i + 5) % LOCAL.length]];
  return { ...p, image: main, images: [main, ...gallery] };
});

export const getProduct = (id: string) => products.find((p) => p.id === id);
