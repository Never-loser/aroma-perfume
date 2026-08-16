export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export const ARTICLES: Article[] = [
  {
    id: "seasons",
    title: "راهنمای انتخاب عطر مناسب هر فصل",
    excerpt: "از رایحه‌های خنک تابستانی تا گرم‌های زمستانی؛ راهنمای کاملی برای انتخاب عطر متناسب با فصل سال.",
    category: "راهنما",
    readTime: "۶ دقیقه",
    date: "۱۲ خرداد ۱۴۰۳",
    image: "/images/perfume-gold.jpg",
  },
  {
    id: "edt-edp",
    title: "تفاوت EDT، EDP و Parfum چیست؟",
    excerpt: "غلطظت روایح، ماندگاری و پخش بو در هر دسته متفاوت است. در این مقاله تفاوت‌های واقعی را می‌آموزید.",
    category: "آموزش",
    readTime: "۵ دقیقه",
    date: "۲۸ اردیبهشت ۱۴۰۳",
    image: "/images/perfume-amber.jpg",
  },
  {
    id: "care",
    title: "هنر نگهداری عطر برای حفظ کیفیت",
    excerpt: "نور، گرما و رطوبت دشمن عطر شماست. با رعایت چند نکته‌ی ساده، عمر عطرتان را دو برابر کنید.",
    category: "نکته",
    readTime: "۴ دقیقه",
    date: "۱۵ اردیبهشت ۱۴۰۳",
    image: "/images/perfume-green.jpg",
  },
  {
    id: "notes",
    title: "نت‌های عطر: سر، قلب و پایه",
    excerpt: "ساختار هر عطر از سه لایه‌ی نت تشکیل شده است. یاد بگیرید هر لایه چه زمانی خود را نشان می‌دهد.",
    category: "عطرشناسی",
    readTime: "۷ دقیقه",
    date: "۳ اردیبهشت ۱۴۰۳",
    image: "/images/perfume-purple.jpg",
  },
  {
    id: "night",
    title: "۱۰ عطر ماندگار برای شب‌های خاص",
    excerpt: "برای شب‌های مهمانی و قرار، به عطری گرم، اغواگر و ماندگار نیاز دارید. این ۱۰ انتخاب را ببینید.",
    category: "پیشنهاد",
    readTime: "۶ دقیقه",
    date: "۲۱ فروردین ۱۴۰۳",
    image: "/images/perfume-dark.jpg",
  },
  {
    id: "authentic",
    title: "چگونه عطر اصل را تشخیص دهیم؟",
    excerpt: "از بررسی بسته‌بندی و کد اصالت تا تست خود مایع؛ ترفندهای حرفه‌ای برای تشخیص عطر اورجینال.",
    category: "راهنما",
    readTime: "۵ دقیقه",
    date: "۹ فروردین ۱۴۰۳",
    image: "/images/perfume-rose.jpg",
  },
];
