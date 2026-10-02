import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowRight, ArrowUpRight, FileText, Link2, Mail, Rss, Search, X } from "lucide-react";
import { dashboardMetrics, sources, type Source, type SourceType, type Freshness } from "@/data/researchDemo";
import { filterSources, freshnessTone, sourceTypeCount } from "@/lib/research";
import { sourceTypeLabel } from "@/lib/formatters";
import { SectionLabel, SourceDrawer, SourceFingerprint, StatusPill } from "@/components/shared/ResearchPrimitives";
import { GuidedPath } from "@/components/research/GuidedPath";

const types: (SourceType | "All types")[] = ["All types", "RSS", "URL", "PDF", "Newsletter"];
const typeIcons: Record<SourceType, typeof Rss> = { RSS: Rss, URL: Link2, PDF: FileText, Newsletter: Mail };

export default function SourcesPage() {
  const openSourceId = new URLSearchParams(useSearch()).get("open");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SourceType | "All types">("All types");
  const [freshness, setFreshness] = useState<Freshness | "All freshness">("All freshness");
  const [selectedSource, setSelectedSource] = useState<Source>();
  const results = useMemo(() => filterSources(sources, query, type, freshness), [query, type, freshness]);
  const hasFilters = !!query || type !== "All types" || freshness !== "All freshness";
  const resetFilters = () => { setQuery(""); setType("All types"); setFreshness("All freshness"); };

  useEffect(() => { if (openSourceId) setSelectedSource(sources.find(source => source.id === openSourceId)); }, [openSourceId]);

  return (
    <>
      <div className="page-eyebrow"><span className="eyebrow-rule" /> WORKSPACE / INPUTS <span className="eyebrow-muted">/ SOURCE LIBRARY</span></div>
      <GuidedPath current={1} onExample={() => setSelectedSource(sources.find(source => source.id === "src-mck"))} />
      <section className="page-title-section">
        <div><span className="page-title-index">01 / FOLLOW THE SOURCE</span><h1>Source <em>library.</em></h1><p>Start with McKinsey's 25 Aug 2026 report. Its two cited findings were checked against the article; other materials here remain illustrative.</p></div>
        <div className="source-title-detail"><span>{dashboardMetrics.sourcesTracked}</span><small>sample sources<br />you can open</small></div>
      </section>
      <div className="source-type-summary">
        {(["RSS", "URL", "PDF", "Newsletter"] as SourceType[]).map(item => {
          const Icon = typeIcons[item];
          return (
            <button key={item} className={`source-type-summary-item ${type === item ? "is-active" : ""}`} onClick={() => setType(type === item ? "All types" : item)} aria-pressed={type === item} aria-label={`Filter by ${sourceTypeLabel(item)}: ${sourceTypeCount(item)} sample records`}>
              <span><Icon size={18} aria-hidden="true" /></span><strong>{sourceTypeCount(item).toString().padStart(2, "0")}</strong><small>{sourceTypeLabel(item)}</small><ArrowUpRight size={14} aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <section className="source-register">
        <div className="source-register-head"><div><SectionLabel meta={`${results.length} OF ${sources.length} VISIBLE`}>SOURCE REGISTER</SectionLabel><h2>Provenance, at a glance.</h2></div><span className="sample-note">All sample sources are listed here</span></div>
        <div className="source-toolbar">
          <div className="matrix-filter-buttons">{types.map(item => <button key={item} className={`filter-chip ${type === item ? "is-active" : ""}`} aria-pressed={type === item} onClick={() => setType(item)}>{item}</button>)}</div>
          <div className="matrix-filter-tools">
            <label className="inline-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search sources…" aria-label="Search sources" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</label>
            <label className="select-wrap"><select value={freshness} onChange={event => setFreshness(event.target.value as Freshness | "All freshness")} aria-label="Filter by freshness"><option>All freshness</option><option>Fresh</option><option>Watch</option><option>Stale</option></select></label>
            {hasFilters && <button className="clear-filters" onClick={resetFilters}>Clear filters</button>}
          </div>
        </div>
        <div className="source-table-wrap">
          <div className="source-table-header"><span>SOURCE / MATERIAL</span><span>TYPE</span><span>FRESHNESS</span><span>IN DEMO</span><span>STATUS</span></div>
          {results.map(source => (
            <button className="source-register-row" key={source.id} onClick={() => setSelectedSource(source)} aria-label={`Open sample source: ${source.name} by ${source.publisher}`}>
              <span className="source-register-identity"><SourceFingerprint source={source} compact /><small>{source.name}</small></span>
              <span><span className="source-type-tag">{source.type}</span></span>
              <span><span className={`freshness-text text-${freshnessTone(source.freshness)}`}><i className={`freshness-dot freshness-${freshnessTone(source.freshness)}`} /> {source.freshness}</span></span>
              <span className="source-processed">{source.lastProcessed}</span>
              <span className="source-register-status"><StatusPill label={source.status} tone={source.status === "Processed" ? "teal" : source.status === "Review" ? "amber" : "coral"} /><ArrowUpRight size={16} /></span>
            </button>
          ))}
          {results.length === 0 && <div className="empty-state"><Search size={26} /><h3>No sources found.</h3><p>Try another format, freshness state or search term.</p><button onClick={resetFilters}>Clear filters</button></div>}
        </div>
        <div className="source-register-foot"><div><span className="footer-trust-mark">[ • ]</span><span>Each record keeps a publisher and reference link. Only McKinsey's 2026 title, date and two passages are source-checked.</span></div><span>RSS → URL → PDF → NEWSLETTER</span></div>
      </section>
      <div className="bottom-note"><span>NEXT: INSPECT A CLAIM.</span><p>Follow two checked findings from the same report into the matrix. They answer different survey questions; the workflow behind this demo has not run live.</p><Link href="/evidence?open=cl-3">Step 02 · Compare the measures <ArrowRight size={16} /></Link></div>
      <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(undefined)} />
    </>
  );
}
