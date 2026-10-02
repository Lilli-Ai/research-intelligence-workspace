import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Clock3, Radio, Send, ShieldCheck } from "lucide-react";
import { dashboardMetrics, pipelineActivity, pipelineStages } from "@/data/researchDemo";
import { MetricCard, SectionLabel, StatusPill } from "@/components/shared/ResearchPrimitives";

export default function PipelinePage() {
  return (
    <>
      <div className="page-eyebrow"><span className="eyebrow-rule" /> BEHIND THE BUILD <span className="eyebrow-muted">/ PROPOSED PIPELINE</span></div>
      <section className="page-title-section">
        <div>
          <span className="page-title-index">HOW THIS COULD BE AUTOMATED</span>
          <h1>Behind the <em>example.</em></h1>
          <p>This screen illustrates a proposed workflow, not a log of real imports. Its numbers match the sample records you can open elsewhere on the site.</p>
        </div>
        <div className="pipeline-title-status"><span className="live-dot" /><div><strong>Not connected</strong><small>Illustration · no real run</small></div></div>
      </section>

      <div className="pipeline-hero">
        <div className="pipeline-hero-copy">
          <span className="mini-overline">THE IDEA AT A GLANCE</span>
          <h2>Many sources.<br /><em>One inspectable view.</em></h2>
          <p>In the planned system each step reduces noise without severing the link between a conclusion and its origin.</p>
          <Link href="/sources" className="white-link">Start with a source <ArrowUpRight size={17} /></Link>
        </div>
        <div className="pipeline-hero-diagram">
          <div className="diagram-head"><span>RESEARCH FLOW / CONCEPT</span><span>NOT EXECUTED</span></div>
          {pipelineStages.map((stage, index) => (
            <div className="diagram-step" key={stage.id}>
              <span className="diagram-number">{String(index + 1).padStart(2, "0")}</span>
              <span className={`diagram-dot ${stage.status}`}>{index + 1}</span>
              <strong>{stage.label}</strong><span>{stage.count}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="pipeline-metrics" aria-label="Counts in the inspectable sample">
        <MetricCard label="SAMPLE SOURCES" value={String(dashboardMetrics.sourcesTracked)} helper="Each has a record in Source library" trend="All visible" />
        <MetricCard label="DUPLICATE TAG" value={String(dashboardMetrics.duplicateFlags)} helper="A sample label, not a measured dedup rate" trend="Example only" tone="ink" />
        <MetricCard label="SAMPLE EXCERPTS" value={String(dashboardMetrics.evidenceExcerpts)} helper={`${dashboardMetrics.sourceCheckedExcerpts} source-checked; others synthetic`} trend={`${dashboardMetrics.mappedDocuments}/${dashboardMetrics.documents} records linked`} />
        <MetricCard label="CONFLICT FLAGS" value={String(dashboardMetrics.conflicts).padStart(2, "0")} helper="Different survey measures are not flagged" trend="No false alerts" tone="coral" />
      </section>

      <div className="pipeline-detail-grid">
        <section className="panel pipeline-stage-panel">
          <div className="panel-heading"><div><SectionLabel meta="01 / CONCEPT STAGES">PROPOSED FLOW</SectionLabel><h2>What each stage would do.</h2></div><StatusPill label="Illustration" tone="slate" /></div>
          <div className="pipeline-stage-list">
            {pipelineStages.map((stage, index) => (
              <div className="pipeline-stage-row" key={stage.id}>
                <div className="pipeline-stage-timeline">
                  <span className={`pipeline-stage-node ${stage.status}`}>{String(index + 1).padStart(2, "0")}</span>
                  {index < pipelineStages.length - 1 && <span className="timeline-line" />}
                </div>
                <div className="pipeline-stage-copy">
                  <div><span className="pipeline-stage-number">0{index + 1} / 06</span><strong>{stage.label}</strong><StatusPill label={stage.status === "attention" ? "Needs review" : "Example"} tone={stage.status === "attention" ? "amber" : "slate"} /></div>
                  <p>{stage.detail}</p>
                </div>
                <div className="pipeline-stage-stats"><strong>{stage.count}</strong><small>{stage.duration}</small></div>
              </div>
            ))}
          </div>
        </section>
        <aside className="pipeline-aside">
          <section className="panel activity-panel">
            <SectionLabel meta="02 / DEMO SEQUENCE">WHAT THIS SAMPLE ILLUSTRATES</SectionLabel>
            <h2>Five steps, no fake timestamps.</h2>
            <div className="activity-list">
              {pipelineActivity.map(item => (
                <div className="activity-row" key={item.id}>
                  <span className={`activity-dot activity-${item.tone}`} /><span className="activity-time">{item.time}</span>
                  <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                </div>
              ))}
            </div>
          </section>
          <section className="panel delivery-panel">
            <SectionLabel meta="03 / DELIVERY">DIGEST STATUS</SectionLabel>
            <div className="delivery-icon"><Send size={21} /></div>
            <h2>A brief, not another alert.</h2>
            <p>Telegram delivery is a planned adapter. No message is sent from this prototype.</p>
            <div className="delivery-status"><span><Radio size={15} /> Telegram digest</span><StatusPill label="Not connected" tone="slate" /></div>
            <div className="delivery-status"><span><Clock3 size={15} /> Schedule</span><strong>Not configured</strong></div>
          </section>
        </aside>
      </div>
      <div className="pipeline-architecture-strip">
        <span><ShieldCheck size={18} /> PLANNED VPS INTEGRATION</span>
        <p>Potential path: n8n collection → text cleaning and structured extraction → PostgreSQL evidence records → human review → cited brief. These components are not connected to this site.</p>
        <Link href="/about">Project status <ArrowRight size={16} /></Link>
      </div>
    </>
  );
}
