# Инструкция по деплою сайта и привязке домена beautysupply.shop

Премиальный лендинг собирается Vite + `vite-plugin-singlefile` в **один автономный HTML-файл** (`dist/index.html`). Хостинг статики бесплатный; серверный runtime не нужен.

В репозитории поддерживаются **две надёжные схемы**:

1. **GitHub Pages** (из коробки в этом репо) — через Actions workflow **или** через папку `docs/`.
2. **Cloudflare Pages** — build from Git.

---

## Быстрый старт (локально)

```bash
npm ci
npm run typecheck
npm run build
# для ветки GitHub Pages /docs:
npm run pages:sync
```

Скрипт `pages:sync` копирует `dist/index.html` → `docs/index.html`, добавляет `docs/404.html` и `docs/.nojekyll`, а также SEO-файлы из `public/`.

---

## Вариант A: GitHub Pages из ветки `/docs` (работает сразу, без Actions)

В репозитории уже лежит production-артефакт `docs/` (single-file `index.html` + `404.html` + `.nojekyll` + SEO-файлы).

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` → folder **`/docs`**
4. Save

Сайт: `https://beautysupplymsk.github.io/beautysupply/`

Обновление артефакта после правок кода:

```bash
npm run pages:sync
git add docs
git commit -m "chore: refresh GitHub Pages artifact"
git push
```

> `base: './'` в `vite.config.ts` и single-file сборка корректно работают и на subpath `/beautysupply/`, и на custom domain.

---

## Вариант B: GitHub Pages через GitHub Actions (автосборка)

Готовый workflow-шаблон: [`deploy/github-pages.yml`](deploy/github-pages.yml).

### Установка (один раз, от аккаунта с правом `workflows`)
```bash
mkdir -p .github/workflows
cp deploy/github-pages.yml .github/workflows/deploy-pages.yml
git add .github/workflows/deploy-pages.yml
git commit -m "ci: enable GitHub Pages Actions deploy"
git push
```

### Включение Pages
1. **Settings → Pages → Source: GitHub Actions**
2. Push в `main` или **Actions → Deploy to GitHub Pages → Run workflow**

### Custom domain (для A или B)
1. **Settings → Pages → Custom domain** → `beautysupply.shop`
2. DNS A-записи GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. CNAME `www` → `beautysupplymsk.github.io.`
4. **Enforce HTTPS**

---

## Вариант C: Cloudflare Pages

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Репозиторий: `BEAUTYSUPPLYMSK/beautysupply`.
3. Build settings:
   - **Framework preset**: Vite (или None)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 22 (Environment variable `NODE_VERSION=22` при необходимости)
4. Deploy.

### Custom domain на Cloudflare
1. Pages project → **Custom domains** → `beautysupply.shop`
2. Переведите NS домена на Cloudflare **или** добавьте CNAME, который предложит Cloudflare.
3. SSL/TLS → Full (strict), Always Use HTTPS.

---

## Как обновлять контент сайта

Основной UI и каталог — `src/App.tsx`:

1. Отредактируйте массивы `products`, `reviews`, `articles`.
2. Локально: `npm run check` (typecheck + build).
3. Закоммитьте и запушьте в `main`.
4. При схеме Actions сайт обновится сам; при схеме `/docs` выполните `npm run pages:sync` и закоммитьте `docs/`.

---

## Проверки перед релизом

```bash
npm ci
npm run typecheck   # must pass
npm run build       # must produce dist/index.html
npm run pages:sync  # optional, for /docs strategy
npx vite preview --host 127.0.0.1 --port 4173
```

Откройте `http://127.0.0.1:4173/` и проверьте: каталог, модалки, форму контакта, Telegram CTA, мобильное меню.

---

## Примечания по архитектуре деплоя

| Файл / папка | Назначение |
|---|---|
| `vite.config.ts` `base: './'` | Относительные пути, subpath-safe |
| `vite-plugin-singlefile` | Один HTML без внешних JS/CSS чанков |
| `public/` | `robots.txt`, `sitemap.xml`, `og-cover.svg` → в `dist/` |
| `docs/` | Закоммиченный fallback-артефакт для branch deploy |
| `deploy/github-pages.yml` | Шаблон Actions workflow (скопировать в `.github/workflows/`) |
| `scripts/sync-pages.mjs` | Синхронизация `dist` → `docs` |

Серверных API, env-секретов и backend-зависимостей в проекте нет — это чистый static site.
