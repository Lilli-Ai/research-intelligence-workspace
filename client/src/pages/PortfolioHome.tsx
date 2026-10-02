import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  GitBranch,
  Mail,
  Radar,
  ScanSearch,
  Server,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  selectedPortfolioProjects,
  type PortfolioProjectKind,
} from "@/data/portfolioProjects";
import "./portfolio.css";

const projectIcons: Record<PortfolioProjectKind, LucideIcon> = {
  integration: GitBranch,
  agent: ScanSearch,
  voice: AudioLines,
  intelligence: Radar,
};

const contactEmail = "mailto:labeautyfl8@gmail.com?subject=AI%20automation%20collaboration";

export default function PortfolioHome() {
  return (
    <div className="portfolio-home">
      <header className="portfolio-site-header">
        <Link href="/" className="portfolio-wordmark" aria-label="AI Automation portfolio, home">
          <span className="portfolio-monogram" aria-hidden="true">LA<span>.</span></span>
          <span><strong>AI Automation</strong><small>AGENTIC WORKFLOWS</small></span>
        </Link>
        <nav className="portfolio-header-nav" aria-label="Portfolio navigation">
          <a href="#about">About</a>
          <a href="#selected-work">Selected work</a>
          <a href="#research-demo">Research demo</a>
        </nav>
        <a className="portfolio-header-contact" href={contactEmail}>Let&apos;s connect <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>

      <main>
        <section className="portfolio-hero" id="about" aria-labelledby="portfolio-name">
          <div className="portfolio-hero-copy">
            <span className="portfolio-eyebrow"><span className="portfolio-presence-dot" /> AI AUTOMATION · AGENTIC SYSTEMS · OPERATIONS</span>
            <h1 id="portfolio-name">Lilia Avagyan<span>I build AI workflows that make practical sense.</span></h1>
            <p className="portfolio-lede">I bring 10+ years of IT, telecom, and operations experience to building practical AI systems. I connect agents, APIs, and self-hosted tools to real workflows—and keep people involved where judgment matters.</p>
            <div className="portfolio-hero-actions">
              <a href="#selected-work" className="portfolio-primary-action">Explore my work <ArrowRight size={18} aria-hidden="true" /></a>
              <a href={contactEmail} className="portfolio-quiet-action">Let&apos;s connect <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="portfolio-credibility"><span>10+ years in IT &amp; operations</span><span>Hands-on AI agents &amp; automation</span><span>Self-hosted on Ubuntu VPS</span></div>
          </div>
          <aside className="portfolio-hero-aside" aria-label="How I work">
            <span className="portfolio-aside-kicker">THE WORK BEHIND THE TOOLS</span>
            <span className="portfolio-aside-symbol" aria-hidden="true"><span>[</span><i /><span>]</span></span>
            <h2>Systems first.<br /><em>Human judgment always.</em></h2>
            <p>I started in complex day-to-day operations. Now I design the connections between data, models, people, and the decisions they need to make.</p>
            <div className="portfolio-aside-capabilities">
              <span><Workflow size={17} aria-hidden="true" /> Workflow orchestration</span>
              <span><Server size={17} aria-hidden="true" /> Self-hosted infrastructure</span>
              <span><ShieldCheck size={17} aria-hidden="true" /> Human-in-the-loop design</span>
            </div>
          </aside>
        </section>

        <section className="portfolio-work-section" id="selected-work" aria-labelledby="selected-work-title">
          <div className="portfolio-section-heading">
            <div><span className="portfolio-eyebrow">01 / SELECTED WORK</span><h2 id="selected-work-title">The projects behind the practice.</h2></div>
            <p>Four different ways I put AI and automation to work—from callable tools and agents to voice systems and research pipelines.</p>
          </div>
          <div className="portfolio-project-grid">
            {selectedPortfolioProjects.map(project => {
              const Icon = projectIcons[project.kind];
              return (
                <article className={`portfolio-project-card portfolio-project-${project.kind}`} key={project.id}>
                  <div className="portfolio-project-top"><span>{project.number} / {project.category}</span><span className="portfolio-project-icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span></div>
                  <h3>{project.title}</h3>
                  <p className="portfolio-project-headline">{project.headline}</p>
                  <p className="portfolio-project-description">{project.description}</p>
                  <ul className="portfolio-project-stack" aria-label={`Tools used for ${project.title}`}>
                    {project.stack.map(tool => <li key={tool}>{tool}</li>)}
                  </ul>
                  <a className="portfolio-project-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.linkLabel}: ${project.title} on GitHub`}>{project.linkLabel} <ArrowUpRight size={16} aria-hidden="true" /></a>
                </article>
              );
            })}
          </div>
          <p className="portfolio-project-note">Selected examples, not a complete portfolio. Project links open Lilia&apos;s public GitHub repositories; the tutor link is an architecture write-up rather than a source-code release.</p>
        </section>

        <section className="portfolio-featured" id="research-demo" aria-labelledby="research-demo-title">
          <div className="portfolio-featured-copy">
            <span className="portfolio-eyebrow">02 / FEATURED DIRECTION · INTERACTIVE PROTOTYPE</span>
            <h2 id="research-demo-title">Research Intelligence Workspace<span>From information overload to an evidence-ready brief.</span></h2>
            <p>Follow a sample source through an inspectable claim, its evidence trail, and a short brief. This is an exploration of how research automation could work—not a live ingestion service.</p>
            <Link href="/workspace" className="portfolio-featured-action">Explore the research demo <ArrowRight size={18} aria-hidden="true" /></Link>
            <span className="portfolio-featured-status"><ShieldCheck size={15} aria-hidden="true" /> Interactive sample · Live pipeline not connected</span>
          </div>
          <div className="portfolio-featured-diagram" aria-label="Demo flow from source to evidence to brief">
            <span className="portfolio-diagram-heading">THE EXAMPLE PATH</span>
            <div><span>01</span><strong>Source</strong><small>Where did it come from?</small></div>
            <div><span>02</span><strong>Evidence</strong><small>What supports or challenges it?</small></div>
            <div><span>03</span><strong>Brief</strong><small>What still needs a decision?</small></div>
          </div>
        </section>

        <section className="portfolio-contact-section" aria-labelledby="portfolio-contact-title">
          <div><span className="portfolio-eyebrow">03 / GET IN TOUCH</span><h2 id="portfolio-contact-title">Have a workflow worth improving?</h2><p>I&apos;m interested in useful automation, thoughtful AI agents, and the practical work of connecting systems.</p></div>
          <div className="portfolio-contact-actions"><a href={contactEmail} className="portfolio-primary-action">Email Lilia <Mail size={17} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/lil-ai-travel" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a></div>
        </section>
      </main>
      <footer className="portfolio-site-footer"><span>© {new Date().getFullYear()} Lilia Avagyan · AI Automation &amp; Agentic Workflows</span><a href="https://github.com/Lilli-Ai" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></footer>
    </div>
  );
}
