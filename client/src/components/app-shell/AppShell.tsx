import { useState, type ReactNode, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight, Bell, BookOpenText, ChevronDown, Command, Database,
  GitBranch, LayoutDashboard, Menu, Search, ShieldCheck, Table2, UserRound, X,
} from "lucide-react";
import { activeProject } from "@/data/researchDemo";

const navigation = [
  { href: "/workspace", label: "Start here", icon: LayoutDashboard },
  { href: "/sources", label: "Source library", icon: Database },
  { href: "/evidence", label: "Evidence matrix", icon: Table2 },
  { href: "/brief", label: "Research brief", icon: BookOpenText },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/about", label: "About the build", icon: UserRound },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectOpen, setProjectOpen] = useState(false);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(`/evidence${searchQuery.trim() ? `?q=${encodeURIComponent(searchQuery.trim())}` : ""}`);
    setSearchOpen(false);
    setMobileOpen(false);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand-row">
          <Link href="/workspace" className="brand-link" onClick={() => setMobileOpen(false)} aria-label="Trace Intelligence workspace home">
            <span className="brand-mark" aria-hidden="true"><span>[</span><i /><span>]</span></span>
            <span className="brand-copy"><strong>TRACE<span className="brand-slash">/</span></strong><small>INTELLIGENCE</small></span>
          </Link>
          <button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={19} /></button>
        </div>

        <div className="sidebar-project">
          <div className="sidebar-caption">ACTIVE WORKSPACE</div>
          <button className="project-selector" aria-label={`Demo topic: ${activeProject.name}`} aria-expanded={projectOpen} aria-controls="project-context" onClick={() => setProjectOpen(!projectOpen)} onKeyDown={event => { if (event.key === "Escape") setProjectOpen(false); }}>
            <span className="project-geometry"><span /></span>
            <span className="project-selector-copy"><strong>{activeProject.name}</strong><small>1 sample topic</small></span>
            <ChevronDown size={15} aria-hidden="true" />
          </button>
          <div className="project-menu" id="project-context" role="region" aria-label="Demo topic information" hidden={!projectOpen}><strong><span className="live-dot" /> {activeProject.name}</strong><small>One illustrative project in this portfolio demo. Multi-project workspaces belong to the production roadmap.</small></div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <div className="sidebar-caption nav-caption">FOLLOW THE EXAMPLE</div>
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`nav-link ${location === href ? "is-active" : ""}`} onClick={() => setMobileOpen(false)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{["/sources", "/evidence", "/brief"].includes(href) && <span className="nav-count">{href === "/sources" ? "01" : href === "/evidence" ? "02" : "03"}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <Link href="/" className="sidebar-portfolio-link" onClick={() => setMobileOpen(false)}>← Back to Lilia&apos;s work</Link>
          <div className="sidebar-note">
            <span className="sidebar-note-icon"><ShieldCheck size={19} /></span>
            <strong>A case by Lilia Avagyan.</strong>
            <p>AI automation meets evidence-first research. Explore the prototype, then see how it was made.</p>
            <a className="sidebar-contact" href="mailto:labeautyfl8@gmail.com?subject=Research%20Intelligence%20Workspace%20collaboration">Let's connect <ArrowRight size={14} /></a>
          </div>
          <div className="sidebar-status"><span className="live-dot" /> INTERACTIVE PROTOTYPE <span className="sidebar-status-right">2026</span></div>
        </div>
      </aside>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <span className="topbar-crumb">WORKSPACE</span><span className="topbar-divider">/</span>
            <strong>{navigation.find(item => item.href === location)?.label ?? "Research desk"}</strong>
          </div>
          <div className="topbar-right">
            <span className="sync-label"><span className="live-dot" /> Illustrative dataset · no live sync</span>
            <button className="icon-button topbar-icon" onClick={() => setSearchOpen(true)} aria-label="Search workspace"><Search size={19} /></button>
            <Link href="/pipeline" className="icon-button topbar-icon" aria-label="Demo delivery status"><Bell size={19} /></Link>
            <Link href="/about" className="avatar" title="About Lilia Avagyan" aria-label="About Lilia Avagyan">LA</Link>
          </div>
        </header>
        <div className="demo-disclosure"><ShieldCheck size={15} /><span><strong>Portfolio prototype by Lilia Avagyan.</strong> Two McKinsey report passages are source-checked; other records and pipeline steps are illustrative. No live ingestion.</span><Link href="/about">About this build <ArrowRight size={14} /></Link></div>
        <main className="page-canvas">{children}</main>
        <footer className="app-footer"><span>TRACE / INTELLIGENCE · Research case by Lilia Avagyan</span><span>Interactive prototype · Live pipeline not connected</span></footer>
      </div>

      {searchOpen && (
        <Dialog.Root open onOpenChange={setSearchOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="search-backdrop" />
            <Dialog.Content className="search-dialog" aria-describedby={undefined}>
              <Dialog.Title className="sr-only">Search workspace</Dialog.Title>
              <form onSubmit={onSearch}>
                <div className="search-dialog-input"><Search size={19} /><input autoFocus value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search claims, topics or evidence…" /><button type="button" className="kbd-button" onClick={() => setSearchOpen(false)}>ESC</button></div>
                <div className="search-dialog-hint"><Command size={15} /> Demo search across the seeded evidence index <ArrowRight size={15} /></div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}
