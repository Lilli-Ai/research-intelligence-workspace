import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileText,
  Link2,
  Rss,
  X,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "wouter";
import {
  claimEvidence,
  claimSources,
  freshnessTone,
  sourceById,
} from "@/lib/research";
import { initials, sourceTypeLabel } from "@/lib/formatters";
import type { Claim, Source } from "@/data/researchDemo";

export type Tone = "teal" | "amber" | "coral" | "ink" | "slate";

export function StatusPill({ label, tone = "slate", icon }: { label: string; tone?: Tone; icon?: React.ReactNode }) {
  return (
    <span className={`status-pill status-pill-${tone}`}>
      {icon}
      {label}
    </span>
  );
}

export function ConfidenceMeter({ value, showLabel = true }: { value: number; showLabel?: boolean }) {
  const filled = Math.round(value / 10);
  return (
    <div className="confidence-wrap">
      <div className="confidence-meter" aria-label={`${value}% confidence`}>
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className={index < filled ? "confidence-segment is-filled" : "confidence-segment"} />
        ))}
      </div>
      {showLabel && <span className="confidence-value">{value}%</span>}
    </div>
  );
}

export function SourceFingerprint({ source, compact = false }: { source?: Source; compact?: boolean }) {
  if (!source) return null;
  const icon = source.type === "RSS" ? <Rss size={13} /> : source.type === "PDF" ? <FileText size={13} /> : <Link2 size={13} />;
  return (
    <div className={`source-fingerprint ${compact ? "is-compact" : ""}`}>
      <span className={`source-avatar source-avatar-${source.accent}`}>{initials(source.publisher)}</span>
      <span className="source-fingerprint-copy">
        <strong>{source.publisher}</strong>
        <small>{icon}{source.domain}</small>
      </span>
      {!compact && <span className={`freshness-dot freshness-${freshnessTone(source.freshness)}`} title={source.freshness} />}
    </div>
  );
}

export function SectionLabel({ children, meta }: { children: React.ReactNode; meta?: React.ReactNode }) {
  return (
    <div className="section-label-row">
      <span className="section-label">{children}</span>
      {meta && <span className="section-label-meta">{meta}</span>}
    </div>
  );
}

export function MetricCard({ label, value, helper, tone = "teal", trend }: { label: string; value: string; helper: string; tone?: Tone; trend?: string }) {
  return (
    <article className={`metric-card metric-card-${tone}`}>
      <div className="metric-topline">
        <span>{label}</span>
        {trend && <span className="metric-trend">{trend}</span>}
      </div>
      <strong className="metric-value">{value}</strong>
      <span className="metric-helper">{helper}</span>
    </article>
  );
}

export function SourceDrawer({ source, onClose }: { source?: Source; onClose: () => void }) {
  if (!source) return null;
  return (
    <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-backdrop" />
        <Dialog.Content className="detail-drawer" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">{source.name} source detail</Dialog.Title>
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Source detail</span>
            <h2>{source.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="drawer-scroll">
          <div className="drawer-source-hero">
            <SourceFingerprint source={source} />
            <StatusPill label={source.status} tone={source.status === "Review" ? "amber" : source.status === "Duplicate" ? "coral" : "teal"} icon={source.status === "Processed" ? <Check size={12} /> : <CircleAlert size={12} />} />
          </div>
          <div className="drawer-grid">
            <div><span className="field-label">Source type</span><strong>{sourceTypeLabel(source.type)}</strong></div>
            <div><span className="field-label">{source.sourceChecked ? "Publication date" : "Sample publication date"}</span><strong>{source.publishedAt}</strong></div>
            <div><span className="field-label">In this prototype</span><strong>{source.lastProcessed}</strong></div>
            <div><span className="field-label">Sample freshness</span><strong className={`text-${freshnessTone(source.freshness)}`}>{source.freshness}</strong></div>
          </div>
          <div className="drawer-section">
            <span className="field-label">{source.sourceChecked ? "Source-checked summary · not a direct quote" : "Illustrative excerpt · synthetic demo text"}</span>
            <p className="drawer-quote">{source.sourceChecked ? source.excerpt : `“${source.excerpt}”`}</p>
          </div>
          <div className="drawer-section">
            <span className="field-label">{source.sourceChecked ? "Checked source reference" : "Reference link / demo citation"}</span>
            <p className="drawer-copy">{source.citation}. {source.sourceChecked ? "The title, date and two report passages in Step 02 were checked against the linked article. This record was curated manually; no live source ingestion has run." : "This public publisher link is a reference only; it does not verify the illustrative excerpt, title or publication date in this demo."}</p>
          </div>
          <div className="drawer-section">
            <span className="field-label">Provenance</span>
            <div className="provenance-line"><span className="provenance-node" /><span>Proposed path: collect → clean → group → classify. No live collection has run.</span></div>
            <div className="provenance-line"><span className="provenance-node is-active" /><span>Sample claim and evidence links can be inspected in the matrix.</span></div>
          </div>
          {source.status === "Duplicate" && <div className="drawer-section"><span className="field-label">About this sample tag</span><p className="drawer-copy">“Duplicate” is an illustrative review label. No matching imported copy is available in this prototype, and no deduplication job has run.</p></div>}
          {source.id === "src-mck" && <div className="drawer-tour-note"><span>STEP 01 COMPLETE</span><p>Two checked report passages answer different survey questions. Inspect them together without inventing a conflict.</p><Link href="/evidence?open=cl-3">Step 02 · Compare the measures <ArrowRight size={15} /></Link></div>}
          <a className="drawer-external-link" href={source.url} target="_blank" rel="noreferrer">Open public source <ExternalLink size={14} /></a>
        </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ClaimDetailDrawer({ claim, onClose }: { claim?: Claim; onClose: () => void }) {
  if (!claim) return null;
  const linkedSources = claimSources(claim);
  const linkedEvidence = claimEvidence(claim);
  return (
    <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="drawer-backdrop" />
        <Dialog.Content className="detail-drawer claim-drawer" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Claim evidence detail</Dialog.Title>
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Claim inspection</span>
            <h2>Evidence thread</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="drawer-scroll">
          <div className="claim-drawer-claim">
            <div className="claim-kicker-row"><span className="claim-topic">{claim.topic}</span>{claim.conflict && <StatusPill label="Conflict" tone="coral" icon={<CircleAlert size={12} />} />}</div>
            <h3>{claim.claim}</h3>
            <p>{claim.rationale}</p>
          </div>
          <div className="drawer-grid claim-drawer-metrics">
            <div><span className="field-label">Confidence</span><ConfidenceMeter value={claim.confidence} /></div>
            <div><span className="field-label">Sample freshness</span><strong className={`text-${freshnessTone(claim.freshness)}`}>{claim.freshness}</strong></div>
          </div>
          <div className="drawer-section evidence-thread">
            <span className="field-label">Evidence passages · {linkedEvidence.length}</span>
            {linkedEvidence.map(item => {
              const source = item ? sourceById(item.sourceId) : undefined;
              if (!item || !source) return null;
              return (
                <article className={`evidence-quote ${item.support === "challenges" ? "is-challenge" : ""}`} key={item.id}>
                  <div className="evidence-quote-line"><span className="evidence-quote-marker" /><span>{item.sourceChecked ? "Checked against original · " : "Synthetic example · "}{item.support === "challenges" ? "challenges" : "supports"} claim</span></div>
                  <blockquote>“{item.quote}”</blockquote>
                  <div className="evidence-quote-footer"><SourceFingerprint source={source} compact /><span>{item.publishedAt} · {item.locator}</span></div>
                </article>
              );
            })}
          </div>
          <div className="drawer-section">
            <span className="field-label">Decision impact</span>
            <p className="drawer-copy">{claim.impact}</p>
          </div>
          <div className="drawer-section">
            <span className="field-label">Linked sources</span>
            <div className="linked-sources">{linkedSources.map(source => source && <a href={source.url} key={source.id} target="_blank" rel="noreferrer" className="linked-source-link"><SourceFingerprint source={source} /><span>Open source <ExternalLink size={13} /></span></a>)}</div>
          </div>
          {claim.id === "cl-3" && <div className="drawer-tour-note"><span>STEP 02 COMPLETE</span><p>Now see how the brief separates enterprise scaling from reported EBIT impact without calling them contradictory.</p><Link href="/brief?section=compare">Step 03 · Read the brief <ArrowRight size={15} /></Link></div>}
          <div className="drawer-footer-note"><Clock3 size={14} /> Fixed demo snapshot. {linkedEvidence.every(item => item?.sourceChecked) ? "These two passages were checked against the source." : "Unchecked excerpts are synthetic, not verified quotations."} Confidence is not a truth verdict.</div>
        </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
