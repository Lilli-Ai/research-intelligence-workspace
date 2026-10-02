# Research Intelligence Workspace — Trace Intelligence

**From information overload to decision-ready intelligence.** A portfolio-ready, interactive research workspace showing how public information can become a traceable brief rather than another opaque summary.

**[Live website](https://lilia-ai.manus.space/)** · **[Explore the research demo](https://lilia-ai.manus.space/workspace)**

This repository is a source snapshot of the Manus-hosted portfolio site. It is **not connected to automatic deployment**: changes here do not update the live website without a separate synchronization and publish step.

> **Many Sources → Clean Information → Evidence-backed Insights → Actionable Brief**

**Portfolio case owner:** [Lilia Avagyan](https://www.linkedin.com/in/lil-ai-travel) — AI Automation & Agentic Workflows; 10+ years in IT, telecom and business operations. Lilia defined the portfolio goal and research workflow requirements. The interactive frontend and illustrative scenario were implemented with AI-assisted development; one 2026 report example is source-checked. Her separate public [GitHub MCP server](https://github.com/Lilli-Ai/github-mcp-server) and [LangGraph agent](https://github.com/Lilli-Ai/langgraph-business-card-agent) demonstrate related hands-on work; neither repository is presented as the backend of this website. No personal phone, address or private CV is published here.

**Author-first entry:** `/` introduces Lilia's background and four selected works, in this order: GitHub MCP Server, Business Card Agent, Private AI English Tutor, TravelTech AI Insights. Each card has a focused summary, verified technology tags, and a public GitHub link. The tutor link leads to an architecture write-up rather than source code; the TravelTech repo includes its dashboard code but not an n8n workflow export. Research Intelligence Workspace is a separate featured prototype at `/workspace`, not a feature shared with those unrelated projects.

**Status:** interactive portfolio prototype. This is an adaptable research *approach*, not a multi-tenant SaaS product or live customer deployment. AI adoption, value and governance form this example topic; other topics are potential adaptations, not shipped workspaces.

## Who it is for

A reusable research workflow for founders, consultants, analysts, marketers, recruiters, educators, journalists and small teams. The demo persona is a strategy analyst preparing a weekly **AI governance radar** for a decision maker.

## What the demo shows

| Route | Purpose |
| --- | --- |
| `/` | Author homepage: Lilia's experience, four selected public projects, technology tags, and the featured research prototype |
| `/workspace` | Research demo: a three-step visitor path plus inspectable sample counts, key signals and brief preview |
| `/sources` | Step 01: inspect six sample source records; McKinsey's 2026 title, date and two passages are source-checked |
| `/evidence` | Step 02: inspect seven claims, eight excerpts (two checked, six synthetic), zero false conflict flags and source links |
| `/brief` | Step 03: read the sample brief and trace the 2026 comparison back to its report passages |
| `/pipeline` | Behind the build: proposed stages and sample sequence, explicitly not a live event log |
| `/about` | Lilia's role, related public proof of practice, implementation status and planned integrations |

The short visitor path: **(1)** meet Lilia and browse her work on `/`; **(2)** enter the research demo at `/workspace`; **(3)** inspect [McKinsey's 25 Aug 2026 survey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) in Source library; **(4)** compare its 44% enterprise-scaling and 37% attributed-EBIT findings in Evidence Matrix; **(5)** read “What the numbers actually say” in the sample brief. These are different survey questions, **not contradictory estimates**. Pipeline and About the build remain optional context.

### Important demonstration boundary

This is a **static, interactive UI demo** with illustrative seeded records. A disclosure appears on every page. Counts come from the **complete inspectable sample**: 6 sources / 6 document records / 7 claims / 8 excerpts (**2 McKinsey passages checked against the original article, 6 synthetic**) / 0 conflict flags / 1 illustrative duplicate tag. The source-checked report is “The state of AI in 2026: On the road to ROI,” published **25 Aug 2026**. Its 44% scaling finding and 37% EBIT-impact finding answer different questions; neither establishes causal ROI for a particular organization. The other sample article titles, dates and quotations have **not** been independently verified against their reference links. There is no hidden live snapshot, fabricated run timing or active collection schedule. Confidence is a UI representation of evidence sufficiency, **not a probability that a claim is true**. Do not use the sample brief as a real executive report.

Search and filters operate deterministically on local seed data, **not** on Qdrant or live RAG. The PDF export control opens a demo preview message; no PDF is generated. The Telegram digest is labelled **not connected**; the UI does not send any message. The pipeline is a visualization of orchestration, not a live ingestion run. No authentication, document upload, source fetching, OCR or live model invocation is implemented.

## Implementation

Current implementation is a static-first React/TypeScript app in a Webdev starter. It reuses Wouter, Lucide, Tailwind and the starter Vite build. No Server or Database capability is enabled.

```text
client/src/data/researchDemo.ts        Typed seeded project, source, evidence, claim, brief, run
client/src/data/portfolioProjects.ts   Four author project cards, links, and technology tags
client/src/lib/research.ts             Provenance lookup and deterministic selectors
client/src/lib/formatters.ts           Source, freshness, percentage formatting
client/src/components/app-shell/       Navigation, project context, global demo search
client/src/components/research/        Three-step visitor path and per-page orientation
client/src/components/shared/          Confidence meter, source fingerprint, drawers
client/src/pages/                      Portfolio home; separate Overview, Sources, Evidence Matrix, Brief, Pipeline, About
client/public/manus-routes.json        Browser page route manifest
client/public/trace-mark.svg           Trace Intelligence mark
app.config.ts                         Durable logo URL for platform project branding
```

Local commands: `pnpm dev:static`, `pnpm check`, `pnpm test`, `pnpm build:static`.

## Production architecture — next phase, not implemented here

```text
RSS / public URL / uploaded PDF / newsletter
         ↓
Scheduled n8n collectors and webhooks
         ↓
FastAPI ingestion adapters → text cleaning / metadata → canonical hash + near-duplicate clustering
         ↓
Strict JSON extraction: topics, claims, supporting/challenging evidence, confidence rationale
         ↓
PostgreSQL: projects, sources, documents, claims, evidence, briefs, pipeline_runs
         ↘
           Qdrant: embeddings, retrieval, semantic discovery and candidate duplicate detection
         ↓
Human review of conflicts and uncertain/high-impact claims
         ↓
Cited brief → PDF export; Telegram/email digest from n8n
```

**Minimal production slice:** ingest one RSS feed, one public URL and one PDF; store raw/canonical document, deduplicate exact/near duplicates, extract strict-JSON claims with quote locators, link evidence, review one conflicting claim, retrieve relevant documents, render a cited brief. Only then add scheduling, Telegram digest and multiple workspaces. Keep n8n for orchestration and notifications, not as the primary UI.

### Suggested relational model

- `projects(id, name, description, cadence, owner_id)`
- `sources(id, project_id, type, url, publisher, health, last_checked_at)`
- `documents(id, source_id, canonical_url, content_hash, published_at, ingested_at, duplicate_of_id, raw_object_key, clean_text, classification_json)`
- `claims(id, project_id, text, topic, confidence, rationale, conflict_state, reviewed_at)`
- `evidence(id, claim_id, document_id, locator, excerpt, support_direction, source_published_at)`
- `briefs(id, project_id, version, status, generated_at, reviewed_at, body_json)`
- `pipeline_runs(id, project_id, started_at, completed_at, stage, status, counts_json, error_json)`

Create indexes on project/time, canonical URL and content hash. Store each evidence locator and source timestamp; keep the raw object immutable, version briefs, and never overwrite review history. Qdrant point metadata should reference the durable document and project IDs in PostgreSQL rather than become the record of truth. Require project-scoped retrieval and review permissions before supporting multiple users.

### Evaluation cases

1. Syndicated story in RSS and URL: one canonical document, provenance retained for both feeds.
2. Same claim with supporting and challenging evidence: conflict surfaced; no automatic truth verdict.
3. Old primary policy source vs fresh commentary: freshness and source type visible separately from confidence.
4. Claim with missing source or locator: excluded from the final cited brief or clearly marked for review.
5. PDF with inaccessible text: explicit extraction failure, not invented evidence.
6. Retrieval returns a thematically similar but irrelevant source: reviewer can reject it without losing audit trail.

## Portfolio positioning

**Problem:** Teams see more information than they can verify and reuse. Summaries hide disagreement and provenance.

**Solution:** Trace Intelligence makes the source trail the interface: normalized inputs, evidence-linked claims, conflict checks and a decision-ready brief. The Evidence Matrix is the key differentiator; in the current sample it also demonstrates *not* labelling two different survey measures as a contradiction. Live ingestion and source-wide verification are not implemented.

**Stack rationale:** FastAPI for ingestion and structured processing, PostgreSQL as the durable source of truth, Qdrant for retrieval and semantic candidates, React dashboard as the research workspace, n8n for scheduled collection and digest delivery. Optional object storage holds raw PDFs. Production integrations are a roadmap, not features of this demo.

The implementation plan is preserved in [`docs/approved-plan.md`](docs/approved-plan.md).
