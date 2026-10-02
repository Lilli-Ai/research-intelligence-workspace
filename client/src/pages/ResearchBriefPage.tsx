import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight, ArrowUpRight, Bookmark, Check,
  Clock3, Download, FileText, Link2, X,
} from "lucide-react";
import {
  briefSections, claims, dashboardMetrics, sources,
  type Claim, type Source,
} from "@/data/researchDemo";
import {
  ClaimDetailDrawer, SectionLabel, SourceDrawer,
  SourceFingerprint, StatusPill,
} from "@/components/shared/ResearchPrimitives";
import { GuidedPath } from "@/components/research/GuidedPath";

function scrollToComparison() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.getElementById("section-2")?.scrollIntoView({ behavior, block: "start" });
}

export default function ResearchBriefPage() {
  const search = useSearch();
  const [selectedSource, setSelectedSource] = useState<Source>();
  const [selectedClaim, setSelectedClaim] = useState<Claim>();
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(search).get("section") !== "compare") return;
    const frame = window.requestAnimationFrame(scrollToComparison);
    return () => window.cancelAnimationFrame(frame);
  }, [search]);

  return (
    <>
      <div className="page-eyebrow">
        <span className="eyebrow-rule" /> WORKSPACE / OUTPUT
        <span className="eyebrow-muted">/ RESEARCH BRIEF</span>
      </div>
      <GuidedPath current={3} onExample={scrollToComparison} />
      <section className="brief-page-head">
        <div>
          <span className="page-title-index">03 / DECISION-READY INTELLIGENCE</span>
          <h1>The research <em>brief.</em></h1>
          <p>Not a recap of everything. A defensible view of what matters next, with the evidence left in sight.</p>
        </div>
        <div className="brief-page-actions">
          <button className="secondary-action" onClick={() => setExportOpen(true)}><Download size={17} /> PDF export (planned)</button>
          <span>Opens a feature note · no PDF generated</span>
        </div>
      </section>
      <div className="brief-layout">
        <article className="brief-document">
          <div className="document-topline">
            <span><span className="doc-mark">[ · ]</span> TRACE / INTELLIGENCE</span>
            <span>RESEARCH BRIEF — 001</span>
          </div>
          <div className="document-hero">
            <div className="document-kicker">STATIC SAMPLE BRIEF <span>·</span> ONE SOURCE-CHECKED REPORT</div>
            <h2>From AI adoption<br />to <em>measured impact.</em></h2>
            <p className="document-deck">Enterprise AI use is rising. A 2026 survey separates scaling from reported financial results; the other policy excerpts in this prototype remain illustrative.</p>
            <div className="document-byline">
              <span><Clock3 size={15} /> Sample snapshot · 2 Oct 2026</span>
              <span><Bookmark size={15} /> AI governance radar</span>
              <span><Link2 size={15} /> {sources.length} reference sources</span>
            </div>
          </div>
          <div className="document-editorial-note">
            <span>THE SHORT READ</span>
            <strong>More information does not create clarity. An inspectable evidence trail does.</strong>
          </div>
          <div className="brief-section-list">
            {briefSections.map((section, index) => (
              <section className="brief-section" key={section.heading} id={`section-${index}`}>
                <div className="brief-section-index">0{index + 1}</div>
                <div>
                  <div className="brief-section-kicker">{["THE EXECUTIVE VIEW", "THE SIGNAL", "THE COMPARISON", "THE RESPONSE"][index]}</div>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                  <div className="citation-row">
                    <span>INSPECT CLAIM</span>
                    {section.claimIds.map((id, claimIndex) => {
                      const claim = claims.find(item => item.id === id);
                      return claim ? (
                        <button key={id} className="citation-chip citation-claim" onClick={() => setSelectedClaim(claim)} title={claim.claim}>
                          <span>[C{claimIndex + 1}]</span> {claim.topic} <ArrowUpRight size={12} />
                        </button>
                      ) : null;
                    })}
                  </div>
                  <div className="citation-row source-citation-row">
                    <span>REFERENCE SOURCES</span>
                    {section.citations.map((id, citationIndex) => {
                      const source = sources.find(item => item.id === id);
                      return source ? (
                        <button key={id} className="citation-chip" onClick={() => setSelectedSource(source)}>
                          <span>[{citationIndex + 1}]</span> {source.publisher} <ArrowUpRight size={12} />
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              </section>
            ))}
          </div>
          <div className="document-bottom"><span>END OF BRIEF</span><span>Two source-checked report passages · other excerpts illustrative.</span></div>
        </article>
        <aside className="brief-rail">
          <div className="brief-rail-sticky">
            <div className="brief-rail-card">
              <SectionLabel meta="01 / SNAPSHOT">BRIEF STATUS</SectionLabel>
              <div className="brief-status-check"><span><Check size={21} /></span><div><strong>Sample · ready to inspect</strong><small>Static example; no live pipeline run</small></div></div>
              <div className="brief-rail-row"><span>Sources referenced</span><strong>{sources.length}</strong></div>
              <div className="brief-rail-row"><span>Claims considered</span><strong>{claims.length}</strong></div>
              <div className="brief-rail-row"><span>Open conflicts</span><strong>{claims.filter(claim => claim.conflict).length} in sample</strong></div>
              <div className="brief-rail-row"><span>Example evidence</span><StatusPill label={`${dashboardMetrics.evidenceExcerpts} excerpts`} tone="teal" /></div>
            </div>
            <div className="brief-rail-card brief-compare-note">
              <Check size={20} />
              <h3>Two measures. No false conflict.</h3>
              <p>McKinsey reports 44% scaling AI and 37% attributing some positive EBIT impact. Different survey questions—inspect the wording before comparing.</p>
              <Link href="/evidence?open=cl-3">Inspect the source trail <ArrowRight size={15} /></Link>
            </div>
            <div className="brief-rail-card brief-source-card">
              <SectionLabel meta="02 / SOURCES">BEHIND THE BRIEF</SectionLabel>
              {sources.slice(0, 4).map(source => (
                <button onClick={() => setSelectedSource(source)} key={source.id}><SourceFingerprint source={source} compact /><ArrowUpRight size={14} /></button>
              ))}
              <Link href="/sources">All sources <ArrowRight size={15} /></Link>
            </div>
          </div>
        </aside>
      </div>
      <div className="journey-end"><div><strong>You have reached the brief.</strong><p>The three-step example ends here. The two McKinsey passages were checked against the linked report; other excerpts and the workflow remain illustrative.</p></div><Link href="/about">What is built, what comes next <ArrowRight size={16} /></Link></div>
      <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(undefined)} />
      <ClaimDetailDrawer claim={selectedClaim} onClose={() => setSelectedClaim(undefined)} />
      {exportOpen && (
        <Dialog.Root open onOpenChange={setExportOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="modal-backdrop" />
            <Dialog.Content className="export-modal" aria-describedby={undefined}>
              <Dialog.Title className="sr-only">PDF export preview</Dialog.Title>
              <button className="icon-button modal-close" onClick={() => setExportOpen(false)} aria-label="Close"><X size={18} /></button>
              <div className="export-modal-icon"><FileText size={26} /></div>
              <span className="eyebrow">EXPORT / DEMO PREVIEW</span>
              <h2>One brief. Every source in sight.</h2>
              <p>This interactive portfolio demo previews the brief and citations. PDF generation is a planned production integration, not an active feature in this version.</p>
              <button className="primary-action" onClick={() => setExportOpen(false)}>Return to brief <ArrowRight size={16} /></button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </>
  );
}
