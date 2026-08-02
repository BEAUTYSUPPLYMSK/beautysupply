import { useState, useEffect, useRef } from 'react';

// Types
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  gradient: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Review {
  name: string;
  date: string;
  product: string;
  text: string;
}

// Data
const products: Product[] = [
  { id: 1, name: 'Лифтинг-крем для тела VOL.U.lift', brand: 'Image Skincare', price: 7799, category: 'body', description: 'уход за телом, лифтинг', gradient: 'from-rose-200 via-amber-100 to-pink-100' },
  { id: 2, name: 'VOL.U.lift (лицо)', brand: 'Image Skincare', price: 11599, category: 'face', description: 'лифтинг, anti-age', gradient: 'from-amber-200 via-rose-100 to-orange-100' },
  { id: 3, name: 'Восстанавливающий ночной крем с витамином C', brand: 'Image Skincare', price: 7799, category: 'face', description: 'ночной уход, сияние', gradient: 'from-yellow-200 via-amber-100 to-orange-100' },
  { id: 4, name: 'Ночной крем с ретинолом 0.3%', brand: 'Image Skincare', price: 8000, category: 'face', description: 'anti-age', gradient: 'from-purple-200 via-pink-100 to-rose-100' },
  { id: 5, name: 'Увлажняющий дневной крем SPF 30 Daily Prevention', brand: 'Image Skincare', price: 5200, category: 'spf', description: 'SPF-защита', gradient: 'from-blue-200 via-cyan-100 to-sky-100' },
  { id: 6, name: 'Усиленный смарт-крем SPF 75', brand: 'Image Skincare', price: 6000, category: 'spf', description: 'SPF-защита', gradient: 'from-sky-200 via-blue-100 to-indigo-100' },
  { id: 7, name: 'Pillow Talk тени', brand: 'Charlotte Tilbury', price: 7500, category: 'makeup', description: 'макияж глаз', gradient: 'from-pink-200 via-rose-100 to-fuchsia-100' },
  { id: 8, name: 'Тени', brand: 'Hourglass', price: 6500, category: 'makeup', description: 'макияж глаз', gradient: 'from-amber-200 via-yellow-100 to-orange-100' },
  { id: 9, name: 'Палетка', brand: 'Hourglass', price: 7500, category: 'makeup', description: 'палетки', gradient: 'from-rose-200 via-amber-100 to-pink-100' },
  { id: 10, name: 'Румяна', brand: 'Hourglass', price: 3700, category: 'makeup', description: 'румяна', gradient: 'from-pink-300 via-rose-200 to-blush' },
  { id: 11, name: 'Контуринг', brand: 'Charlotte Tilbury', price: 3500, category: 'makeup', description: 'контуринг', gradient: 'from-amber-200 via-orange-100 to-rose-100' },
  { id: 12, name: 'Restoring Youth Serum', brand: 'Image MD', price: 10800, category: 'face', description: 'сыворотка, anti-age', gradient: 'from-violet-200 via-purple-100 to-indigo-100' },
];

const categories = [
  { id: 'all', name: 'Все товары' },
  { id: 'face', name: 'Уход за лицом' },
  { id: 'body', name: 'Уход за телом' },
  { id: 'spf', name: 'SPF-защита' },
  { id: 'makeup', name: 'Профессиональный макияж' },
];

const reviews: Review[] = [
  { name: 'Юля', date: '2 мая', product: 'Gisou маска для волос', text: 'Спасибо! Штрих-код пробивается, оригинальное средство!' },
  { name: 'Анастасия', date: '22 апреля', product: 'Gisou масло для губ', text: 'Все отлично) Спасибо большое ☺️' },
  { name: 'Елена', date: '15 марта', product: 'Image Skincare SPF 75', text: 'Получила быстрее, чем ожидала. Всё упаковано качественно, оригиналь подтверждается кодом на коробке.' },
  { name: 'Дарья', date: '28 февраля', product: 'Charlotte Tilbury Pillow Talk', text: 'Долго искала эту палетку. Продавец помог с выбором, ответил на все вопросы. Рекомендую!' },
  { name: 'Марина', date: '10 февраля', product: 'Hourglass палетка', text: 'Впервые заказываю здесь. Всё чётко: от консультации до доставки. Товар как на фото!' },
];

const faqs: FAQ[] = [
  { question: 'Вы продаёте оригинальную косметику?', answer: 'Да, мы работаем только с официальными поставщиками. Каждый товар имеет штрих-код, который можно проверить. Мы на рынке с 2011 года и дорожим репутацией.' },
  { question: 'Какие сроки доставки?', answer: 'По Москве — от 1 дня. В другие города России — от 3 до 7 рабочих дней в зависимости от региона. Подробности уточняйте у менеджера.' },
  { question: 'Можно ли сделать предзаказ?', answer: 'Конечно! Мы привезём любой брендовый beauty-товар из США под заказ. Напишите нам в Telegram, и мы рассчитаем сроки и стоимость.' },
  { question: 'Как оплатить заказ?', answer: 'Мы принимаем банковские карты, переводы. Подробности оплаты обсуждаются индивидуально при оформлении заказа.' },
  { question: 'Как оформить возврат?', answer: 'Если товар не подошёл, вы можете оформить возврат в течение 7 дней. Мы вернём деньги или предложим замену. Претензии по качеству рассматриваем оперативно.' },
  { question: 'Вы предоставляете консультации?', answer: 'Да! Наши специалисты помогут подобрать продукты под ваш тип кожи и пожелания. Используйте Telegram или WhatsApp для связи.' },
];

const navLinks = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#brands', label: 'Бренды' },
  { href: '#about', label: 'О нас' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#delivery', label: 'Доставка' },
  { href: '#contacts', label: 'Контакты' },
];

const beautyArticles = [
  { title: 'Как выбрать лифтинг-крем', excerpt: 'Разбираемся в активных компонентах и находим идеальный уход для зрелой кожи.', category: 'Уход' },
  { title: 'Ретинол 0.3% — кому подходит', excerpt: 'Полное руководство по безопасному началу использования ретиноидов.', category: 'Anti-age' },
  { title: 'SPF-рутина на каждый день', excerpt: 'Как защитить кожу от фотостарения и подобрать идеальный SPF.', category: 'Защита' },
];

// Components
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-charcoal/5' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Основная навигация"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-serif text-2xl md:text-3xl font-semibold text-charcoal tracking-wide focus-visible-ring">
            Beauty Supply
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-light hover:text-charcoal transition-colors focus-visible-ring"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://t.me/beautysupply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-ivory text-sm font-medium rounded-full hover:bg-charcoal-light transition-all hover:scale-105 focus-visible-ring"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              Заказать в Telegram
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-ivory-dark transition-colors focus-visible-ring"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-charcoal-light hover:text-charcoal hover:bg-ivory-dark rounded-lg transition-colors focus-visible-ring"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://t.me/beautysupply"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-charcoal text-ivory text-sm font-medium rounded-full hover:bg-charcoal-light transition-all focus-visible-ring"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              Заказать в Telegram
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [countYears, setCountYears] = useState(0);
  const [countReviews, setCountReviews] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const yearsTarget = 14;
      const reviewsTarget = 120;
      let yearsCurrent = 0;
      let reviewsCurrent = 0;

      const interval = setInterval(() => {
        if (yearsCurrent < yearsTarget) {
          yearsCurrent++;
          setCountYears(yearsCurrent);
        }
        if (reviewsCurrent < reviewsTarget) {
          reviewsCurrent += 4;
          setCountReviews(Math.min(reviewsCurrent, reviewsTarget));
        }
        if (yearsCurrent >= yearsTarget && reviewsCurrent >= reviewsTarget) {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={ref}>
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-gold-light/30 to-blush/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-champagne/30 to-rose-gold-light/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blush/20 to-champagne/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-charcoal leading-tight mb-6">
            Делаем для вас недоступное
            <span className="block gradient-text mt-2">— доступным!</span>
          </h1>
          <p className="text-lg md:text-xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Премиальная косметика из США — только у нас!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center px-8 py-4 bg-charcoal text-ivory font-medium rounded-full hover:bg-charcoal-light transition-all hover:scale-105 shadow-lg shadow-charcoal/20 focus-visible-ring"
            >
              Смотреть каталог
            </a>
            <a
              href="https://t.me/beautysupply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal text-charcoal font-medium rounded-full hover:bg-charcoal hover:text-ivory transition-all hover:scale-105 focus-visible-ring"
            >
              Предзаказ из США
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
              <span className="text-rose-gold">✦</span>
              <span>На рынке с 2011</span>
              <span className="font-semibold text-charcoal">{countYears} лет</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
              <span className="text-amber-500">★</span>
              <span>Рейтинг</span>
              <span className="font-semibold text-charcoal">5.0 на Avito</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
              <span className="text-green-600">✓</span>
              <span className="font-semibold text-charcoal">Надёжный продавец</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
              <span className="text-rose-gold">♥</span>
              <span className="font-semibold text-charcoal">{countReviews}+ отзывов</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
              <span className="text-blue-600">🚚</span>
              <span>Доставка по всей России</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const brands = ['Image Skincare', 'Charlotte Tilbury', 'Hourglass', 'Image MD'];
  const repeatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section id="brands" className="py-12 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-ivory text-center">
          Наши бренды
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-charcoal to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-charcoal to-transparent z-10"></div>
        <div className="flex animate-marquee">
          {repeatedBrands.map((brand, i) => (
            <div key={i} className="flex-shrink-0 px-12 md:px-16">
              <span className="font-serif text-2xl md:text-3xl text-ivory/80 whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`relative aspect-square bg-gradient-to-br ${product.gradient} p-6 flex items-center justify-center`}>
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-charcoal shadow-sm">
          Бренд из США
        </div>
        <div className="w-32 h-40 md:w-40 md:h-48 bg-white/50 backdrop-blur-sm rounded-xl shadow-inner flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-300">
          <span className="font-serif text-center text-sm md:text-base text-charcoal/80 leading-tight">{product.brand}</span>
          <span className="w-8 h-px bg-charcoal/30 my-2"></span>
          <span className="text-xs text-charcoal/60 text-center leading-tight">{product.name}</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <p className="text-xs text-rose-gold font-medium mb-1">{product.brand}</p>
        <h3 className="font-medium text-charcoal text-sm md:text-base mb-2 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        <p className="text-xs text-charcoal-light mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-semibold text-charcoal">
            {formatPrice(product.price)} ₽
          </span>
          <a
            href="https://t.me/beautysupply"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-charcoal text-ivory text-xs md:text-sm font-medium rounded-full hover:bg-charcoal-light transition-all hover:scale-105 focus-visible-ring shine-effect"
          >
            Заказать
          </a>
        </div>
      </div>
    </article>
  );
}

function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Каталог товаров
          </h2>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            Оригинальная американская косметика премиум-класса с официальными поставками
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" role="tablist" aria-label="Фильтры категорий">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all focus-visible-ring ${
                activeCategory === cat.id
                  ? 'bg-charcoal text-ivory shadow-lg'
                  : 'bg-white text-charcoal hover:bg-ivory-dark'
              }`}
              role="tab"
              aria-selected={activeCategory === cat.id}
              aria-controls="product-grid"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div id="product-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" role="tabpanel">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="text-center text-sm text-charcoal-light mt-8">
          50+ товаров на сайте + предзаказ любого beauty-товара из США
        </p>
      </div>
    </section>
  );
}

function PreOrderUSP() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-cream to-ivory-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-rose-gold mb-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Предзаказ
        </div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
          Не нашли нужное?
        </h2>
        <p className="text-lg md:text-xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Привезём <strong>любой</strong> брендовый beauty-товар из США под заказ. 
          Напишите нам — найдём и доставим.
        </p>
        <a
          href="https://t.me/beautysupply"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-gold to-rose-gold-light text-white font-medium rounded-full hover:shadow-lg hover:shadow-rose-gold/30 transition-all hover:scale-105 focus-visible-ring"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
          Оформить предзаказ в Telegram
        </a>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: '💯',
      title: 'Подлинность',
      description: 'Официальные поставки с проверяемыми штрих-кодами. Каждый товар — оригинальный.'
    },
    {
      icon: '🎯',
      title: 'Брендовый фокус',
      description: 'Специализируемся на премиальных американских брендах, труднодоступных в России.'
    },
    {
      icon: '🧴',
      title: 'Экспертный подбор',
      description: 'Поможем найти идеальный уход под ваш тип кожи и конкретные задачи.'
    },
    {
      icon: '💬',
      title: 'Осознанный сервис',
      description: 'Честная консультация, прозрачные условия, индивидуальный подход к каждому клиенту.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-charcoal-light max-w-xl mx-auto">
            Мы не просто продаём косметику — мы создаём доверие
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 bg-ivory rounded-2xl hover:bg-gradient-to-br hover:from-ivory hover:to-cream transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm md:text-base text-charcoal-light leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-ivory to-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-rose-gold mb-6">
              О компании
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              От маркетплейса до вашего любимого магазина
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              Мы начали свой путь в ноябре 2011 года на Avito, где заработали репутацию надёжного продавца с рейтингом 5.0. Сегодня Beauty Supply — это премиальный интернет-магазин оригинальной американской косметики.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              Наша миссия — сделать профессиональный уход и премиальный макияж из США доступными для каждого россиянина. Мы работаем только с официальными поставщиками и гарантируем подлинность каждого товара.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blush/50 to-champagne/50 rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="font-serif text-6xl md:text-7xl text-charcoal mb-2">14+</div>
                <div className="text-charcoal-light">лет на рынке</div>
                <div className="w-16 h-px bg-rose-gold mx-auto my-6"></div>
                <div className="font-serif text-5xl md:text-6xl text-charcoal mb-2">5.0</div>
                <div className="text-charcoal-light">рейтинг на Avito</div>
                <p className="text-xs text-charcoal-light mt-4 italic">по данным Avito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-ivory rounded-full text-sm font-medium text-rose-gold mb-6">
            Отзывы клиентов
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Нам доверяют
          </h2>
          <p className="text-charcoal-light">
            Отзывы с Avito — рейтинг <span className="font-semibold text-charcoal">5.0/5</span> · 33 отзыва · «Надёжный продавец»
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 bg-ivory rounded-2xl hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-charcoal mb-4 leading-relaxed">«{review.text}»</p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium text-charcoal">{review.name}</span>
                  <span className="text-charcoal-light"> · {review.date}</span>
                </div>
                <span className="text-xs text-charcoal-light">{review.product}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-charcoal-light mt-8 italic">
          По данным Avito · Авито Доставка
        </p>
      </div>
    </section>
  );
}

function BeautyGuide() {
  return (
    <section className="py-16 md:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-rose-gold mb-6">
            Бьюти-гид
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Полезные статьи
          </h2>
          <p className="text-charcoal-light">
            Экспертные советы по уходу и макияжу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {beautyArticles.map((article, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className={`aspect-video bg-gradient-to-br ${
                index === 0 ? 'from-rose-200 to-pink-100' :
                index === 1 ? 'from-amber-200 to-orange-100' :
                'from-blue-200 to-cyan-100'
              } flex items-center justify-center p-8`}>
                <div className="w-20 h-20 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {index === 0 ? '✨' : index === 1 ? '🌙' : '☀️'}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-rose-gold uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="font-serif text-xl text-charcoal mt-2 mb-3 group-hover:text-rose-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  return (
    <section id="delivery" className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-ivory rounded-full text-sm font-medium text-rose-gold mb-6">
            Доставка и оплата
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Как получить свой заказ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 md:p-8 bg-ivory rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-rose-gold-light rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-3">Доставка</h3>
            <ul className="space-y-2 text-charcoal-light">
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>Доставка в любой город России</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>По Москве — от 1 дня</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>По России — от 3 до 7 рабочих дней</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>Отправка в день заказа при оформлении до 14:00</span>
              </li>
            </ul>
          </div>

          <div className="p-6 md:p-8 bg-ivory rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-rose-gold-light rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-charcoal mb-3">Гарантии</h3>
            <ul className="space-y-2 text-charcoal-light">
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>100% оригинал с проверяемым штрих-кодом</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>Возврат в течение 7 дней</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>Оплата банковской картой или переводом</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-gold mt-1">✓</span>
                <span>Консультация специалиста перед покупкой</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-ivory to-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-rose-gold mb-6">
            Частые вопросы
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal">
            FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus-visible-ring"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-charcoal">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-charcoal-light flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`accordion-content ${openIndex === index ? 'open' : ''}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className="px-6 pb-4 text-charcoal-light leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contacts" className="py-16 md:py-24 bg-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-champagne/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory mb-6 leading-tight">
          Делаем для вас недоступное
          <span className="block gradient-text mt-2">— доступным!</span>
        </h2>
        <p className="text-lg text-ivory/70 max-w-xl mx-auto mb-10">
          Свяжитесь с нами для консультации или оформления заказа
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://t.me/beautysupply"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-gold to-rose-gold-light text-white font-medium rounded-full hover:shadow-lg hover:shadow-rose-gold/30 transition-all hover:scale-105 focus-visible-ring"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            Telegram
          </a>
          <a
            href="https://wa.me/79001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105 focus-visible-ring"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <a href="#" className="font-serif text-2xl md:text-3xl text-ivory font-semibold focus-visible-ring">
              Beauty Supply
            </a>
            <p className="text-ivory/60 mt-4 max-w-sm leading-relaxed">
              Премиальный интернет-магазин оригинальной американской косметики. На рынке с 2011 года.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://t.me/beautysupply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-ivory hover:bg-rose-gold transition-colors focus-visible-ring"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a
                href="https://vk.com/beautysupply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-ivory hover:bg-rose-gold transition-colors focus-visible-ring"
                aria-label="VK"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.339-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/beautysupply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-ivory hover:bg-rose-gold transition-colors focus-visible-ring"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://avito.ru/beautysupply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-ivory hover:bg-rose-gold transition-colors focus-visible-ring"
                aria-label="Avito"
              >
                <span className="text-xs font-bold">Av</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-ivory mb-4">Навигация</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-ivory/60 hover:text-ivory transition-colors focus-visible-ring">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-ivory mb-4">Контакты</h4>
            <ul className="space-y-3 text-ivory/60">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-rose-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Москва, Россия</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-rose-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@beauty-supply.shop" className="hover:text-ivory transition-colors focus-visible-ring">
                  info@beauty-supply.shop
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-rose-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <a href="https://t.me/beautysupply" target="_blank" rel="noopener noreferrer" className="hover:text-ivory transition-colors focus-visible-ring">
                  @beautysupply
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-ivory/40">
          <p>© 2011–2026 Beauty Supply. Все права защищены.</p>
          <p className="mt-2">Премиальная косметика из США с доставкой по всей России</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BrandMarquee />
        <ProductShowcase />
        <PreOrderUSP />
        <Benefits />
        <About />
        <Testimonials />
        <BeautyGuide />
        <Delivery />
        <FAQ />
      </main>
      <FinalCTA />
      <Footer />
    </div>
  );
}
