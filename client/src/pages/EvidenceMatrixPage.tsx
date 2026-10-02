import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowDownUp, ArrowRight, ArrowUpRight, CircleAlert, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { claims, type Claim, type SourceType } from "@/data/researchDemo";
import { filterClaims, sourceById, evidenceById, topicOptions, type EvidenceFilter } from "@/lib/research";
import {
  ClaimDetailDrawer, ConfidenceMeter, SectionLabel, SourceFingerprint, StatusPill,
} from "@/components/shared/ResearchPrimitives";
import { GuidedPath } from "@/components/research/GuidedPath";

const filterOptions: { value: EvidenceFilter; label: string }[] = [
  { value: "all", label: "All claims" },
  { value: "conflicts", label: "Conflicts" },
  { value: "high-confidence", label: "High confidence" },
  { value: "fresh", label: "Recent in sample" },
];

export default function EvidenceMatrixPage() {
  const search = useSearch();
  const queryParam = new URLSearchParams(search).get("q") ?? "";
  const openClaimId = new URLSearchParams(search).get("open");
  const [query, setQuery] = useState(queryParam);
  const [filter, setFilter] = useState<EvidenceFilter>("all");
  const [topic, setTopic] = useState("All topics");
  const [sourceType, setSourceType] = useState<SourceType | "All types">("All types");
  const [selectedClaim, setSelectedClaim] = useState<Claim>();

  useEffect(() => setQuery(queryParam), [queryParam]);
  useEffect(() => { if (openClaimId) setSelectedClaim(claims.find(claim => claim.id === openClaimId)); }, [openClaimId]);
  const rows = useMemo(() => filterClaims(claims, filter, query, topic, sourceType), [filter, query, topic, sourceType]);
  const hasFilters = filter !== "all" || topic !== "All topics" || sourceType !== "All types" || !!query;
  const resetFilters = () => { setFilter("all"); setTopic("All topics"); setSourceType("All types"); setQuery(""); };

  return (
    <>
      <div className="page-eyebrow"><span className="eyebrow-rule" /> WORKSPACE / INTELLIGENCE <span className="eyebrow-muted">/ EVIDENCE MATRIX</span></div>
      <GuidedPath current={2} onExample={() => setSelectedClaim(claims.find(claim => claim.id === "cl-3"))} />
      <section className="page-title-section evidence-title-section">
        <div>
          <span className="page-title-index">02 / INSPECT THE EVIDENCE</span>
          <h1>Evidence <em>matrix.</em></h1>
          <p>Every conclusion earns its place. Inspect the source trail, weigh confidence and avoid inventing a disagreement.</p>
        </div>
        <div className="matrix-title-stat"><span className="matrix-title-stat-value">{claims.length.toString().padStart(2, "0")}</span><span>inspectable claims<br />in this demo sample</span></div>
      </section>
      <div className="matrix-insight-bar">
        <div><span className="insight-icon"><CircleAlert size={19} /></span><span><strong>Different measures are not necessarily a conflict.</strong><small>Compare McKinsey's 2026 scaling and EBIT questions before drawing a conclusion.</small></span></div>
        <button onClick={() => setSelectedClaim(claims.find(claim => claim.id === "cl-3"))}>Compare the measures <ArrowRight size={16} /></button>
      </div>
      <section className="matrix-section">
        <div className="matrix-section-top"><SectionLabel meta={`${rows.length} OF ${claims.length} SHOWN`}>CLAIM REGISTER</SectionLabel><span className="sample-note">Two report passages checked · others illustrative</span></div>
        <div className="matrix-toolbar">
          <div className="matrix-filter-buttons">
            {filterOptions.map(item => (
              <button key={item.value} className={`filter-chip ${filter === item.value ? "is-active" : ""}`} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>
                {item.value === "conflicts" && <CircleAlert size={13} />}{item.label}
                {item.value === "conflicts" && <span className="chip-count">{claims.filter(claim => claim.conflict).length}</span>}
              </button>
            ))}
          </div>
          <div className="matrix-filter-tools">
            <label className="inline-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search claims…" aria-label="Search claims and evidence" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</label>
            <label className="select-wrap"><Filter size={15} /><select value={topic} onChange={event => setTopic(event.target.value)} aria-label="Filter by topic">{topicOptions().map(option => <option key={option}>{option}</option>)}</select></label>
            <label className="select-wrap"><select value={sourceType} onChange={event => setSourceType(event.target.value as SourceType | "All types")} aria-label="Filter by source type"><option>All types</option><option>RSS</option><option>URL</option><option>PDF</option><option>Newsletter</option></select></label>
            {hasFilters && <button className="clear-filters" onClick={resetFilters}>Clear filters</button>}
          </div>
        </div>
        <div className="matrix-sort-row"><span><SlidersHorizontal size={14} /> Local demo search · no fabricated conflicts</span><span><ArrowDownUp size={14} /> Sorted by review priority</span></div>
        <div className="matrix-table-wrap">
          <table className="matrix-table">
            <colgroup><col className="col-claim" /><col className="col-source" /><col className="col-evidence" /><col className="col-confidence" /><col className="col-conflict" /></colgroup>
            <thead><tr><th>CLAIM</th><th>SOURCE</th><th>EVIDENCE</th><th>CONFIDENCE</th><th>CONFLICT</th></tr></thead>
            <tbody>{rows.map((claim, index) => {
              const source = sourceById(claim.sourceIds[0]);
              const firstEvidence = evidenceById(claim.evidenceIds[0]);
              return (
                <tr key={claim.id} onClick={() => setSelectedClaim(claim)} tabIndex={0} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedClaim(claim); } }} className="matrix-row" aria-label={`Inspect claim: ${claim.claim}`}>
                  <td><span className="matrix-mobile-label">CLAIM</span><div className="claim-cell"><span className="matrix-row-number">{String(index + 1).padStart(2, "0")}</span><div><span className="claim-topic">{claim.topic}</span><strong>{claim.claim}</strong><small>{claim.sourceIds.length} linked sources · fixed sample</small></div></div></td>
                  <td><span className="matrix-mobile-label">SOURCE</span><SourceFingerprint source={source} compact /></td>
                  <td><span className="matrix-mobile-label">EVIDENCE</span><div className="matrix-evidence-cell"><span className="evidence-quote-mark">“</span><span>{firstEvidence?.quote ?? "Evidence pending review"}</span></div></td>
                  <td><span className="matrix-mobile-label">CONFIDENCE</span><div className="matrix-confidence"><ConfidenceMeter value={claim.confidence} /><small>{claim.confidence >= 90 ? "Strong trail" : claim.confidence >= 80 ? "Good trail" : "Review needed"}</small></div></td>
                  <td><span className="matrix-mobile-label">CONFLICT</span><div className="matrix-conflict-cell">{claim.conflict ? <StatusPill label="Review" tone="coral" icon={<CircleAlert size={12} />} /> : <StatusPill label="No conflict" tone="teal" />}<ArrowUpRight size={16} /></div></td>
                </tr>
              );
            })}</tbody>
          </table>
          {rows.length === 0 && <div className="empty-state"><Search size={26} /><h3>{filter === "conflicts" ? "No conflicting claims in this sample." : "No claims match this view."}</h3><p>{filter === "conflicts" ? "The 44% scaling and 37% EBIT findings answer different questions, so the demo does not flag them as contradictory." : "Try another topic or remove the search term to return to the full evidence trail."}</p><button onClick={resetFilters}>Clear filters</button></div>}
        </div>
        <div className="matrix-footer"><div><span className="footer-trust-mark">[ • ]</span><span><strong>Evidence stays attached.</strong><br />Two McKinsey passages were checked; all other excerpts are synthetic.</span></div><Link href="/brief?section=compare">Step 03 · Read the comparison <ArrowRight size={16} /></Link></div>
      </section>
      <ClaimDetailDrawer claim={selectedClaim} onClose={() => setSelectedClaim(undefined)} />
    </>
  );
}
