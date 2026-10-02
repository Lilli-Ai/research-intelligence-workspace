import { Link } from "wouter";
import { ArrowRight, BookOpenText, Database, Table2 } from "lucide-react";
import { SectionLabel } from "@/components/shared/ResearchPrimitives";

const steps = [
  {
    number: "01",
    href: "/sources?open=src-mck",
    title: "Open a source",
    short: "Sources",
    description: "Open McKinsey's 25 Aug 2026 survey. Its title, date and two cited findings were checked against the original article.",
    hint: "Begin with the McKinsey report. Its two linked passages are source-checked; the rest of this sample remains illustrative.",
    action: "Open example source",
    icon: Database,
  },
  {
    number: "02",
    href: "/evidence?open=cl-3",
    title: "Inspect a claim",
    short: "Evidence",
    description: "Compare two findings: 44% scaling AI and 37% attributing some EBIT impact. These answer different survey questions.",
    hint: "Open the adoption-and-impact claim. Notice why two percentages from the same report are not automatically a contradiction.",
    action: "Compare the measures",
    icon: Table2,
  },
  {
    number: "03",
    href: "/brief?section=compare",
    title: "Read the brief",
    short: "Brief",
    description: "Read “What the numbers actually say”. Its claim chip takes you back to the two original report passages.",
    hint: "Read the brief's comparison, then click its claim chip to inspect the source-checked evidence trail.",
    action: "Jump to that section",
    icon: BookOpenText,
  },
] as const;

type StepNumber = 1 | 2 | 3;

export function StartHere() {
  return (
    <section className="start-here" id="start-here" aria-labelledby="start-here-title">
      <div className="section-heading">
        <div>
          <SectionLabel meta="A 60-SECOND TOUR">NEW HERE? START HERE</SectionLabel>
          <h2 id="start-here-title">Follow one idea, not every menu.</h2>
        </div>
        <span className="section-support">Source → evidence → brief · one checked report, other examples illustrative</span>
      </div>
      <div className="start-step-grid">
        {steps.map(step => {
          const Icon = step.icon;
          return (
            <Link className="start-step" href={step.href} key={step.number}>
              <span className="start-step-top"><span className="start-step-number">{step.number}</span><Icon size={19} aria-hidden="true" /></span>
              <strong>{step.title}</strong>
              <span className="start-step-description">{step.description}</span>
              <span className="start-step-link">Go to step {step.number} <ArrowRight size={15} aria-hidden="true" /></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function GuidedPath({ current, onExample }: { current: StepNumber; onExample: () => void }) {
  const step = steps[current - 1];
  return (
    <nav className="guided-path" aria-label="Three-step example walkthrough">
      <div className="guided-path-intro"><span>FOLLOW THE EXAMPLE · STEP {step.number} OF 03</span><p>{step.hint}</p><button className="guided-path-action" type="button" onClick={onExample}>{step.action} <ArrowRight size={14} aria-hidden="true" /></button></div>
      <div className="guided-path-links">
        {steps.map(item => (
          <Link key={item.number} href={item.href} className={`guided-path-link ${item.number === step.number ? "is-current" : ""}`} aria-current={item.number === step.number ? "step" : undefined}>
            <span>{item.number}</span> {item.short}
          </Link>
        ))}
      </div>
    </nav>
  );
}
