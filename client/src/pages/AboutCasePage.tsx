import { Link } from "wouter";
import {
  ArrowRight, ArrowUpRight, BookOpenText, Check, ExternalLink,
  GitBranch, Layers3, Mail, ShieldCheck, Wrench,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/ResearchPrimitives";

const proof = [
  {
    label: "PUBLIC CODE / MCP INTEGRATION",
    title: "GitHub MCP server",
    description: "A separate Python MCP project exposing repository and issue operations as tools for an AI assistant.",
    href: "https://github.com/Lilli-Ai/github-mcp-server",
    icon: GitBranch,
  },
  {
    label: "PUBLIC CODE / AGENT WORKFLOW",
    title: "LangGraph business-card agent",
    description: "A separate ReAct agent that reads an image, extracts structured fields and evaluates the result.",
    href: "https://github.com/Lilli-Ai/langgraph-business-card-agent",
    icon: Layers3,
  },
];

export default function AboutCasePage() {
  return (
    <>
      <div className="page-eyebrow"><span className="eyebrow-rule" /> PORTFOLIO / PROJECT NOTES <span className="eyebrow-muted">/ ABOUT THE BUILD</span></div>
      <section className="case-hero">
        <div className="case-hero-copy">
          <span className="case-overline">RESEARCH INTELLIGENCE WORKSPACE · INTERACTIVE PROTOTYPE</span>
          <h1>Evidence should be<br /><em>easy to question.</em></h1>
          <p>Research Intelligence Workspace explores a repeatable path from scattered public materials to a brief whose claims, sources and disagreements stay visible.</p>
          <div className="case-hero-actions">
            <Link href="/sources?open=src-mck" className="primary-action">Start with a source <ArrowUpRight size={16} /></Link>
            <Link href="/brief" className="text-action">Skip to the sample brief <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="case-author-card">
          <span className="case-overline">THE PERSON BEHIND THE CASE</span>
          <span className="case-author-monogram" aria-hidden="true">LA</span>
          <h2>Lilia Avagyan</h2>
          <p>AI Automation &amp; Agentic Workflows · 10+ years in IT, telecom and business operations.</p>
          <div className="case-author-links">
            <a href="https://github.com/Lilli-Ai" target="_blank" rel="noreferrer">GitHub <ExternalLink size={14} /></a>
            <a href="https://www.linkedin.com/in/lil-ai-travel" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14} /></a>
            <a href="mailto:labeautyfl8@gmail.com?subject=Research%20Intelligence%20Workspace%20collaboration">Email <Mail size={14} /></a>
          </div>
        </div>
      </section>

      <section className="case-intro">
        <div><SectionLabel meta="01 / INTENT">WHY THIS EXISTS</SectionLabel><h2>From operations experience to an inspectable research workflow.</h2></div>
        <p>My background is in coordinating real processes where missing context costs time. I now build automation and agent workflows, including self-hosted tools on an Ubuntu VPS. In this portfolio case, the important design choice is to keep a human close to the evidence: an AI-generated summary should never hide the source or an unresolved conflict.</p>
      </section>

      <section className="case-status-section">
        <div className="section-heading"><div><SectionLabel meta="02 / BUILD STATUS">WHAT IS REAL TODAY</SectionLabel><h2>Prototype now. Integrations next.</h2></div><span className="section-support">Scope shown as of 2 Oct 2026</span></div>
        <div className="case-status-grid">
          <article className="case-status-card is-ready"><div className="case-status-icon"><Check size={19} /></div><span>WORKING IN THIS DEMO</span><h3>Inspectable interface</h3><p>A three-step visitor path, local search and filters, claim-to-evidence drawers, source references, a conflict filter and a linked sample brief. The current checked comparison is not a conflict.</p></article>
          <article className="case-status-card is-demo"><div className="case-status-icon"><BookOpenText size={19} /></div><span>ILLUSTRATIVE CONTENT</span><h3>One report, two checked passages</h3><p>McKinsey's 25 Aug 2026 title, date and two cited passages were checked against its article. The other source dates and excerpts are illustrative. Counts describe sample records; there is no live run log.</p></article>
          <article className="case-status-card is-next"><div className="case-status-icon"><Wrench size={19} /></div><span>NOT CONNECTED YET</span><h3>Live research pipeline</h3><p>RSS/URL/PDF ingestion, n8n orchestration, PostgreSQL storage, retrieval, saved reviewer decisions, PDF export and Telegram delivery are future integration steps.</p></article>
        </div>
      </section>

      <section className="case-provenance">
        <div className="case-provenance-copy"><SectionLabel meta="03 / RESPONSIBILITY">HOW THIS PROTOTYPE WAS MADE</SectionLabel><h2>A product direction shaped by Lilia, built with AI-assisted development.</h2><p>Lilia defined the portfolio goal, workflow requirements and the need for visible provenance and human review. The React interface and illustrative scenario were implemented with an AI assistant; the McKinsey 2026 comparison was checked against a public report. Her separate public repositories show hands-on integration and agent work, not the backend of this website.</p></div>
        <div className="case-principle"><ShieldCheck size={27} /><strong>No invented production proof.</strong><p>When a real source-to-brief run is connected, it will appear here with a timestamp, exact source excerpt, review status and a reproducible workflow record. Until then this remains an interactive prototype.</p></div>
      </section>

      <section className="case-proof-section"><div className="section-heading"><div><SectionLabel meta="04 / SELECTED WORK">RELATED PROOF OF PRACTICE</SectionLabel><h2>Separate builds. Real code.</h2></div><span className="section-support">Two relevant examples, not a complete portfolio</span></div><div className="case-proof-grid">{proof.map(item => { const Icon = item.icon; return <a className="case-proof-card" key={item.title} href={item.href} target="_blank" rel="noreferrer"><span className="case-proof-icon"><Icon size={21} /></span><span className="case-overline">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><span className="case-proof-link">View public repository <ArrowUpRight size={15} /></span></a>; })}</div></section>

      <div className="case-footer-cta"><span>DESIGNED AS A REUSABLE APPROACH · NOT A MULTI-TENANT PRODUCT</span><p>The same source → evidence → brief method can be adapted to another topic. This release demonstrates one illustrative AI governance workspace, not a live service for multiple clients.</p><Link href="/workspace">Back to Start here <ArrowRight size={16} /></Link></div>
      <section className="case-connect"><div><span className="case-overline">OPEN TO COLLABORATION</span><h2>Let's connect.</h2><p>Interested in an evidence-first research workflow or adapting this approach to your topic? I would be glad to discuss it.</p></div><a href="mailto:labeautyfl8@gmail.com?subject=Research%20Intelligence%20Workspace%20collaboration" className="primary-action">Email Lilia <Mail size={16} /></a></section>
    </>
  );
}
