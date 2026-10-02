import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, Clock3, Layers3, MoveUpRight, Sparkles } from "lucide-react";
import { claims, sources, dashboardMetrics, pipelineStages, type Claim, type Source } from "@/data/researchDemo";
import { ClaimDetailDrawer, MetricCard, SectionLabel, SourceDrawer, SourceFingerprint, StatusPill } from "@/components/shared/ResearchPrimitives";
import { StartHere } from "@/components/research/GuidedPath";

export default function WorkspaceOverview() {
  const [selectedClaim, setSelectedClaim] = useState<Claim>();
  const [selectedSource, setSelectedSource] = useState<Source>();
  return (
    <>
      <div className="page-eyebrow"><span className="eyebrow-rule" /> RESEARCH INTELLIGENCE WORKSPACE <span className="eyebrow-muted">/ SAMPLE RADAR</span></div>
      <section className="overview-hero">
        <div className="overview-hero-main">
          <div className="hero-kicker"><span className="hero-kicker-dot" /> PORTFOLIO CASE <span className="hero-kicker-line" /> AI ADOPTION + GOVERNANCE</div>
          <h1>Make sense of more.<br /><em>Decide with evidence.</em></h1>
          <p>See how a sample source becomes an inspectable claim, then a short brief. Start with the sources and follow the same example across three screens.</p>
          <div className="hero-builderline"><span className="hero-builder-mark">LA</span><span><strong>Research concept by Lilia Avagyan</strong><small>AI Automation &amp; Agentic Workflows · interactive prototype</small></span><Link href="/about">About the build <ArrowUpRight size={14} /></Link></div>
          <div className="hero-actions">
            <Link href="/sources?open=src-mck" className="primary-action">Start with a source <ArrowUpRight size={17} /></Link>
            <a href="#start-here" className="text-action">See the three steps <ArrowRight size={17} /></a>
          </div>
        </div>
        <div className="hero-aside">
          <span className="hero-aside-index">01 / THE DECISION VIEW</span>
          <div className="hero-aside-rule" />
          <span className="hero-aside-label">SOURCE-CHECKED SIGNAL · 2026</span>
          <h2>AI scaling is rising. Reported EBIT impact is flatter.</h2>
          <p>Two different measures in McKinsey's August 2026 survey. Inspect their wording rather than calling them a contradiction.</p>
          <div className="hero-aside-foot"><span><Check size={15} /> 1 linked report</span><span>2 checked passages</span></div>
        </div>
      </section>

      <StartHere />

      <section className="metrics-section">
        <div className="section-heading"><div><SectionLabel meta="01 / AT A GLANCE">WHAT YOU CAN OPEN</SectionLabel><h2>Everything here is inspectable.</h2></div><span className="section-support">Counts from the visible sample, not a claimed live pipeline</span></div>
        <div className="metrics-grid">
          <MetricCard label="SAMPLE SOURCES" value={String(dashboardMetrics.sourcesTracked)} helper="Open every source record in the library" trend="4 formats" />
          <MetricCard label="SAMPLE EXCERPTS" value={String(dashboardMetrics.evidenceExcerpts)} helper={`${dashboardMetrics.sourceCheckedExcerpts} McKinsey passages checked; ${dashboardMetrics.evidenceExcerpts - dashboardMetrics.sourceCheckedExcerpts} synthetic examples`} trend="Open a claim" tone="ink" />
          <MetricCard label="LINKED CLAIMS" value={String(dashboardMetrics.decisionSignals)} helper="Each opens an evidence trail" trend="All inspectable" tone="teal" />
          <MetricCard label="CONFLICT FLAGS" value={String(dashboardMetrics.conflicts).padStart(2, "0")} helper="Different survey measures are not a conflict" trend="No false alerts" tone="coral" />
        </div>
      </section>

      <div className="overview-columns">
        <div className="overview-primary-column">
          <section className="panel signal-panel">
            <div className="panel-heading"><div><SectionLabel meta="02 / WHAT MATTERS">PRIORITY SIGNALS</SectionLabel><h2>Worth your attention.</h2></div><Link href="/evidence" className="subtle-link">View all claims <ArrowUpRight size={15} /></Link></div>
            <div className="signal-list">
              {[claims[2], claims[0], claims[1]].map((claim, index) => (
                <button className="signal-row" key={claim.id} onClick={() => setSelectedClaim(claim)} aria-label={`Inspect sample claim: ${claim.claim}`}>
                  <span className="signal-row-index">0{index + 1}</span>
                  <span className="signal-row-body"><span className="signal-row-top"><span className="claim-topic">{claim.topic}</span><span className="signal-updated">Sample record</span></span><strong>{claim.claim}</strong><span className="signal-row-bottom">{claim.sourceIds.length} linked sources <span className="small-dot" /> {claim.evidenceIds.length} evidence excerpts</span></span>
                  <span className="signal-row-end">{claim.conflict ? <StatusPill label="Conflict" tone="coral" icon={<CircleAlert size={12} />} /> : <StatusPill label={`${claim.confidence}% confident`} tone="teal" />}<ArrowUpRight size={16} /></span>
                </button>
              ))}
            </div>
            <div className="panel-footnote"><Sparkles size={15} /> Every signal links back to a source. Confidence is an evidence assessment, not a truth score.</div>
          </section>

          <section className="brief-preview">
            <div className="brief-preview-paper">
              <div className="brief-preview-top"><span>TRACE / RESEARCH NOTE 01</span><span>SAMPLE BRIEF · 2026</span></div>
              <div className="brief-preview-body"><span className="brief-preview-label">DECISION BRIEF</span><h2>From AI adoption<br />to measured impact.</h2><p>McKinsey reports wider enterprise scaling, yet the share attributing EBIT impact is about the same as last year. Compare the measures before making a claim about value.</p><div className="brief-preview-citations"><span>01</span><span>02</span> 2 checked report passages</div></div>
            </div>
            <div className="brief-preview-side"><span className="mini-overline">03 / READY TO REVIEW</span><h3>Not another summary.<br />A better next move.</h3><p>Read the signal, see the open questions, then take an evidence-backed action.</p><Link href="/brief" className="white-link">Read the brief <ArrowUpRight size={18} /></Link></div>
          </section>
        </div>
        <aside className="overview-side-column">
          <section className="panel evidence-coverage-panel"><SectionLabel meta="04 / QUALITY">SAMPLE TRACEABILITY</SectionLabel><div className="coverage-number">{dashboardMetrics.mappedDocuments}<span>/{dashboardMetrics.documents}</span></div><p>sample material records have an evidence link. {dashboardMetrics.sourceCheckedExcerpts} McKinsey passages were checked; the rest are synthetic.</p><div className="coverage-track"><span style={{ width: `${dashboardMetrics.evidenceCoverage}%` }} /></div><div className="coverage-foot"><span><span className="live-dot" /> {dashboardMetrics.evidenceExcerpts} excerpts</span><span>{dashboardMetrics.conflicts} conflict flags</span></div></section>
          <section className="panel source-panel"><div className="panel-heading"><div><SectionLabel meta="05 / PROVENANCE">SAMPLE SOURCES</SectionLabel><h2>In the stream.</h2></div></div><div className="source-mini-list">{sources.slice(0, 4).map(source => <button key={source.id} className="source-mini-row" onClick={() => setSelectedSource(source)}><SourceFingerprint source={source} compact /><span><span className="source-mini-tag">{source.type}</span><MoveUpRight size={14} /></span></button>)}</div><Link href="/sources" className="subtle-link source-panel-link">Browse source library <ArrowRight size={16} /></Link></section>
          <section className="panel pipeline-mini"><SectionLabel meta="06 / SYSTEM">PROPOSED FLOW</SectionLabel><h2>From noise to clarity.</h2><div className="pipeline-mini-track">{pipelineStages.map((stage, index) => <div className="pipeline-mini-stage" key={stage.id}><span className={`pipeline-mini-dot ${index === 4 ? "is-attention" : ""}`}>{index + 1}</span><span>{stage.label}</span></div>)}</div><div className="pipeline-mini-foot"><Clock3 size={15} /> Concept only · no live run</div><Link href="/pipeline" className="subtle-link">Behind the build <ArrowRight size={16} /></Link></section>
        </aside>
      </div>
      <ClaimDetailDrawer claim={selectedClaim} onClose={() => setSelectedClaim(undefined)} />
      <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(undefined)} />
    </>
  );
}
