# План: Research Intelligence Workspace

## 1. Цель и границы

Создать отдельный, portfolio-ready Webdev-проект **Research Intelligence Workspace — From Information Overload to Decision-Ready Intelligence**. Это не customer-support inbox, не lead qualification, не Travel Concierge и не AI Data Protection Gateway. Продуктовая демонстрация должна показывать, как поток публичных источников превращается в структурированный, evidence-backed и actionable research brief.

Главный сценарий финальной презентации:

> **Many Sources → Clean Information → Evidence-backed Insights → Actionable Brief**

В первой реализации приоритет — убедительный интерактивный dashboard, который можно пройти за 2–3 минуты. Реальные внешние RSS/PDF/LLM/Qdrant подключения не включать в UI без необходимости и не притворяться автоматической проверкой истины: интерфейс явно показывает claims, источники, evidence, confidence, freshness и conflicts.

### Обязательный MVP-scope

- Главный workspace с выбранным research project, сводкой по источникам и свежими материалами.
- Seeded demo-данные для публичных источников: RSS/newsletter/URL/PDF, с типом, датой, source health и статусом обработки.
- Очистка и дедупликация как видимый pipeline: raw items → normalized → deduplicated → classified → evidence mapped.
- Классификация материалов по теме/типу/релевантности.
- Claims и evidence с provenance: claim, supporting source/evidence, confidence, freshness, conflict flag.
- Ключевая WOW-функция: **Evidence Matrix** с колонками `Claim / Source / Evidence / Confidence / Conflict`.
- Research brief с executive summary, key signals, open questions, conflicting claims и actionable next steps.
- Поиск по workspace/RAG-like semantic search surface с фильтрами по project, topic, source type, freshness и confidence. В demo это локальный поиск по seeded dataset, подготовленный так, чтобы позже заменить его на Qdrant/API без переделки интерфейса.
- Source drawer/detail view с цитатой, metadata, обработанным статусом и ссылкой на первоисточник.
- Pipeline activity/monitoring surface с последним запуском, processed count, duplicate rate, unresolved conflicts и notification status.
- Export/share affordance для brief (в MVP — кнопка/preview состояния export, без обещания настоящего PDF при отсутствии backend).
- Telegram digest как отдельный будущий integration seam; в demo показать notification preference/status, но не симулировать отправку в Telegram.

### Явно вне scope первой реализации

- Реальный ingestion из RSS, URL, newsletter или PDF.
- Реальная загрузка файлов, OCR, Firecrawl, feedparser, pypdf/unstructured, PostgreSQL, Qdrant и фоновые n8n jobs.
- Автоматическое утверждение истины или замена исследовательского review.
- Авторизация, multi-tenant permissions, billing и публичная публикация пользовательских материалов.
- Полноценный редактор briefs, настоящая генерация PDF и боевые Telegram/email notifications.

Эти направления должны быть отражены только как понятные extension points и portfolio positioning, не как незавершённые обещания.

## 2. Продуктовая модель и пользовательский flow

### Целевые пользователи

Универсальный B2B research workspace для предпринимателей, консультантов, маркетологов, рекрутеров, аналитиков, преподавателей, журналистов и small business teams. Для финального demo выбрать одну конкретную narrative persona: **консультант/аналитик, который отслеживает AI governance и market signals для еженедельного decision brief**. Это делает demo конкретным, но не сужает универсальное позиционирование.

### Основные экраны/состояния

1. **Workspace overview `/`** — overview активного проекта, KPI, processing pulse, последние источники, top signals и CTA `Open intelligence brief`.
2. **Evidence Matrix `/evidence`** — главный WOW-экран с фильтрами, conflict-first sorting, confidence badges, source freshness и раскрытием evidence.
3. **Research Brief `/brief`** — decision-ready документ с summary, signals, conflicts, evidence references и next actions.
4. **Sources `/sources`** — реестр источников и материалов: source type, freshness, last processed, duplicate status, confidence/health.
5. **Pipeline `/pipeline`** — визуальный flow обработки и activity log: collected, cleaned, deduplicated, classified, mapped, brief-ready.

Навигация должна поддерживать прямые URL и сохранять выбранный research project в UI state. В demo один активный проект `AI governance radar`, но селектор проектов и badge `1 active project` показывают расширяемую модель.

## 3. Архитектура и проектная структура

Стартовый проект уже инициализирован как React / Express / tRPC / Drizzle starter, но runtime выбран static (`server:false`, `database:false`). Для этой финальной презентации сохранить простой static-first режим и сделать прикладную модель на типизированных локальных данных. Не добавлять базы и внешние credentials только ради визуального demo.

Предлагаемая структура:

```text
client/src/
  App.tsx                         # route map и app shell
  main.tsx                        # существующий entrypoint
  index.css                       # design tokens, base styles, motion
  data/
    researchDemo.ts               # typed projects, sources, claims, evidence, brief, activity
  lib/
    research.ts                   # derived selectors: KPI, filters, freshness, conflict grouping
    formatters.ts                  # dates, percentages, source labels
  components/
    app-shell/                    # sidebar, topbar, project switcher, responsive nav
    research/                     # KPI cards, pipeline pulse, source row, brief sections
    evidence/                     # EvidenceMatrix, filters, claim row, evidence drawer
    shared/                       # status badges, confidence meter, empty/loading states
  pages/
    WorkspaceOverview.tsx
    EvidenceMatrixPage.tsx
    ResearchBriefPage.tsx
    SourcesPage.tsx
    PipelinePage.tsx
    NotFound.tsx
public/
  manus-routes.json               # полный route manifest
app.config.ts                     # literal logoUrl metadata
```

Если starter already содержит `client/src/pages/Home.tsx`, заменить его содержимое/маршрут на `WorkspaceOverview`, сохранив существующие reusable shadcn/ui компоненты и conventions. Не писать всё в один файл.

Будущие seams (без реализации в первой версии):

- `ingestion adapters` для RSS/URL/PDF/newsletter.
- `processing pipeline` с strict JSON extraction и deduplication.
- persistence tables для `projects`, `sources`, `documents`, `claims`, `evidence`, `briefs`, `pipeline_runs`.
- retrieval adapter для Qdrant embeddings/dedup/semantic search.
- n8n scheduler/webhook/Telegram notification adapter.

## 4. Design direction

### Design movement

**Editorial Intelligence Console** — сочетание newsroom research desk, restrained Swiss editorial grid и high-trust analytical dashboard. Интерфейс должен выглядеть как рабочий инструмент аналитика, а не как generic SaaS landing page.

### Core principles

1. **Evidence before polish** — provenance, citation и conflict state всегда визуально заметнее декоративных метрик.
2. **Editorial hierarchy** — крупные narrative blocks, уверенная типографика и намеренный white space вместо равномерной плитки.
3. **Signal over noise** — muted metadata, ограниченная цветовая семантика, сильный акцент только на confidence/conflict/action.
4. **Calm control room** — плотный, но читаемый мониторинг без тревожного neon-dashboard эффекта.

### Color philosophy

Тёплый paper/ivory фон создаёт ощущение research desk и читабельность длинного brief. Глубокий ink/navy используется для структуры и trust. Собственный акцент — **signal teal `#0E8C86`**: цвет проверяемого сигнала и evidence link. Amber `#C88A2A` означает свежесть/внимание, coral `#D95C4F` — только unresolved conflict или риск. Никаких градиентных hero-фонов и декоративного rainbow.

### Layout paradigm

Не центрированный marketing grid, а **рабочая поверхность с постоянной левой rail-навигацией + editorial content canvas**. Overview строится вокруг крупного research brief column и более узкой signal rail; Evidence Matrix получает горизонтальное пространство и sticky header. На узком экране rail превращается в compact top nav, таблица переходит в stacked claim cards с сохранением всех колонок в читаемой последовательности.

### Signature elements

- тонкая **evidence thread** — вертикальная teal-линия, связывающая claim с source/evidence в detail drawer;
- **confidence meter** в виде segmented bar, а не кругового gauge;
- маленький **source fingerprint** (favicon-like monogram + source type + freshness dot), повторяющийся в matrix, source list и brief citations.

### Interaction philosophy

Каждое интерактивное действие должно отвечать на вопрос аналитика: `что утверждается?`, `на чём это основано?`, `насколько свежо?`, `где конфликт?`, `что делать дальше?`. Клик по claim раскрывает evidence drawer; клик по conflict фильтрует matrix; source references ведут к source detail. Фильтры не скрывают provenance и имеют clear state. Никаких fake destructive actions.

### Animation

Сдержанные 150–220ms transitions: rail selection, drawer slide, filter chips, row hover и pipeline progress. При первом открытии overview KPI count-up и лёгкий stagger для signal rows; motion отключается через `prefers-reduced-motion`. Не использовать постоянный pulsing, bouncing cards или прячущиеся элементы.

### Typography system

- Display/editorial: `Newsreader` или близкий serif fallback для brief title и editorial pull quote.
- UI/body: `DM Sans` или system sans fallback для плотных таблиц и controls.
- Mono: `IBM Plex Mono`/system monospace только для timestamps, IDs и pipeline statuses.
- Hierarchy: page title 36–44px, section title 18–22px, body 14–15px, metadata 11–12px uppercase/letter-spaced. На мобильном не уменьшать body ниже 13px.

### Brand essence

**Evidence-backed research workspace for people who need to turn public information into a defensible decision.**

Personality: **собранный, проницательный, проверяемый**.

### Brand voice

Headlines звучат как наблюдения и decisions, CTA — как следующий исследовательский шаг, microcopy — конкретно и без buzzwords.

- Headline: `The signal is not the story. The evidence is.`
- CTA: `Open the decision brief` / `Inspect conflicting claims`

### Wordmark & logo

Сделать mark из двух offset brackets/скобок, которые замыкаются вокруг маленькой точки-source: визуальный образ claim, окружённого evidence. Wordmark `TRACE / INTELLIGENCE` — с компактным slash и mono label. Не использовать имя в дефолтном системном bold как единственный логотип.

### Signature brand color

`#0E8C86` — Signal Teal. Использовать для active navigation, evidence links, verified provenance, progress accents и logo mark.

## 5. Реализация по фазам

### Phase 1 — app shell и design system

- Заменить starter Home на Research Intelligence shell.
- Добавить CSS tokens, типографику, responsive breakpoints, semantic badges и consistent iconography через lucide-react.
- Создать sidebar/topbar с active project, last sync, `Open brief` и понятным route navigation.
- Добавить `public/manus-routes.json` со всеми пятью page routes и проверить, что отдаётся как JSON до dev-server fallback.
- Добавить `app.config.ts` с quoted durable HTTPS `logoUrl` после выбора/создания logo asset; если отдельный asset не нужен, использовать подходящий durable project asset URL.

### Phase 2 — seeded intelligence model

- Создать типы для `ResearchProject`, `Source`, `Document`, `Claim`, `EvidenceLink`, `BriefSection`, `PipelineRun`.
- Засеять разнообразные, реалистичные, но clearly demo-labelled materials: MIT Technology Review, NIST, McKinsey, EU policy page, industry newsletter и PDF report.
- Связать claims с одним или несколькими evidence items, включая один visible conflict: например, different adoption estimates from two sources with different publication dates.
- Вычислять KPI и derived states из data selectors, а не хардкодить одинаковые числа в компонентах.

### Phase 3 — overview / pipeline / source views

- Overview: `42 sources tracked`, `128 documents`, `18 decision signals`, `3 conflicts to review`, `91% evidence coverage`, freshness strip.
- Обязательная визуальная связка pipeline: `Collect → Clean → Deduplicate → Classify → Map evidence → Brief` с run timestamp и status.
- Sources view: search, tabs by type, freshness filters, duplicate indicator, source detail drawer.
- Pipeline view: run summary, stage durations/status, activity feed и clear explanation, что этот demo показывает orchestration surface, а production запускается scheduled n8n/FastAPI pipeline.

### Phase 4 — Evidence Matrix и Brief

- Evidence Matrix — центральная screen-level feature: sticky table header, filter bar (`All`, `Conflicts`, `High confidence`, `Fresh < 30d`), confidence segmented meter, conflict badge и expandable evidence rows.
- Claim detail drawer: claim text, source fingerprints, quoted evidence excerpts, publication dates, confidence rationale, conflict note, `Open source` external-link affordance.
- Research Brief: editorial title/date, executive summary, key signals, `What changed`, `Where evidence conflicts`, `Suggested next moves`, inline citation markers и source appendix.
- Добавить gentle export button с explicit copy `Export brief (PDF)` / `Demo preview`, чтобы не заявлять несуществующий backend.

### Phase 5 — polish и presentation path

- Responsive states: desktop 1440/1280, tablet 768, mobile 375.
- Empty/loading/error states для ключевых panels, хотя demo data всегда доступен.
- Проверить no mixed-project copy: нигде не упоминать Travel Concierge, customer support, lead qualification или AI Data Protection Gateway.
- Обновить README с portfolio case: problem, flow, demo scope, production architecture next step.
- Подготовить presentation story: 1) overload/source stream, 2) clean pipeline, 3) Evidence Matrix conflict, 4) decision brief, 5) production roadmap.

## 6. Технические ограничения и решения

- Не включать `server`/`database` в первой визуальной итерации; starter уже инициализирован static-first. Если позже понадобится настоящая ingestion demo, сначала отдельно согласовать resource change и соответствующие capability guides.
- Использовать существующие зависимости (`wouter`, `lucide-react`, `framer-motion`, Radix/Tailwind primitives), не тянуть тяжёлую data-grid библиотеку без необходимости.
- Все внешние source links — только безопасные публичные URLs из seeded data, без ключей и приватных данных.
- Search/filter/sort — deterministic local selectors; названия `semantic search` и `RAG` сопровождать demo label, чтобы не выдавать локальный filter за Qdrant.
- Строгие типы TypeScript; отделить data/derived selectors от визуальных компонентов.

## 7. Проверка перед delivery

Проверка должна включать TypeScript diagnostics на зарегистрированных языках, `pnpm check`, `pnpm test` и production/static build. Визуально пройти основные routes на desktop и mobile через Preview screenshots только для конкретной проверки responsive layout и matrix/brief readability. Отдельно проверить HTTP 200 и корректный JSON `manus-routes.json`, отсутствие SPA HTML на этом endpoint, отсутствие внутренних абсолютных URLs в browser-facing links и отсутствие смешанной терминологии с другими проектами.

Для сложного review использовать одного read-only validation agent после реализации: он сверяет actual source tree, route map, required scope, design tokens и traceability claim → source → evidence → brief. Подтверждённые дефекты исправить адресно и повторно проверить затронутые paths.

## 8. Критерий готовности portfolio demo

Демо считается готовым, когда за короткий click-through можно показать: источник/материал, видимый pipeline, deduplicated/classified state, конкретный claim с evidence и confidence, один честно отмеченный conflict, затем brief с citations и actionable next step. Интерфейс должен сам объяснять, что это **evidence-backed research workspace**, а не обычный summarizer и не автоматический truth engine.

## 9. Допущения и риски

- Сейчас нет существующей прикладной логики в starter и нет включённых server/database resources; поэтому первая версия сознательно является polished interactive demo, а не live ingestion backend.
- Real RSS/PDF/n8n/Qdrant production wiring остаётся следующей фазой и будет описана в README как implementation roadmap, не скрытая в UI.
- Если на этапе реализации starter требует platform-specific runtime detail, сохранять static-first решение и не менять проектный scope без отдельного user decision.
