import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

// Interfaces
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  gradient: string;
  emoji: string;
  image?: string;
  details: string;
  ingredients: string;
  usage: string;
  concern: string;
  isAvailable: boolean;
}

interface Review {
  name: string;
  date: string;
  product: string;
  text: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  emoji: string;
  gradient: string;
  readTime: string;
}

// 12 Products Data (combining Avito prices and clinical info)
const products: Product[] = [
  {
    id: 1,
    name: 'Лифтинг-крем для тела VOL.U.lift',
    brand: 'Image Skincare',
    price: 7799,
    category: 'body',
    description: 'Интенсивное укрепление, лифтинг кожи тела и восстановление упругости.',
    gradient: 'from-[#F3E5D8] via-[#E8D5CE] to-[#F7E7CE]',
    emoji: '🧴',
    image: '/products/volu-body.png',
    concern: 'Потеря тонуса, дряблость, сухость кожи тела',
    isAvailable: true,
    details: 'Ультра-насыщенный лифтинг-крем для тела разработан для восстановления плотности и тонуса кожи. Идеально подходит для зон с выраженной потерей эластичности (шея, декольте, внутренняя поверхность рук и бедер, живот). Стимулирует выработку коллагена, глубоко увлажняет и разглаживает микрорельеф.',
    ingredients: 'Укрепляющий комплекс пептидов, органическое масло ши, масло сладкого миндаля, экстракт центеллы азиатской, витамин E, гиалуроновая кислота.',
    usage: 'Наносите обильное количество крема на чистую сухую кожу тела дважды в день (утром и вечером). Особое внимание уделяйте проблемным зонам с пониженным тонусом. Массируйте круговыми движениями снизу вверх до полного впитывания.'
  },
  {
    id: 2,
    name: 'VOL.U.lift (лицо)',
    brand: 'Image Skincare',
    price: 11599,
    category: 'face',
    description: 'Премиальный волюмайзер для лица. Восстанавливает объем и четкость контуров.',
    gradient: 'from-[#E8C9A8] via-[#F7E7CE] to-[#FFF8F0]',
    emoji: '✨',
    image: '/products/volu-face.png',
    concern: 'Глубокие морщины, потеря объема лица, птоз, дегидратация',
    isAvailable: true,
    details: 'Инновационный ремоделирующий крем-волюмайзер для лица. Работает как безоперационный липофилинг: заполняет морщины изнутри, восстанавливает утраченные объемы скул и щек, подтягивает овал лица. Обеспечивает мощный anti-age эффект и глубокое клеточное питание.',
    ingredients: 'Эксклюзивный комплекс пептидов-волюмайзеров, растительные стволовые клетки яблока, экстракт комбучи, стабильный витамин C, экстракт морских водорослей.',
    usage: 'Наносите тонким слоем на предварительно очищенную кожу лица, шеи и декольте легкими похлопывающими движениями по массажным линиям. Рекомендуется использовать ежедневно утром и вечером в сочетании с омолаживающей сывороткой.'
  },
  {
    id: 3,
    name: 'Восстанавливающий ночной крем с витамином C',
    brand: 'Image Skincare',
    price: 7799,
    category: 'face',
    description: 'Культовый крем Vital C. Глубокое увлажнение, борьба с тусклостью и куперозом.',
    gradient: 'from-[#FDFBF7] via-[#FFF8F0] to-[#E8C9A8]',
    emoji: '🍊',
    image: '/products/vital-c.png',
    concern: 'Сухость, тусклый цвет лица, купероз, розацеа, фотостарение',
    isAvailable: true,
    details: 'Бестселлер бренда Image Skincare из серии Vital C. Ночной крем с высокой концентрацией стабильных форм витамина C и антиоксидантов. За ночь полностью реанимирует уставшую, обезвоженную кожу, гасит воспаления, укрепляет стенки капилляров при куперозе и дарит лицу невероятное утреннее сияние.',
    ingredients: '20% смесь трех стабильных форм витамина С (аскорбилпальмитат, магния аскорбилфосфат, аскорбилфосфат натрия), витамин А (ретинилпальмитат), гиалуроновая кислота, экстракт семян винограда, супероксиддисмутаза.',
    usage: 'Вечером нанесите небольшое количество крема на очищенную кожу лица и шеи. Равномерно распределите. Для максимального эффекта против сухости наносите после увлажняющей сыворотки Vital C Hydrating Anti-Aging Serum.'
  },
  {
    id: 4,
    name: 'Ночной крем с ретинолом 0.3%',
    brand: 'Image Skincare',
    price: 8000,
    category: 'face',
    description: 'Ageless Total Retinol-A Crème. Мощное обновление клеток, борьба с акне и морщинами.',
    gradient: 'from-[#E8D5CE] via-[#EDE6DB] to-[#FDFBF7]',
    emoji: '🌙',
    image: '/products/retinol.png',
    concern: 'Возрастные морщины, гиперпигментация, постакне, неровный рельеф',
    isAvailable: true,
    details: 'Высокоэффективный ночной крем с инкапсулированным ретинолом 0.3%. Уникальная система доставки позволяет ретинолу проникать глубоко в дерму, запуская ускоренное обновление клеток без раздражения эпидермиса. Разглаживает заломы, осветляет пигментные пятна и следы постакне, сужает поры.',
    ingredients: 'Инкапсулированный ретинол 0.3%, гликолевая кислота, молочная кислота, пептидный комплекс (пальмитоил олигопептид), гиалуроновая кислота, экстракт огурца, масло ши.',
    usage: 'Применяйте строго вечером. Очистите лицо, просушите и нанесите небольшую горошину крема, избегая области вокруг глаз. Вводите в уход постепенно: 1-2 раза в неделю в первые две недели, затем увеличивайте частоту. Утром обязательно наносите солнцезащитный крем SPF 30 или SPF 75.'
  },
  {
    id: 5,
    name: 'Увлажняющий дневной крем SPF 30 Daily Prevention',
    brand: 'Image Skincare',
    price: 5200,
    category: 'spf',
    description: 'Новая премиальная линейка. 100% минеральные фильтры, идеальная база под макияж.',
    gradient: 'from-[#DCC8A3] via-[#EDE6DB] to-[#F7F4EF]',
    emoji: '☀️',
    image: '/products/spf30.png',
    concern: 'УФ-излучение, фотостарение, сухость кожи, пигментация',
    isAvailable: true,
    details: 'Премиальный солнцезащитный увлажняющий крем нового поколения из линии Daily Prevention. Содержит только безопасные физические минеральные фильтры (оксид цинка), которые отражают весь спектр UVA/UVB лучей. Не оставляет белого налета, интенсивно увлажняет кожу и служит безупречной базой под люксовые пудры и тона.',
    ingredients: 'Оксид цинка (физический фильтр), запатентованный комплекс антиоксидантов, экстракт зеленого чая, сок алоэ вера, гиалуроновая кислота, масло арганы.',
    usage: 'Наносите обильное количество крема на лицо и открытые участки кожи за 15 минут до выхода на улицу. Распределите мягкими движениями. При необходимости обновляйте каждые 2 часа при нахождении на активном солнце.'
  },
  {
    id: 6,
    name: 'Усиленный смарт-крем SPF 75',
    brand: 'Image Skincare',
    price: 6000,
    category: 'spf',
    description: 'Максимальная защита кожи после пилингов, лазера и в горах.',
    gradient: 'from-[#EDE6DB] via-[#F7F4EF] to-[#E8C9A8]',
    emoji: '🛡️',
    image: '/products/spf75.png',
    concern: 'Экстремальное солнце, гиперчувствительность после процедур, пигментные пятна',
    isAvailable: true,
    details: 'Ультра-защитный дневной смарт-крем с фактором SPF 75. Разработан для максимальной защиты поврежденной, чувствительной и подвергшейся агрессивным косметическим процедурам (пилинги, лазерная шлифовка) кожи. Блокирует 99% излучения, предотвращает появление гиперпигментации и рубцов.',
    ingredients: 'Оксид цинка, титановые микросферы, комплекс фотосом и роксисом (восстановление ДНК клеток под действием света), витамин C, пантенол, аллантоин.',
    usage: 'Равномерно нанесите на лицо и шею после очищения и сыворотки утром. Применяйте каждый раз после агрессивных салонных процедур перед выходом на улицу, даже в пасмурную погоду.'
  },
  {
    id: 7,
    name: 'Pillow Talk тени',
    brand: 'Charlotte Tilbury',
    price: 7500,
    category: 'makeup',
    description: 'Культовая люксовая палетка из 4 оттенков. Легендарный нежный нюд.',
    gradient: 'from-[#E8D5CE] via-[#FFF8F0] to-[#E8C9A8]',
    emoji: '🎨',
    image: '/products/pillow-talk.png',
    concern: 'Нюдовый макияж, праздничный образ, роскошный финиш',
    isAvailable: true,
    details: 'Знаменитая четырехцветная палетка теней Luxury Palette в оттенке Pillow Talk от звездного визажиста Шарлотты Тилбери. Содержит идеально подобранные пудровые текстуры: от сатинового шампанского до матового розово-коричневого и сверкающего розового золота. Мягко тушуются и держатся весь день.',
    ingredients: 'Микронизированная слюда, премиальные перламутровые пигменты, растительные масла для мягкого скольжения.',
    usage: 'Используйте кисть или аппликатор. Шаг 1: Нанесите оттенок Prime на все веко. Шаг 2: Выделите складку оттенком Enhance. Шаг 3: Добавьте глубины во внешний уголок с помощью Smoke. Шаг 4: Нанесите пальцем мерцающий Pop в центр века для вечернего сияния.'
  },
  {
    id: 8,
    name: 'Тени',
    brand: 'Hourglass',
    price: 6500,
    category: 'makeup',
    description: 'Curator Single Eyeshadow. Сверхмелкий помол и шелковистая текстура.',
    gradient: 'from-[#EDE6DB] via-[#F7E7CE] to-[#FFF8F0]',
    emoji: '👁️',
    image: '/products/curator.png',
    concern: 'Стойкий люксовый макияж, идеальное распределение',
    isAvailable: true,
    details: 'Профессиональные моно-тени Curator от Hourglass. Известны своим невероятно мелким, невесомым помолом и пигментированностью. Легко наносятся, не скатываются в складку века и создают эффект дорогого бархатного или влажного металлического финиша.',
    ingredients: 'Слюда высокой степени очистки, органические тальки без асбеста, минеральные пигменты.',
    usage: 'Наносите сухой кистью для мягкой дневной тушевки или влажной кистью для создания глубокого, зеркального металлического финиша.'
  },
  {
    id: 9,
    name: 'Палетка',
    brand: 'Hourglass',
    price: 7500,
    category: 'makeup',
    description: 'Ambient Lighting Palette. Культовое финишное сияние и разглаживание кожи.',
    gradient: 'from-[#F7F4EF] via-[#E8C9A8] to-[#EDE6DB]',
    emoji: '🌟',
    image: '/products/ambient-palette.png',
    concern: 'Тусклый цвет лица, видимые поры, неровный тон, отсутствие "Glow"',
    isAvailable: true,
    details: 'Культовое трио финишных пудр Ambient Lighting от Hourglass. Созданы по запатентованной фотолюминесцентной технологии. Мельчайшие пудры преломляют и рассеивают свет на лице, создавая эффект "мягкого фокуса", скрывают морщинки, поры и дарят коже роскошное холеное сияние дорогого спа-ухода.',
    ingredients: 'Высокотехнологичный фотолюминесцентный порошок, масло арганы, оксиды железа.',
    usage: 'Наносите большой пушистой кистью на все лицо в качестве финального шага макияжа после тонального крема и консилера. Смешивайте оттенки или используйте по отдельности как пудру, хайлайтер и деликатный бронзер.'
  },
  {
    id: 10,
    name: 'Румяна',
    brand: 'Hourglass',
    price: 3700,
    category: 'makeup',
    description: 'Ambient Lighting Blush. Мягкий румянец со светоотражающими пигментами.',
    gradient: 'from-[#E8D5CE] via-[#EDE6DB] to-[#FFF8F0]',
    emoji: '🌸',
    image: '/products/ambient-blush.png',
    concern: 'Бледность лица, плоский рельеф, уставший вид',
    isAvailable: true,
    details: 'Эксклюзивные румяна, сочетающие в себе пигмент румян и знаменитую светоотражающую пудру Ambient. Создают деликатный, многомерный румянец, который сливается с кожей, не подчеркивая шелушения и поры. Идеально подсвечивают щеки.',
    ingredients: 'Органические пигменты, фотолюминофор, масло ши.',
    usage: 'Улыбнитесь и нанесите румяна пушистой скошенной кистью на «яблочки» щек, растушевывая по направлению к вискам.'
  },
  {
    id: 11,
    name: 'Контуринг',
    brand: 'Charlotte Tilbury',
    price: 3500,
    category: 'makeup',
    description: 'Hollywood Contour Wand. Знаменитый жидкий скульптор для идеальных скул.',
    gradient: 'from-[#EDE6DB] via-[#E8C9A8] to-[#F7F4EF]',
    emoji: '🖌️',
    concern: 'Круглое лицо, отсутствие скульптурности, тусклый плоский макияж',
    isAvailable: true,
    details: 'Легендарный жидкий скульптор с мягким поролоновым аппликатором-подушечкой. Обладает идеальным холодным серо-коричневым оттенком без рыжины, имитирующим естественную тень на лице. Тает на коже, легко тушуется даже пальцем и создает точеные голливудские скулы.',
    ingredients: 'Жидкие силиконы нового поколения, пигменты холодного спектра, микроскопические светофильтры.',
    usage: 'Поверните дозатор в положение ON, мягко сожмите тюбик и нанесите точечно 2-3 капли под скуловую кость, на виски, боковые стороны носа и линию челюсти. Растушуйте кистью, спонжем или подушечками пальцев. Верните дозатор в положение OFF после использования.'
  },
  {
    id: 12,
    name: 'Restoring Youth Serum',
    brand: 'Image MD',
    price: 10800,
    category: 'face',
    description: 'Restoring Youth Serum. Высококонцентрированная сыворотка с пептидами и ретинолом.',
    gradient: 'from-[#DCC8A3] via-[#E8D5CE] to-[#F7F4EF]',
    emoji: '💧',
    concern: 'Птоз, возрастные морщины, потеря упругости, тусклость, неровный тон',
    isAvailable: true,
    details: 'Премиальная омолаживающая сыворотка молодости из клинической линии Image MD. Содержит уникальный коктейль из инкапсулированного ретинола, стабильной формы витамина C, кислот и мощных пептидов последнего поколения. Глубоко омолаживает, стимулирует регенерацию клеток, разглаживает морщины и укрепляет овал лица.',
    ingredients: 'Инкапсулированный ретинол (медленное высвобождение), аскорбилфосфат натрия (витамин C), пептидный комплекс (Matrixyl Synthe 6), гликолевая кислота, растительные стволовые клетки арганы.',
    usage: 'Наносите 2-3 капли сыворотки на очищенную кожу лица и шеи вечером перед использованием ночного крема. При первом применении может ощущаться легкое покалывание — это нормальная реакция на кислоты и ретинол. Днем обязательно используйте крем с SPF.'
  }
];

// Categories
const categories = [
  { id: 'all', name: 'Все товары' },
  { id: 'face', name: 'Уход за лицом' },
  { id: 'body', name: 'Уход за телом' },
  { id: 'spf', name: 'SPF-защита' },
  { id: 'makeup', name: 'Профессиональный макияж' }
];

// Real Reviews
const reviews: Review[] = [
  { name: 'Юля', date: '2 мая 2026', product: 'Gisou маска для волос 230', text: 'Спасибо!⚘️⚘️⚘️ Штрих-код пробивается, оригинальное средство! Доставка за 2 дня в Питер.' },
  { name: 'Анастасия', date: '22 апреля 2026', product: 'Gisou масло для губ', text: 'Все отлично) Спасибо большое ☺️ Быстро ответили в Телеграм, проконсультировали.' },
  { name: 'Елена', date: '15 марта 2026', product: 'Image Skincare SPF 75', text: 'Получила быстрее, чем ожидала. Всё упаковано качественно, оригинальность подтверждается кодом на коробке.' },
  { name: 'Дарья', date: '28 февраля 2026', product: 'Charlotte Tilbury Pillow Talk', text: 'Долго искала эту палетку. Продавец помог с выбором, ответил на все вопросы. Рекомендую!' },
  { name: 'Марина', date: '10 февраля 2026', product: 'Hourglass палетка', text: 'Впервые заказываю здесь. Всё чётко: от консультации до доставки. Товар как на фото!' }
];

// Rich SEO Articles (Beauty Guide)
const articles: Article[] = [
  {
    id: 1,
    title: 'Физические против химических фильтров: развенчиваем мифы и выбираем безопасный SPF',
    category: 'Защита',
    excerpt: 'Разбираемся в механизме действия минеральной и химической защиты от ультрафиолета.',
    emoji: '☀️',
    gradient: 'from-[#FDFBF7] via-[#FFF8F0] to-[#E8C9A8]',
    readTime: '5 мин',
    content: 'Солнцезащитные кремы стали обязательным элементом ухода за кожей. Но как выбрать идеальный фильтр? Физические (минеральные) фильтры, такие как оксид цинка и диоксид титана, работают на поверхности кожи как микро-зеркала, отражая и рассеивая UVA и UVB лучи. Они гипоаллергенны и идеальны для чувствительной кожи, а также после косметологических пилингов. Химические фильтры нового поколения поглощают УФ-лучи и превращают их в тепловую энергию. \n\nВ нашей новой линейке Image Skincare Daily Prevention SPF 30 мы используем усовершенствованную физическую минеральную защиту, которая ложится тончайшим шелковым слоем без белого налета и липкости, обеспечивая мощную профилактику фотостарения и служа идеальной базой под ваш макияж.'
  },
  {
    id: 2,
    title: 'Ретинол 0.3%: как начать использовать и не сжечь кожу',
    category: 'Anti-age',
    excerpt: 'Полное руководство по безопасному введению ретиноидов в ночную программу ухода за зрелой кожей.',
    emoji: '🌙',
    gradient: 'from-[#E8D5CE] via-[#EDE6DB] to-[#FDFBF7]',
    readTime: '7 мин',
    content: 'Ретинол (витамин А) признан дерматологами «золотым стандартом» омоложения. Он стимулирует выработку коллагена, ускоряет деление клеток, борется с пигментацией и выравнивает рельеф лица. Однако неправильный старт может привести к покраснениям и шелушениям (ретиноидному дерматиту).\n\nЧтобы избежать побочных эффектов, используйте инкапсулированный ретинол 0.3% от Image Skincare Ageless. Инкапсуляция позволяет активному компоненту высвобождаться постепенно в течение ночи. Наносите крем на абсолютно сухую кожу строго вечером, начиная с 2 раз в неделю. И не забывайте про SPF-защиту каждое утро!'
  },
  {
    id: 3,
    title: 'Эффект "дорогой" сияющей кожи: пошаговый туториал премиального макияжа',
    category: 'Макияж',
    excerpt: 'Как создать безупречный влажный финиш на лице с помощью Hourglass и Charlotte Tilbury.',
    emoji: '✨',
    gradient: 'from-[#EDE6DB] via-[#F7E7CE] to-[#FFF8F0]',
    readTime: '4 мин',
    content: 'Эффект "дорогой холеной кожи" (Glow Skin) — главный тренд голливудских красных дорожек. Он строится на идеальной подготовке кожи и рассеивании света. Сначала нанесите увлажняющую базу или крем Image Skincare SPF 30. Затем выполните легкое контурирование с помощью жидкого скульптора Charlotte Tilbury Hollywood Contour Wand, чтобы прорисовать естественные тени.\n\nФинальный штрих — легендарная финишная пудра Hourglass Ambient Lighting. Ее микросферы преломляют свет, стирая с лица поры, мелкие морщинки и усталость, создавая сияние, будто вы только что вернулись из элитного швейцарского спа.'
  }
];

const ProductVisual = ({ product, large = false }: { product: Product; large?: boolean }) => {
  if (product.image) {
    return <img src={product.image} alt={`${product.brand} — ${product.name}`} className={`h-full w-full object-cover ${large ? 'scale-105' : ''}`} loading={large ? 'eager' : 'lazy'} />;
  }
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <span className={large ? 'text-6xl' : 'text-4xl'} aria-hidden="true">{product.emoji}</span>
      <span className="mt-3 font-serif text-xs font-semibold uppercase tracking-widest text-[#1F1F1F]/70">{product.brand}</span>
      <span className="mt-2 text-[9px] leading-relaxed text-[#4A4541]">{product.name}</span>
    </div>
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Official Avito trust metric (see CONTEXT-AVITO.MD / README)
  const reviewsCount = 33;
  const catalogTabId = useId();
  const catalogPanelId = useId();
  const productCloseRef = useRef<HTMLButtonElement | null>(null);
  const articleCloseRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isModalOpen = selectedProduct !== null || selectedArticle !== null;
    if (!isModalOpen) return;

    lastFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
        setSelectedArticle(null);
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    const focusTarget = selectedProduct ? productCloseRef.current : articleCloseRef.current;
    // Defer focus until dialog is painted
    requestAnimationFrame(() => focusTarget?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      lastFocusRef.current?.focus?.();
    };
  }, [selectedArticle, selectedProduct]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  useEffect(() => () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) {
      triggerToast('Пожалуйста, заполните обязательные поля.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      triggerToast('Введите корректный адрес электронной почты.');
      return;
    }
    const subject = `Запрос с сайта от ${trimmedName}`;
    const body = [
      `Имя: ${trimmedName}`,
      `Email для ответа: ${trimmedEmail}`,
      '',
      message.trim() || 'Сообщение не указано.'
    ].join('\n');
    window.location.href = `mailto:info@beautysupply.shop?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    triggerToast('Открываем почтовый клиент для отправки сообщения.');
  };

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      triggerToast('Введите корректный email для подписки.');
      return;
    }
    // Static site: no backend — route interest to Telegram with prefilled context
    const text = encodeURIComponent(
      `Здравствуйте! Хочу получать новости Beauty Supply. Мой email: ${trimmed}`
    );
    window.open(`https://t.me/beautysupply?text=${text}`, '_blank', 'noopener,noreferrer');
    setNewsletterEmail('');
    triggerToast('Открываем Telegram — там самые быстрые новости о выкупах.');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
      toastTimeoutRef.current = null;
    }, 5000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  // Pre-filled Messenger links
  const getTelegramLink = (productName: string, price: number) => {
    const text = encodeURIComponent(
      `Здравствуйте! Хочу заказать на сайте beautysupply.shop товар: ${productName} за ${price} руб. Пожалуйста, оформите доставку.`
    );
    return `https://t.me/beautysupply?text=${text}`;
  };

  const getWhatsAppLink = (productName?: string) => {
    const item = productName ? ` по товару «${productName}»` : '';
    return `https://wa.me/?text=${encodeURIComponent(`Здравствуйте! Нужна консультация${item} на сайте Beauty Supply.`)}`;
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1F1F1F] selection:bg-[#C8A96D] selection:text-white font-sans antialiased">
      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-6 right-6 z-50 max-w-md"
      >
        {toastMessage && (
          <div className="bg-[#1F1F1F] text-[#F7F4EF] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-[#C8A96D]/30 transition-all duration-300 animate-slide-up">
            <span className="text-[#C8A96D] text-lg" aria-hidden="true">✦</span>
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        aria-label="Основная навигация"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass border-b border-[#EDE6DB]/40 shadow-sm' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#top" className="font-serif text-2xl md:text-3xl font-semibold tracking-wide hover:opacity-80 transition-opacity">
              BEAUTY SUPPLY
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#catalog" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">Каталог</a>
              <a href="#brands" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">Бренды</a>
              <a href="#about" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">О нас</a>
              <a href="#reviews" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">Отзывы</a>
              <a href="#guide" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">Бьюти-гид</a>
              <a href="#delivery" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">Доставка</a>
              <a href="#contact" className="text-xs font-semibold uppercase tracking-wider text-[#4A4541] hover:text-[#C8A96D] transition-colors">Контакты</a>
            </div>

            {/* Chat button */}
            <div className="hidden lg:flex items-center">
              <a
                href="https://t.me/beautysupply"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#229ED9] text-white hover:bg-[#168AC4] text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-lg shadow-black/10 focus-visible-ring shine-effect"
              >
                Заказать в Telegram
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C8A96D] transition-colors focus-visible-ring rounded"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="lg:hidden bg-[#F7F4EF] border-b border-[#EDE6DB] px-4 pt-2 pb-6 space-y-3 shadow-lg"
          >
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">Каталог</a>
            <a href="#brands" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">Бренды</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">О нас</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">Отзывы</a>
            <a href="#guide" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">Бьюти-гид</a>
            <a href="#delivery" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">Доставка</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold tracking-wider uppercase text-[#4A4541] focus-visible-ring rounded">Контакты</a>
            <div className="pt-2 px-3">
              <a
                href="https://t.me/beautysupply"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center inline-block px-6 py-3 bg-[#1F1F1F] text-[#F7F4EF] text-xs font-bold uppercase tracking-wider rounded-full focus-visible-ring"
              >
                Заказать в Telegram
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* 1. HERO BLOCK */}
      <section id="top" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-[#F7F4EF] to-[#EDE6DB]/50">
        {/* Abstract orbs to replicate premium feel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E8D5CE]/30 blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#DCC8A3]/20 blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-8 text-left">
              <span className="inline-block px-4 py-1.5 border border-[#C8A96D]/40 text-[#C8A96D] text-xs font-bold uppercase tracking-widest rounded-full bg-white/50">
                Premium Beauty E-commerce
                <small className="block normal-case tracking-normal font-medium text-[9px] mt-0.5">Премиальный бьюти-магазин</small>
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-[#1F1F1F] leading-[1.1] tracking-tight">
                Authentic Beauty <br />
                <span className="font-semibold italic text-[#C8A96D]">from the USA</span>
              </h1>
              <p className="-mt-5 font-serif text-sm italic text-[#A69C91]">Оригинальная косметика напрямую из США</p>
              <p className="text-[#4A4541] text-base sm:text-lg max-w-xl leading-relaxed">
                Делаем для вас недоступное — доступным! Оригинальная уходовая и декоративная косметика премиум-класса напрямую из США. Только проверенные бренды и рабочие формулы.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#catalog"
                  className="px-8 py-4 bg-[#1F1F1F] text-[#F7F4EF] hover:bg-[#C8A96D] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 shadow-xl shadow-black/10 focus-visible-ring"
                >
                  Смотреть каталог
                </a>
                <a
                  href="#about"
                  className="px-8 py-4 border-2 border-[#1F1F1F] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#F7F4EF] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 focus-visible-ring"
                >
                  О магазине
                </a>
              </div>
              
              {/* Partner Logos */}
              <div className="pt-8 border-t border-[#EDE6DB]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#A69C91] mb-4">Наши Флагманские Бренды</p>
                <div className="flex flex-wrap items-center gap-8 sm:gap-12 opacity-80">
                  <span className="font-serif text-sm font-semibold tracking-widest text-[#1F1F1F]">IMAGE SKINCARE</span>
                  <span className="font-serif text-sm font-semibold tracking-widest text-[#1F1F1F]">Charlotte Tilbury</span>
                  <span className="font-serif text-sm font-semibold tracking-widest text-[#1F1F1F]">HOURGLASS</span>
                </div>
              </div>
            </div>

            {/* Hero Image Mockup (Aesthetic premium collage with CSS/SVG) */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-80 h-96 sm:w-96 sm:h-[450px] bg-gradient-to-br from-[#EDE6DB] to-[#E8D5CE] rounded-3xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden group border border-white/20">
                {/* Background artistic glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFF8F0]/30 to-white/20 pointer-events-none"></div>
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/20 blur-2xl"></div>

                <div className="flex justify-between items-start relative z-10">
                  <span className="font-serif text-xl tracking-wider font-light italic">Est. 2011</span>
                  <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg text-xl">
                    🇺🇸
                  </div>
                </div>

                {/* Vector stylized makeup setup */}
                <div className="my-auto py-8 relative z-10 flex flex-col items-center">
                  <div className="w-24 h-36 bg-gradient-to-b from-[#C8A96D]/10 to-[#C8A96D]/30 border-2 border-[#C8A96D] rounded-xl flex flex-col items-center justify-center p-3 shadow-lg relative transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                    <span className="text-3xl mb-1">🧴</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#1F1F1F] font-serif font-bold text-center">IMAGE MD</span>
                    <span className="w-6 h-0.5 bg-[#C8A96D] my-1"></span>
                    <span className="text-[7px] text-center text-[#4A4541]">Youth Serum</span>
                  </div>

                  <div className="w-20 h-20 bg-gradient-to-br from-[#EDE6DB] to-[#DCC8A3] border border-[#C8A96D] rounded-full shadow-lg absolute right-10 bottom-6 transform rotate-12 flex flex-col items-center justify-center p-2 hover:scale-110 transition-transform duration-500">
                    <span className="text-xl">🌸</span>
                    <span className="text-[6px] uppercase tracking-wider font-bold">Hourglass</span>
                  </div>
                </div>

                <div className="flex justify-between items-end relative z-10 pt-4 border-t border-black/5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#4A4541] font-bold">Оригиналы из США</p>
                    <p className="text-[10px] text-[#A69C91]">Склады в Москве</p>
                  </div>
                  <span className="text-xs font-bold text-[#C8A96D] hover:underline">100% ORIGINAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CREDIBILITY (Trust Bar) */}
      <section className="bg-white py-12 md:py-16 border-y border-[#EDE6DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center items-center">
            <div className="space-y-1">
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#C8A96D]">С 2011</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A69C91]">На рынке косметики</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#C8A96D]">5.0</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A69C91]">Рейтинг на Avito</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#C8A96D]">{reviewsCount}+</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A69C91]">Живых отзывов</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#C8A96D]">100%</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A69C91]">Надёжный продавец</p>
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#C8A96D]">РФ</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A69C91]">Быстрая Доставка</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY GRID */}
      <section className="py-20 md:py-28 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest">Выбор по категориям</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Категории ухода и красоты</h2>
            <div className="w-16 h-0.5 bg-[#C8A96D] mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Уход за лицом', desc: 'Кремы, сыворотки, ретинол и омоложение', emoji: '✨', categoryId: 'face', gradient: 'from-[#E8C9A8] to-[#FFF8F0]' },
              { title: 'Уход за телом', desc: 'Укрепляющие и подтягивающие лифтинг-кремы', emoji: '🧴', categoryId: 'body', gradient: 'from-[#F3E5D8] to-[#E8D5CE]' },
              { title: 'SPF-защита', desc: 'Минеральные премиальные солнцезащитные кремы', emoji: '☀️', categoryId: 'spf', gradient: 'from-[#DCC8A3] to-[#EDE6DB]' },
              { title: 'Профессиональный макияж', desc: 'Трендовые палетки, контуринг и румяна', emoji: '🎨', categoryId: 'makeup', gradient: 'from-[#E8D5CE] to-[#FDFBF7]' }
            ].map((cat, idx) => (
              <a
                href="#catalog"
                key={idx}
                onClick={() => setSelectedCategory(cat.categoryId)}
                className="group relative h-72 bg-gradient-to-br rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#EDE6DB]/30"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                
                <div className="relative z-10 text-4xl bg-white/70 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md shadow-black/5 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </div>

                <div className="relative z-10 space-y-2">
                  <h3 className="font-serif text-xl font-semibold leading-tight text-[#1F1F1F] group-hover:text-[#C8A96D] transition-colors">{cat.title}</h3>
                  <p className="text-xs text-[#4A4541] leading-relaxed opacity-90">{cat.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED BRANDS */}
      <section id="brands" className="py-20 md:py-28 bg-[#1F1F1F] text-[#F7F4EF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest">Top Brands</span><p className="text-[10px] text-[#A69C91] mt-1">Избранные премиальные бренды</p></div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white">Премиальные Импортные Бренды</h2>
            <p className="text-[#A69C91] text-sm max-w-lg mx-auto">Прямые поставки из США гарантируют 100% оригинальность составов и текстур.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'IMAGE Skincare',
                search: 'Image Skincare',
                slogan: 'Clinical. Clean. Conscious.',
                desc: 'Профессиональная космецевтика, созданная пластическими хирургами и дерматологами. Умные формулы с доказанным действием (ретинол, стабильный витамин C, пептиды).',
                bg: 'bg-white/5 border border-white/10'
              },
              {
                name: 'Charlotte Tilbury',
                search: 'Charlotte Tilbury',
                slogan: 'Makeup Magic For Every Look',
                desc: 'Культовый британский и американский люкс от визажиста мировых звезд Шарлотты Тилбери. Самые разыскиваемые палетки, скульпторы и помады.',
                bg: 'bg-gradient-to-b from-white/5 to-[#C8A96D]/10 border border-[#C8A96D]/20'
              },
              {
                name: 'HOURGLASS',
                search: 'Hourglass',
                slogan: 'Modern Luxury Beauty',
                desc: 'Революционный премиальный макияж, известный веганскими формулами и запатентованной фотолюминисцентной технологией Ambient для кожи.',
                bg: 'bg-white/5 border border-white/10'
              }
            ].map((brand) => (
              <div
                key={brand.name}
                className={`p-8 rounded-2xl space-y-6 flex flex-col justify-between ${brand.bg} hover:border-[#C8A96D]/50 transition-colors duration-300`}
              >
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-white">{brand.name}</h3>
                  <div><p className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest italic">{brand.slogan}</p><p className="text-[10px] text-[#A69C91] mt-1">Премиальный выбор для вашей красоты</p></div>
                  <p className="text-[#A69C91] text-xs leading-relaxed">{brand.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery(brand.search);
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#C8A96D] transition-colors flex items-center gap-2 focus-visible-ring rounded"
                >
                  Смотреть продукты →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS (Catalog) */}
      <section id="catalog" className="py-20 md:py-28 bg-[#EDE6DB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest">Our Collection</span><p className="text-[10px] text-[#A69C91] mt-1">Наша тщательно отобранная коллекция</p></div>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Каталог Продукции</h2>
            <p className="text-[#4A4541] text-sm max-w-xl mx-auto">
              Оригинальные товары в наличии на складе в Москве. Нажмите на любой товар, чтобы узнать его состав, способ применения и оформить быстрый заказ.
            </p>
          </div>

          {/* Catalog Filters and Search */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
            {/* Category tabs */}
            <div
              className="flex flex-wrap gap-2 justify-center"
              role="tablist"
              aria-label="Категории каталога"
            >
              {categories.map((cat) => {
                const selected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`${catalogTabId}-${cat.id}`}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible-ring ${
                      selected
                        ? 'bg-[#1F1F1F] text-[#F7F4EF] shadow-md'
                        : 'bg-white text-[#4A4541] hover:bg-[#EDE6DB] border border-[#EDE6DB]/40'
                    }`}
                    role="tab"
                    aria-selected={selected}
                    aria-controls={catalogPanelId}
                    tabIndex={selected ? 0 : -1}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Live Search bar */}
            <div className="relative w-full md:w-80">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию или бренду..."
                aria-label="Поиск по каталогу"
                autoComplete="off"
                className="w-full px-5 py-2.5 pr-10 text-xs bg-white border border-[#EDE6DB] rounded-full focus:outline-none focus:border-[#C8A96D] focus:ring-1 focus:ring-[#C8A96D]"
              />
              <svg className="absolute right-4 top-2.5 w-4 h-4 text-[#A69C91] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Grid Products */}
          {filteredProducts.length > 0 ? (
            <div
              id={catalogPanelId}
              role="tabpanel"
              aria-label="Список товаров"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Открыть карточку товара: ${product.name}`}
                  onClick={() => setSelectedProduct(product)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedProduct(product);
                    }
                  }}
                  className="group cursor-pointer focus-visible-ring bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#EDE6DB]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Photo area */}
                  <div className={`relative aspect-square bg-gradient-to-br ${product.gradient} p-6 flex flex-col justify-between`}>
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest text-[#1F1F1F]">
                        Бренд из США
                      </span>
                      <span className="text-xl">{product.emoji}</span>
                    </div>

                    <div className="absolute inset-0 overflow-hidden">
                      <ProductVisual product={product} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none"></div>

                    <p className="relative z-10 text-[8px] text-center font-bold uppercase tracking-widest text-white drop-shadow-sm">Детали</p>
                  </div>

                  {/* Body description */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96D]">{product.brand}</p>
                    <h3 className="font-serif font-semibold text-[#1F1F1F] text-sm md:text-base leading-snug line-clamp-2 min-h-[40px]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#A69C91] line-clamp-1">{product.concern}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-[#F7F4EF]">
                      <span className="text-sm sm:text-base font-bold text-[#1F1F1F]">
                        {formatPrice(product.price)} ₽
                      </span>
                      <span className="px-4 py-2 bg-[#1F1F1F] text-[#F7F4EF] group-hover:bg-[#C8A96D] text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors">
                        Подробнее
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#EDE6DB]">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-sm font-semibold text-[#4A4541]">Товары не найдены</p>
              <p className="text-xs text-[#A69C91] mt-2">Попробуйте ввести другое ключевое слово или сбросить фильтр категорий.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-6 px-6 py-2.5 bg-[#1F1F1F] text-[#F7F4EF] text-xs font-bold uppercase tracking-wider rounded-full focus-visible-ring"
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* Pre-order USP info block */}
          <div className="mt-16 bg-gradient-to-br from-[#1F1F1F] to-[#4A4541] rounded-3xl p-8 sm:p-12 text-[#F7F4EF] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 shadow-2xl">
            <div className="space-y-4 max-w-xl text-left">
              <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest block">Custom Orders</span><p className="text-[10px] text-[#A69C91] mt-1">Индивидуальный выкуп под заказ</p></div>
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">Привезём абсолютно любой бьюти-товар из США под заказ!</h3>
              <p className="text-[#A69C91] text-xs sm:text-sm leading-relaxed">
                Не нашли нужное средство, палетку или оттенок на сайте? Мы сделаем выкуп с Sephora USA или официальных сайтов брендов и доставим за 14–21 день.
              </p>
            </div>
            <a
              href="https://t.me/beautysupply"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#229ED9] hover:bg-[#168AC4] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-[#229ED9]/20"
            >
              Сделать спецзаказ в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* 6. ABOUT BRAND */}
      <section id="about" className="py-20 md:py-28 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 space-y-6 text-left">
              <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest block">About Us</span><p className="text-[10px] text-[#A69C91] mt-1">О Beauty Supply</p></div>
              <div><h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight">Curated with Expertise. <br />Chosen with Care.</h2><p className="mt-2 text-xs text-[#A69C91]">Отобрано с экспертизой. Выбрано с заботой.</p></div>
              <div className="w-16 h-0.5 bg-[#C8A96D]"></div>
              
              <p className="text-sm text-[#4A4541] leading-relaxed">
                Beauty Supply начал свой путь в ноябре 2011 года как экспертный бьюти-дистрибьютор оригинальной американской косметики на платформе Avito. За годы безупречной работы мы заслужили репутацию надёжного партнёра, завоевав рейтинг 5.0 на основе десятков живых отзывов.
              </p>
              <p className="text-sm text-[#4A4541] leading-relaxed">
                Наша миссия — открыть российским покупателям доступ к закрытым профессиональным космецевтическим маркам из США и трендовым лимитированным выпускам декоративного люкса, которые не представлены на полках классического ритейла. Мы гарантируем полную прозрачность поставок, верифицируемость каждого батч-кода и искренний экспертный сервис.
              </p>

              <div className="pt-4">
                <a
                  href="#contact"
                  className="px-8 py-3.5 bg-[#1F1F1F] text-[#F7F4EF] hover:bg-[#C8A96D] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  Связаться с нами
                </a>
              </div>
            </div>

            {/* Collage of values */}
            <div className="md:col-span-6 relative flex justify-center">
              <div className="aspect-square w-80 sm:w-96 rounded-2xl bg-gradient-to-br from-[#EDE6DB] via-[#E8D5CE]/40 to-[#FFF8F0] border border-[#EDE6DB] p-8 flex flex-col justify-between shadow-lg relative">
                <div className="absolute top-0 right-10 transform -translate-y-6 bg-white border border-[#C8A96D] px-6 py-4 rounded-xl shadow-md text-center">
                  <p className="text-2xl font-serif font-light text-[#C8A96D]">14+ лет</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-[#A69C91] mt-1">Опыт работы</p>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">💯</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold">100% Оригинальность</h4>
                      <p className="text-xs text-[#A69C91] leading-relaxed">Вся косметика выкупается исключительно у официальных представителей в США.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🧬</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold">Экспертный подбор</h4>
                      <p className="text-xs text-[#A69C91] leading-relaxed">Наши консультанты подберут средства на основе анализа типа кожи и потребностей.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📦</span>
                    <div>
                      <h4 className="font-serif text-base font-semibold">Премиальная упаковка</h4>
                      <p className="text-xs text-[#A69C91] leading-relaxed">Все заказы оборачиваются в бумагу тишью и поставляются в эстетичных коробках.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#EDE6DB] text-center">
                  <span className="font-serif text-xs text-[#C8A96D] font-medium tracking-wide">BEAUTY SUPPLY — ВАШ БЬЮТИ ПОРТАЛ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section id="reviews" className="py-20 md:py-28 bg-white border-y border-[#EDE6DB]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest">Real Customer Feedback</span><p className="text-[10px] text-[#A69C91] mt-1">Настоящие отзывы наших клиентов</p></div>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Клиенты о нас</h2>
            <p className="text-[#4A4541] text-sm max-w-md mx-auto">
              Честные отзывы с официальной страницы магазина на Avito (Рейтинг 5.0).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((review, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#F7F4EF]/50 border border-[#EDE6DB]/40 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4 text-left">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-sm text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-sm italic leading-relaxed text-[#4A4541]">«{review.text}»</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#EDE6DB]/40 text-xs">
                  <div>
                    <p className="font-bold text-[#1F1F1F]">{review.name}</p>
                    <p className="text-[#A69C91] text-[10px] mt-0.5">{review.date}</p>
                  </div>
                  <span className="px-2 py-1 bg-white border border-[#EDE6DB] text-[#4A4541] font-medium text-[9px] rounded-full max-w-[120px] truncate">
                    {review.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BEAUTY GUIDE */}
      <section id="guide" className="py-20 md:py-28 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest">Beauty Guide</span><p className="text-[10px] text-[#A69C91] mt-1">Экспертные заметки о красоте</p></div>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Полезный Бьюти-Гид</h2>
            <p className="text-[#4A4541] text-sm max-w-md mx-auto">
              Разбираемся в активах ухода и тонкостях макияжа вместе с нашими экспертами.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                role="button"
                tabIndex={0}
                aria-label={`Открыть статью: ${art.title}`}
                onClick={() => setSelectedArticle(art)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedArticle(art);
                  }
                }}
                className="group cursor-pointer focus-visible-ring bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#EDE6DB]/30 transition-all duration-300"
              >
                <div className={`aspect-video bg-gradient-to-br ${art.gradient} flex items-center justify-center p-8 relative`}>
                  <div className="text-5xl bg-white/70 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300">
                    {art.emoji}
                  </div>
                  <span className="absolute bottom-3 right-3 text-[9px] font-bold uppercase tracking-widest text-[#A69C91] bg-white/80 px-2 py-0.5 rounded-full">
                    {art.readTime}
                  </span>
                </div>

                <div className="p-6 text-left space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A96D]">
                    {art.category}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#1F1F1F] leading-snug group-hover:text-[#C8A96D] transition-colors line-clamp-2 min-h-[50px]">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#A69C91] leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DELIVERY & PAYMENT */}
      <section id="delivery" className="py-16 md:py-20 bg-[#1F1F1F] text-[#F7F4EF] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start text-center">
            <div className="space-y-3 flex flex-col items-center">
              <span className="text-3xl">🚚</span>
              <h4 className="font-serif font-semibold text-sm">Доставка по РФ</h4>
              <p className="text-[10px] text-[#A69C91] leading-relaxed">Быстрая отправка в любой город России (СДЭК, Боксберри, Почта).</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <span className="text-3xl">🛡️</span>
              <h4 className="font-serif font-semibold text-sm">Безопасная оплата</h4>
              <p className="text-[10px] text-[#A69C91] leading-relaxed">SBP, интернет-эквайринг или наложенный платеж Авито.</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <span className="text-3xl">📦</span>
              <h4 className="font-serif font-semibold text-sm">Премиум-упаковка</h4>
              <p className="text-[10px] text-[#A69C91] leading-relaxed">Бережная и эстетичная упаковка в тишью с открыткой и подарком.</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <span className="text-3xl">⚡</span>
              <h4 className="font-serif font-semibold text-sm">Отгрузка за 1 день</h4>
              <p className="text-[10px] text-[#A69C91] leading-relaxed">При заказе из наличия отправляем посылку в день обращения до 14:00.</p>
            </div>
            <div className="space-y-3 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="text-3xl">💎</span>
              <h4 className="font-serif font-semibold text-sm">100% Оригиналы</h4>
              <p className="text-[10px] text-[#A69C91] leading-relaxed">Прямой выкуп у сертифицированных поставщиков в США.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT & SUPPORT */}
      <section id="contact" className="py-20 md:py-28 bg-[#EDE6DB]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Contact details */}
            <div className="md:col-span-5 space-y-8 text-left">
              <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest block">Contact Us</span><p className="text-[10px] text-[#A69C91] mt-1">Свяжитесь с нами</p></div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight">Мы на связи</h2>
              <div className="w-16 h-0.5 bg-[#C8A96D]"></div>
              
              <p className="text-xs sm:text-sm text-[#4A4541] leading-relaxed">
                Наши эксперты с удовольствием ответят на вопросы об уходе, помогут верифицировать батч-коды или оформят индивидуальный предзаказ из США. Напишите нам в мессенджеры для моментальной связи.
              </p>

              <div className="space-y-4 pt-4 text-xs sm:text-sm text-[#4A4541]">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <span>Москва, Россия</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">✉️</span>
                  <a href="mailto:info@beautysupply.shop" className="hover:text-[#C8A96D] transition-colors">info@beautysupply.shop</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <a href="https://t.me/beautysupply" target="_blank" rel="noopener noreferrer" className="hover:text-[#229ED9] transition-colors font-semibold">@beautysupply (Telegram)</a>
                </div>
              </div>

              {/* Direct Messenger Buttons */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://t.me/beautysupply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#229ED9] hover:bg-[#168AC4] text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 shadow-lg shadow-[#229ED9]/20"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  Telegram
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#1FB75A] text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <span aria-hidden="true" className="text-base leading-none">◔</span>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Support message form */}
            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="bg-white p-8 sm:p-10 rounded-2xl border border-[#EDE6DB] shadow-sm space-y-6 text-left">
                <h3 className="font-serif text-xl font-bold mb-4">Напишите нам</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-wider text-[#A69C91]">Имя *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Александра"
                      className="w-full px-4 py-2.5 text-xs bg-[#F7F4EF]/50 border border-[#EDE6DB] rounded-lg focus:outline-none focus:border-[#C8A96D]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-wider text-[#A69C91]">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexandra@example.com"
                      className="w-full px-4 py-2.5 text-xs bg-[#F7F4EF]/50 border border-[#EDE6DB] rounded-lg focus:outline-none focus:border-[#C8A96D]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-wider text-[#A69C91]">Ваш запрос / Сообщение</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Какие средства Image Skincare порекомендуете при куперозе?"
                    className="w-full px-4 py-2.5 text-xs bg-[#F7F4EF]/50 border border-[#EDE6DB] rounded-lg focus:outline-none focus:border-[#C8A96D]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1F1F1F] text-[#F7F4EF] hover:bg-[#C8A96D] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shadow-lg shadow-black/10 focus-visible-ring"
                >
                  Отправить Сообщение
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="relative py-24 md:py-32 bg-[#1F1F1F] text-[#F7F4EF] text-center overflow-hidden">
        {/* Glowing visual assets */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#C8A96D] to-[#E8D5CE] blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div><span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest block">Your Premium Beauty Destination</span><p className="text-[10px] text-[#A69C91] mt-1">Ваше место для премиальной красоты</p></div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
            Делаем для вас недоступное <br />
            <span className="font-semibold italic text-[#C8A96D]">— доступным!</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#C8A96D] mx-auto my-4"></div>
          <p className="text-sm sm:text-base text-[#A69C91] max-w-xl mx-auto leading-relaxed">
            Откройте мир профессионального американского ухода за кожей и непревзойденного макияжа с гарантией подлинности с 2011 года.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#catalog"
              className="px-8 py-4 bg-[#C8A96D] hover:bg-[#DCC8A3] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105"
            >
              Смотреть каталог
            </a>
            <a
              href="https://t.me/beautysupply"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1F1F1F] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105"
            >
              Заказать в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-[#1F1F1F] text-[#A69C91] pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left pb-16">
            
            {/* Column 1: Identity */}
            <div className="space-y-4">
              <a href="#top" className="font-serif text-2xl font-bold tracking-wider text-white">BEAUTY SUPPLY</a>
              <p className="text-xs leading-relaxed text-[#A69C91]/80 mt-2">
                Премиальный онлайн-магазин оригинальной уходовой и декоративной косметики из США. Основан в ноябре 2011 года на базе официального Avito-профиля.
              </p>
              
              {/* Social icons */}
              <div className="flex gap-4 pt-2">
                <a href="https://t.me/beautysupply" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#229ED9] hover:text-white flex items-center justify-center text-white transition-colors" aria-label="Telegram">
                  TG
                </a>
                <a href="https://vk.com/beautysupply" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C8A96D] hover:text-[#1F1F1F] flex items-center justify-center text-white transition-colors" aria-label="VK">
                  VK
                </a>
                <a href="https://instagram.com/beautysupply" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C8A96D] hover:text-[#1F1F1F] flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                  IG
                </a>
                <a href="https://www.avito.ru/user/7d5cc17e554a6f4d901ec51bdd907f7b/profile" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#C8A96D] hover:text-[#1F1F1F] flex items-center justify-center text-white transition-colors" aria-label="Avito">
                  Av
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-4">
              <h4 className="font-serif text-white font-semibold text-lg">Навигация</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#catalog" className="hover:text-white transition-colors">Каталог продукции</a></li>
                <li><a href="#brands" className="hover:text-white transition-colors">Наши бренды</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы клиентов</a></li>
                <li><a href="#guide" className="hover:text-white transition-colors">Бьюти-гид</a></li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div className="space-y-4">
              <h4 className="font-serif text-white font-semibold text-lg">Помощь & FAQ</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#delivery" className="hover:text-white transition-colors">Доставка и оплата</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Служба поддержки</a></li>
                <li><p className="text-[#A69C91]/70">Гарантия подлинности</p></li>
                <li><p className="text-[#A69C91]/70">Возврат по закону РФ</p></li>
                <li><p className="text-[#A69C91]/70">Предзаказы из США</p></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <h4 className="font-serif text-white font-semibold text-lg">Бьюти-Клуб</h4>
              <p className="text-xs text-[#A69C91]/80">Подпишитесь на рассылку новостей о еженедельных выкупах в США со скидками.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">Email для подписки</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Ваш email..."
                  autoComplete="email"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#C8A96D]"
                />
                <button
                  type="submit"
                  aria-label="Подписаться на новости"
                  className="px-4 py-2 bg-[#C8A96D] hover:bg-[#DCC8A3] text-[#1F1F1F] font-bold text-xs rounded-lg uppercase tracking-wider focus-visible-ring"
                >
                  →
                </button>
              </form>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 text-center text-[10px] text-[#A69C91]/40 space-y-2">
            <p>© 2011–2026 BEAUTY SUPPLY. Все права защищены.</p>
            <p>Домен привязан к beautysupply.shop. Сайт-лендинг адаптирован под все устройства и упакован в единый высокоскоростной файл.</p>
          </div>
        </div>
      </footer>


      {/* INTERACTIVE PRODUCT DETAIL MODAL (PDP) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="relative w-full max-w-4xl bg-[#F7F4EF] rounded-3xl overflow-hidden shadow-2xl border border-[#EDE6DB] grid md:grid-cols-12 max-h-[90vh] overflow-y-auto"
          >
            
            {/* Close button */}
            <button
              ref={productCloseRef}
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Закрыть карточку товара"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 border border-[#EDE6DB] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white flex items-center justify-center text-sm font-bold transition-all duration-300 focus-visible-ring"
            >
              ✕
            </button>

            {/* Left side: Luxurious aesthetic photo frame */}
            <div className={`md:col-span-5 bg-gradient-to-br ${selectedProduct.gradient} p-8 flex flex-col justify-between items-center relative min-h-[300px]`}>
              <div className="w-full flex justify-between">
                <span className="px-3 py-1 bg-white/90 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1F1F1F]">
                  Импорт из США
                </span>
                <span className="text-3xl">{selectedProduct.emoji}</span>
              </div>

              <div className="w-52 h-64 overflow-hidden bg-white/50 rounded-2xl shadow-xl border border-white/40">
                <ProductVisual product={selectedProduct} large />
              </div>

              <div className="w-full text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/50">100% гарантия оригинальности</p>
                <p className="text-[8px] text-black/40 mt-1">Батч-код проверен</p>
              </div>
            </div>

            {/* Right side: Deep e-commerce information */}
            <div className="md:col-span-7 p-8 sm:p-10 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[#C8A96D] text-xs font-bold uppercase tracking-widest">{selectedProduct.brand}</span>
                <h2 id="product-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1F1F] leading-tight">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-xl sm:text-2xl font-bold text-[#1F1F1F]">{formatPrice(selectedProduct.price)} ₽</span>
                  {selectedProduct.isAvailable ? (
                    <span className="text-xs px-2.5 py-0.5 bg-[#EDE6DB] text-[#4A4541] font-semibold uppercase tracking-wider rounded-full">В наличии в Москве</span>
                  ) : (
                    <span className="text-xs px-2.5 py-0.5 bg-[#E8D5CE] text-[#7A3B2E] font-semibold uppercase tracking-wider rounded-full">Под заказ из США</span>
                  )}
                </div>
              </div>

              {/* Concern mapping */}
              <div className="bg-white/80 p-3.5 rounded-xl border border-[#EDE6DB] text-xs">
                <span className="font-bold text-[#A69C91] uppercase tracking-wider block text-[9px] mb-1">Показание / Проблема кожи:</span>
                <span className="font-medium text-[#1F1F1F]">{selectedProduct.concern}</span>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-[#1F1F1F] border-b border-[#EDE6DB] pb-1">Описание продукта</h4>
                <p className="text-xs sm:text-sm text-[#4A4541] leading-relaxed">{selectedProduct.details}</p>
              </div>

              {/* Active ingredients */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-[#1F1F1F] border-b border-[#EDE6DB] pb-1">Активные компоненты (INCI)</h4>
                <p className="text-xs text-[#A69C91] leading-relaxed italic">{selectedProduct.ingredients}</p>
              </div>

              {/* Step by step usage */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-[#1F1F1F] border-b border-[#EDE6DB] pb-1">Способ применения</h4>
                <p className="text-xs sm:text-sm text-[#4A4541] leading-relaxed">{selectedProduct.usage}</p>
              </div>

              {/* CTA Orders block */}
              <div className="pt-4 border-t border-[#EDE6DB] space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A69C91]">Оформить заказ или проконсультироваться:</p>
                <div className="grid gap-3">
                  <a
                    href={getTelegramLink(selectedProduct.name, selectedProduct.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3.5 bg-[#229ED9] hover:bg-[#168AC4] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#229ED9]/20 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    Купить в Telegram
                  </a>
                  <a
                    href={getWhatsAppLink(selectedProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-3.5 bg-[#25D366] hover:bg-[#1FB75A] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-colors"
                  >
                    <span aria-hidden="true" className="text-base leading-none">◔</span>
                    Купить в WhatsApp
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* INTERACTIVE ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedArticle(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="relative w-full max-w-2xl bg-[#F7F4EF] rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl border border-[#EDE6DB] max-h-[90vh] overflow-y-auto text-left space-y-6"
          >
            
            {/* Close button */}
            <button
              ref={articleCloseRef}
              type="button"
              onClick={() => setSelectedArticle(null)}
              aria-label="Закрыть статью"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 border border-[#EDE6DB] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white flex items-center justify-center text-sm font-bold transition-all duration-300 focus-visible-ring"
            >
              ✕
            </button>

            {/* Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 bg-[#EDE6DB] text-[#4A4541] text-[9px] font-bold uppercase tracking-widest rounded-full">
                {selectedArticle.category} · {selectedArticle.readTime} чтения
              </span>
              <h2 id="article-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#1F1F1F] pt-2">{selectedArticle.title}</h2>
              <div className="w-16 h-0.5 bg-[#C8A96D] mt-3"></div>
            </div>

            {/* Full text */}
            <div className="text-xs sm:text-sm text-[#4A4541] leading-relaxed whitespace-pre-line space-y-4">
              {selectedArticle.content}
            </div>

            {/* Recommended Products anchor CTA */}
            <div className="pt-6 border-t border-[#EDE6DB] bg-white/40 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-[#1F1F1F]">Хотите протестировать эти активы?</p>
                <p className="text-[10px] text-[#A69C91] mt-1">Оригинальные средства с ретинолом, витамином C и SPF уже на складе в Москве.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedArticle(null);
                  setSelectedCategory('all');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-[#1F1F1F] hover:bg-[#C8A96D] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors focus-visible-ring"
              >
                В каталог
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
