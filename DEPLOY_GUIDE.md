# Инструкция по деплою сайта и привязке домена beautysupply.shop

Поскольку наш премиальный лендинг компилируется в один автономный HTML-файл `dist/index.html`, размер которого зависит от состава сборки, его развертывание (деплой) и привязка к вашему домену на Porkbun происходят мгновенно, бесплатно и не требуют ежемесячной платы за хостинг.

Ниже представлены две лучшие и самые надежные схемы деплоя в 2026 году.

---

## Вариант 1: Деплой через Cloudflare Pages (Рекомендуемый)
Cloudflare — мировой лидер в области защиты сайтов и быстрой доставки контента (CDN). Их хостинг полностью бесплатен для статических сайтов и обеспечивает максимальную скорость загрузки в России и Москве.

### Шаг 1: Подключение к Cloudflare
1. Зарегистрируйтесь на сайте [Cloudflare](https://dash.cloudflare.com/).
2. Перейдите во вкладку **«Workers & Pages»** и нажмите **«Create application»** -> **«Pages»** -> **«Connect to Git»**.
3. Авторизуйте свой аккаунт GitHub и выберите репозиторий `BEAUTYSUPPLYMSK/beautysupply`.

### Шаг 2: Настройка сборщика (Build Settings)
Укажите следующие параметры сборки:
- **Framework preset**: `Vite` (или `None`).
- **Build command**: `npm run build` (Cloudflare сама установит Node.js и скомпилирует проект).
- **Build output directory**: `/dist` (директория, куда Vite складывает готовый файл).
- Нажмите **«Save and Deploy»**. Через 1 минуту ваш сайт будет запущен на техническом домене типа `beautysupply.pages.dev`.

### Шаг 3: Привязка домена beautysupply.shop (Porkbun)
1. В панели управления Cloudflare Pages перейдите во вкладку **«Custom domains»** и нажмите **«Set up a custom domain»**.
2. Введите ваш домен: `beautysupply.shop`.
3. Cloudflare предложит вам обновить DNS-серверы (NS) на стороне Porkbun.
4. Перейдите в ваш личный кабинет **Porkbun**, выберите домен `beautysupply.shop` и замените стандартные NS-серверы на те, которые предоставит Cloudflare (например, `ashley.ns.cloudflare.com` и `conrad.ns.cloudflare.com`).
5. Всё! Cloudflare автоматически выпустит бесплатный SSL-сертификат безопасности (замок HTTPS) и настроит быструю отдачу сайта.

---

## Вариант 2: Деплой через GitHub Pages (Бесплатный встроенный хостинг)
Вы можете запустить сайт прямо из этого репозитория GitHub за 2 минуты. В репозитории уже лежит готовый собранный файл `docs/index.html` (идентичен `dist/index.html` после `npm run build`), поэтому для запуска не требуется ни воркфлоу, ни билд-сервер.

### Шаг 1: Настройка репозитория на GitHub
1. Перейдите в настройки вашего репозитория `BEAUTYSUPPLYMSK/beautysupply` на GitHub (вкладка **«Settings»**).
2. В левом меню выберите раздел **«Pages»**.
3. В секции **«Build and deployment»**:
   - Source: выберите **«Deploy from a branch»**.
   - Branch: выберите `main` и папку **`/docs`**.
4. Нажмите **«Save»**. Через 1–2 минуты сайт будет доступен по адресу: `https://beautysupplymsk.github.io/beautysupply/`.

> **Как обновлять сайт после изменения кода**: выполните `npm run build` и скопируйте получившийся `dist/index.html` в `docs/index.html` (это две одинаковые команды: `npm run build && cp dist/index.html docs/index.html`), затем закоммитьте изменения.

### Альтернатива: автоматический деплой через GitHub Actions
Если вы хотите, чтобы сайт собирался и деплоился автоматически при каждом пуше в `main` (без ручного копирования в `docs/`), добавьте в репозиторий файл `.github/workflows/deploy.yml` с содержимым ниже и выберите в **Settings → Pages** источник **«GitHub Actions»**:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> Примечание: файлы воркфлоу должны быть добавлены в репозиторий аккаунтом, у которого есть разрешение `workflows` (владелец репозитория или токен с этим скоупом).

### Шаг 2: Настройка DNS на стороне Porkbun
Если вы используете GitHub Pages напрямую без Cloudflare, вам нужно прописать А-записи в личном кабинете Porkbun:
1. Войдите в аккаунт Porkbun, откройте настройки DNS вашего домена `beautysupply.shop`.
2. Создайте **4 записи типа A**, указывающие на IP-адреса GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Создайте **запись типа CNAME** для субдомена `www`:
   - Host: `www`
   - Answer: `beautysupplymsk.github.io.` (замените на ваш технический адрес GitHub).
4. В настройках GitHub Pages введите ваш Custom Domain: `beautysupply.shop` и поставьте галочку **«Enforce HTTPS»**.

---

## Как обновить информацию на сайте в будущем?
Поскольку весь сайт находится в файле `src/App.tsx`, для изменения цен, добавления новых отзывов или товаров вам достаточно:
1. Открыть файл `src/App.tsx`.
2. Найти массив `const products` в самом верху кода.
3. Отредактировать цены, названия или описания ингредиентов.
4. Сделать коммит изменений в Git. Хостинг (Cloudflare или GitHub) автоматически подхватит изменения, перекомпилирует проект и обновит сайт в сети за 30 секунд!
