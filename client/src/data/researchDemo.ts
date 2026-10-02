export type SourceType = "RSS" | "URL" | "PDF" | "Newsletter";
export type Freshness = "Fresh" | "Watch" | "Stale";
export type EvidenceSupport = "supports" | "challenges";

export interface ResearchProject {
  id: string;
  name: string;
  description: string;
  ownerLabel: string;
  lastSync: string;
  cadence: string;
}

export interface Source {
  id: string;
  name: string;
  publisher: string;
  type: SourceType;
  domain: string;
  freshness: Freshness;
  status: "Processed" | "Review" | "Duplicate";
  lastProcessed: string;
  publishedAt: string;
  citation: string;
  excerpt: string;
  url: string;
  tag: string;
  accent: string;
  sourceChecked?: boolean;
}

export interface Document {
  id: string;
  sourceId: string;
  title: string;
  format: SourceType;
  publishedAt: string;
  processedAt: string;
  status: Source["status"];
  topic: string;
  relevance: "High" | "Medium";
  canonicalGroup: string;
}

export interface Evidence {
  id: string;
  sourceId: string;
  quote: string;
  context: string;
  support: EvidenceSupport;
  publishedAt: string;
  locator?: string;
  sourceChecked?: boolean;
}

export interface Claim {
  id: string;
  claim: string;
  topic: string;
  confidence: number;
  conflict: boolean;
  freshness: Freshness;
  sourceIds: string[];
  evidenceIds: string[];
  rationale: string;
  impact: string;
}

export interface BriefSection {
  heading: string;
  body: string;
  citations: string[];
  claimIds: string[];
}

export interface PipelineStage {
  id: string;
  label: string;
  count: string;
  status: "complete" | "active" | "attention";
  duration: string;
  detail: string;
}

export interface PipelineActivity {
  id: string;
  time: string;
  label: string;
  detail: string;
  tone: "teal" | "amber" | "coral" | "ink";
}

export interface PipelineRun {
  id: string;
  projectId: string;
  startedAt: string;
  finishedAt: string;
  status: "Illustration" | "Failed";
  stages: PipelineStage[];
  activities: PipelineActivity[];
}

export const activeProject: ResearchProject = {
  id: "ai-governance-radar",
  name: "AI governance radar",
  description: "Signals and evidence for the fixed sample brief",
  ownerLabel: "Portfolio case by Lilia Avagyan",
  lastSync: "No live sync",
  cadence: "No live schedule",
};

export const sources: Source[] = [
  {
    id: "src-nist",
    name: "AI Risk Management Framework",
    publisher: "NIST",
    type: "URL",
    domain: "nist.gov",
    freshness: "Stale",
    status: "Processed",
    lastProcessed: "Demo snapshot",
    publishedAt: "Jan 26, 2023",
    citation: "NIST AI 100-1",
    excerpt: "A practical taxonomy for managing AI risks across design, deployment and evaluation.",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    tag: "Standards",
    accent: "teal",
  },
  {
    id: "src-eu",
    name: "Regulatory framework for artificial intelligence",
    publisher: "European Commission",
    type: "URL",
    domain: "digital-strategy.ec.europa.eu",
    freshness: "Fresh",
    status: "Processed",
    lastProcessed: "Demo snapshot",
    publishedAt: "Sep 28, 2026",
    citation: "EU AI Act policy page",
    excerpt: "A staged implementation timeline is changing how providers document high-risk systems.",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    tag: "Policy",
    accent: "navy",
  },
  {
    id: "src-mck",
    name: "The state of AI in 2026: On the road to ROI",
    publisher: "McKinsey",
    type: "URL",
    domain: "mckinsey.com",
    freshness: "Watch",
    status: "Processed",
    lastProcessed: "Demo snapshot",
    publishedAt: "Aug 25, 2026",
    citation: "McKinsey Global Survey, 25 August 2026 · survey of 1,719 respondents",
    excerpt: "Enterprise-wide AI scaling rose from 38% to 44%; 37% of respondents attribute some positive EBIT impact to AI use. These are different measures.",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    tag: "Adoption & impact",
    accent: "amber",
    sourceChecked: true,
  },
  {
    id: "src-mit",
    name: "AI regulation and the next operating model",
    publisher: "MIT Technology Review",
    type: "RSS",
    domain: "technologyreview.com",
    freshness: "Fresh",
    status: "Processed",
    lastProcessed: "Demo snapshot",
    publishedAt: "Sep 30, 2026",
    citation: "The Algorithm newsletter",
    excerpt: "Compliance teams are becoming embedded in product operations rather than acting as a final gate.",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/",
    tag: "Analysis",
    accent: "coral",
  },
  {
    id: "src-oecd",
    name: "Artificial intelligence policy observatory",
    publisher: "OECD.AI",
    type: "Newsletter",
    domain: "oecd.org",
    freshness: "Fresh",
    status: "Review",
    lastProcessed: "Demo snapshot",
    publishedAt: "Sep 26, 2026",
    citation: "OECD policy observatory",
    excerpt: "Policy activity is accelerating, with sector-specific guidance emerging in parallel.",
    url: "https://www.oecd.org/en/topics/sub-issues/ai.html",
    tag: "Signals",
    accent: "teal",
  },
  {
    id: "src-arxiv",
    name: "Evaluating frontier model governance practices",
    publisher: "arXiv research digest",
    type: "PDF",
    domain: "arxiv.org",
    freshness: "Fresh",
    status: "Duplicate",
    lastProcessed: "Demo snapshot",
    publishedAt: "Sep 29, 2026",
    citation: "arXiv:2401.02368, p. 7",
    excerpt: "Independent evaluations can expose blind spots that are not visible in internal testing alone.",
    url: "https://arxiv.org/abs/2401.02368",
    tag: "Research",
    accent: "navy",
  },
];

export const documents: Document[] = sources.map(source => ({
  id: `doc-${source.id}`,
  sourceId: source.id,
  title: source.name,
  format: source.type,
  publishedAt: source.publishedAt,
  processedAt: source.lastProcessed,
  status: source.status,
  topic: source.tag,
  relevance: source.status === "Duplicate" ? "Medium" : "High",
  canonicalGroup: source.status === "Duplicate" ? "governance-evaluation" : source.id,
}));

export const evidence: Evidence[] = [
  {
    id: "ev-nist-1",
    sourceId: "src-nist",
    quote: "The AI RMF is intended to be practical, adaptable and voluntary, and to be used across the AI lifecycle.",
    context: "Framework positioning",
    support: "supports",
    publishedAt: "Jan 26, 2023",
    locator: "Overview",
  },
  {
    id: "ev-eu-1",
    sourceId: "src-eu",
    quote: "The AI Act follows a risk-based approach, which means that different risks associated with AI systems are categorised and regulated differently.",
    context: "Regulatory design",
    support: "supports",
    publishedAt: "Sep 28, 2026",
    locator: "Policy overview",
  },
  {
    id: "ev-eu-2",
    sourceId: "src-eu",
    quote: "Providers of high-risk AI systems will have to meet obligations before placing their systems on the market.",
    context: "Provider obligations",
    support: "supports",
    publishedAt: "Sep 28, 2026",
    locator: "High-risk systems",
  },
  {
    id: "ev-mck-1",
    sourceId: "src-mck",
    quote: "44 percent now report that AI is scaling across their enterprise, up from 38 percent a year ago",
    context: "Reported enterprise-wide AI scaling",
    support: "supports",
    publishedAt: "Aug 25, 2026",
    locator: "Use of AI is deepening · Exhibit 1",
    sourceChecked: true,
  },
  {
    id: "ev-mit-1",
    sourceId: "src-mit",
    quote: "The next generation of compliance work will sit closer to product and engineering teams, not at the end of the launch checklist.",
    context: "Operating model analysis",
    support: "supports",
    publishedAt: "Sep 30, 2026",
    locator: "The Algorithm",
  },
  {
    id: "ev-oecd-1",
    sourceId: "src-oecd",
    quote: "More than 40 jurisdictions have announced or adopted national AI strategies, many with sector-specific implementation guidance.",
    context: "Policy activity",
    support: "supports",
    publishedAt: "Sep 26, 2026",
    locator: "AI policy observatory",
  },
  {
    id: "ev-arxiv-1",
    sourceId: "src-arxiv",
    quote: "External evaluation improves the chance of detecting capability and safety gaps that remain hidden in internal validation.",
    context: "Evaluation practice",
    support: "supports",
    publishedAt: "Sep 29, 2026",
    locator: "Page 7",
  },
  {
    id: "ev-mck-2",
    sourceId: "src-mck",
    quote: "Thirty-seven percent of respondents attribute at least some EBIT impact to AI use (about the same share as last year)",
    context: "Respondent-attributed EBIT impact; a different survey measure",
    support: "supports",
    publishedAt: "Aug 25, 2026",
    locator: "Key takeaways · AI impact remains concentrated",
    sourceChecked: true,
  },
];

export const claims: Claim[] = [
  {
    id: "cl-1",
    claim: "AI governance is moving from a policy function into the product operating model.",
    topic: "Operating model",
    confidence: 92,
    conflict: false,
    freshness: "Fresh",
    sourceIds: ["src-mit", "src-nist"],
    evidenceIds: ["ev-mit-1", "ev-nist-1"],
    rationale: "Two sources point in the same direction: governance is lifecycle work, not a launch-only review.",
    impact: "Teams need an owner and review loop inside product delivery.",
  },
  {
    id: "cl-2",
    claim: "High-risk AI systems will carry documentation obligations before market release in the EU.",
    topic: "Regulation",
    confidence: 97,
    conflict: false,
    freshness: "Fresh",
    sourceIds: ["src-eu"],
    evidenceIds: ["ev-eu-1", "ev-eu-2"],
    rationale: "Primary policy source with a recent publication date and direct wording on provider obligations.",
    impact: "Evidence collection must be part of the release checklist for regulated use cases.",
  },
  {
    id: "cl-3",
    claim: "Enterprise-wide AI scaling rose, while reported positive EBIT impact remained roughly flat.",
    topic: "Adoption & impact",
    confidence: 82,
    conflict: false,
    freshness: "Watch",
    sourceIds: ["src-mck"],
    evidenceIds: ["ev-mck-1", "ev-mck-2"],
    rationale: "McKinsey reports 44% scaling AI across the enterprise (up from 38%) and 37% attributing some positive EBIT impact (roughly unchanged). They answer different survey questions; this is not a contradiction or a causal estimate.",
    impact: "Track AI deployment and attributed financial impact separately; verify definitions before claiming a return on a specific deployment.",
  },
  {
    id: "cl-4",
    claim: "Policy activity is accelerating across jurisdictions and becoming more sector-specific.",
    topic: "Regulation",
    confidence: 88,
    conflict: false,
    freshness: "Fresh",
    sourceIds: ["src-oecd", "src-eu"],
    evidenceIds: ["ev-oecd-1", "ev-eu-1"],
    rationale: "A policy observatory and a primary regulator page provide complementary coverage.",
    impact: "Maintain a jurisdiction-aware evidence map instead of a single global policy label.",
  },
  {
    id: "cl-5",
    claim: "Independent evaluations can reveal governance gaps that internal testing misses.",
    topic: "Evaluation",
    confidence: 81,
    conflict: false,
    freshness: "Fresh",
    sourceIds: ["src-arxiv", "src-nist"],
    evidenceIds: ["ev-arxiv-1", "ev-nist-1"],
    rationale: "Research evidence aligns with a lifecycle risk-management framework, although the operational cost is not quantified.",
    impact: "Add an external evaluation checkpoint for material model changes.",
  },
  {
    id: "cl-6",
    claim: "A reusable evidence register is a practical bridge between policy and shipping decisions.",
    topic: "Workflow",
    confidence: 79,
    conflict: false,
    freshness: "Fresh",
    sourceIds: ["src-nist", "src-eu", "src-mit"],
    evidenceIds: ["ev-nist-1", "ev-eu-2", "ev-mit-1"],
    rationale: "This is an applied synthesis from primary guidance and operating-model analysis, not a direct quoted fact.",
    impact: "Create a shared register with claim owners, dates, and review status.",
  },
  {
    id: "cl-7",
    claim: "Policy activity and AI deployment alone do not establish enterprise financial value.",
    topic: "Signal quality",
    confidence: 74,
    conflict: false,
    freshness: "Watch",
    sourceIds: ["src-oecd", "src-mck"],
    evidenceIds: ["ev-oecd-1", "ev-mck-2"],
    rationale: "This is an illustrative synthesis across a synthetic policy excerpt and one checked McKinsey finding. Neither policy activity nor reported scaling is itself a measured return.",
    impact: "Report policy developments, deployment and financial effects as separate signals in the next brief.",
  },
];

const mappedDocuments = documents.filter(document => evidence.some(item => item.sourceId === document.sourceId)).length;

// Every displayed metric is derived from the complete inspectable demo sample.
// These values describe UI records, not external collection or production processing.
export const dashboardMetrics = {
  sourcesTracked: sources.length,
  documents: documents.length,
  decisionSignals: claims.length,
  conflicts: claims.filter(claim => claim.conflict).length,
  evidenceExcerpts: evidence.length,
  sourceCheckedExcerpts: evidence.filter(item => item.sourceChecked).length,
  mappedDocuments,
  duplicateFlags: documents.filter(document => document.status === "Duplicate").length,
  evidenceCoverage: Math.round(mappedDocuments / documents.length * 100),
};

export const briefSections: BriefSection[] = [
  {
    heading: "Executive read",
    body: "AI adoption is spreading, but deployment is not the same as demonstrated financial return. McKinsey's August 2026 survey reports more enterprise-wide scaling while the share attributing some EBIT impact is roughly unchanged. This sample brief also explores policy and governance signals; those other excerpts remain illustrative.",
    citations: ["src-mck", "src-mit", "src-eu"],
    claimIds: ["cl-3", "cl-1", "cl-2"],
  },
  {
    heading: "What changed",
    body: "Recent policy updates make high-risk documentation obligations more concrete, while analysis from MIT Technology Review and the NIST framework points toward earlier, embedded review loops. The implication is operational: evidence should be captured while a system is being built, not reconstructed for an audit.",
    citations: ["src-eu", "src-mit", "src-nist"],
    claimIds: ["cl-2", "cl-1"],
  },
  {
    heading: "What the numbers actually say",
    body: "McKinsey's survey (25 Aug 2026) reports that 44% of respondents say AI is scaling across their enterprise, up from 38% a year earlier. Separately, 37% attribute some positive EBIT impact to AI use, about the same share as last year. These are different measures, not competing estimates; neither proves that scaling caused a financial result. Check the original definitions before applying either figure to a particular organization.",
    citations: ["src-mck"],
    claimIds: ["cl-3"],
  },
  {
    heading: "Suggested next moves",
    body: "1. Assign an evidence owner for each material AI product. 2. Add an external-evaluation checkpoint to the release workflow. 3. Maintain a jurisdiction-aware register with publication dates. 4. Measure deployment and attributed financial results separately, using the same definitions at each review.",
    citations: ["src-arxiv", "src-oecd", "src-eu", "src-mck"],
    claimIds: ["cl-5", "cl-4", "cl-6", "cl-3"],
  },
];

export const pipelineStages: PipelineStage[] = [
  { id: "collect", label: "Collect", count: `${dashboardMetrics.sourcesTracked} samples`, status: "complete", duration: "Not timed", detail: "Six illustrative source records; live collection is not connected" },
  { id: "clean", label: "Clean", count: `${dashboardMetrics.documents} records`, status: "complete", duration: "Not timed", detail: "One demo document record per sample source" },
  { id: "deduplicate", label: "Deduplicate", count: `${dashboardMetrics.duplicateFlags} flag`, status: "complete", duration: "Not timed", detail: "One sample record carries a duplicate marker; no live matching" },
  { id: "classify", label: "Classify", count: `${dashboardMetrics.decisionSignals} claims`, status: "complete", duration: "Not timed", detail: "Sample claims have topic and review labels" },
  { id: "evidence", label: "Map evidence", count: `${dashboardMetrics.evidenceExcerpts} excerpts`, status: "attention", duration: "Not timed", detail: "Two McKinsey report passages checked against source; other excerpts remain synthetic" },
  { id: "brief", label: "Brief-ready", count: "1 sample brief", status: "active", duration: "Not timed", detail: "Static brief separates different survey measures rather than inventing a conflict" },
];

export const pipelineActivity: PipelineActivity[] = [
  { id: "act-1", time: "01", label: "Example sources available", detail: `${dashboardMetrics.sourcesTracked} source records can be inspected`, tone: "ink" },
  { id: "act-2", time: "02", label: "Duplicate marker illustrated", detail: `${dashboardMetrics.duplicateFlags} sample record carries a duplicate tag`, tone: "amber" },
  { id: "act-3", time: "03", label: "Claims linked to excerpts", detail: `${dashboardMetrics.decisionSignals} claims reference ${dashboardMetrics.evidenceExcerpts} sample excerpts; ${dashboardMetrics.sourceCheckedExcerpts} checked against a source`, tone: "teal" },
  { id: "act-4", time: "04", label: "False conflict avoided", detail: "The 44% scaling and 37% EBIT responses are different measures, not contradictory estimates", tone: "amber" },
  { id: "act-5", time: "05", label: "Sample brief available", detail: "Its claim chips open the illustrative evidence trail", tone: "teal" },
];

export const illustrativeRun: PipelineRun = {
  id: "run-demo-001",
  projectId: activeProject.id,
  startedAt: "Illustrative sequence · no live execution",
  finishedAt: activeProject.lastSync,
  status: "Illustration",
  stages: pipelineStages,
  activities: pipelineActivity,
};
