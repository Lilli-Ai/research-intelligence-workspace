import {
  claims,
  evidence,
  sources,
  type Claim,
  type Freshness,
  type Source,
  type SourceType,
} from "@/data/researchDemo";

export type EvidenceFilter = "all" | "conflicts" | "high-confidence" | "fresh";

export function sourceById(id: string) {
  return sources.find(source => source.id === id);
}

export function evidenceById(id: string) {
  return evidence.find(item => item.id === id);
}

export function claimEvidence(claim: Claim) {
  return claim.evidenceIds.map(evidenceById).filter(Boolean);
}

export function claimSources(claim: Claim) {
  return claim.sourceIds.map(sourceById).filter(Boolean);
}

export function filterClaims(
  input: Claim[],
  filter: EvidenceFilter,
  query = "",
  topic = "All topics",
  sourceType: SourceType | "All types" = "All types",
): Claim[] {
  const normalizedQuery = query.trim().toLowerCase();
  return input
    .filter(claim => {
      if (filter === "conflicts" && !claim.conflict) return false;
      if (filter === "high-confidence" && claim.confidence < 85) return false;
      if (filter === "fresh" && claim.freshness !== "Fresh") return false;
      if (topic !== "All topics" && claim.topic !== topic) return false;
      if (sourceType !== "All types" && !claim.sourceIds.some(id => sourceById(id)?.type === sourceType)) return false;
      if (!normalizedQuery) return true;
      const evidenceText = claim.evidenceIds.map(id => evidenceById(id)?.quote ?? "");
      const sourceText = claim.sourceIds.flatMap(id => {
        const source = sourceById(id);
        return source ? [source.name, source.publisher, source.domain, source.excerpt] : [];
      });
      const haystack = [claim.claim, claim.topic, claim.rationale, claim.impact, ...evidenceText, ...sourceText].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => Number(b.conflict) - Number(a.conflict) || b.confidence - a.confidence);
}

export function filterSources(
  input: Source[],
  query = "",
  type: SourceType | "All types" = "All types",
  freshness: Freshness | "All freshness" = "All freshness",
): Source[] {
  const normalizedQuery = query.trim().toLowerCase();
  return input.filter(source => {
    if (type !== "All types" && source.type !== type) return false;
    if (freshness !== "All freshness" && source.freshness !== freshness) return false;
    if (!normalizedQuery) return true;
    return [source.name, source.publisher, source.domain, source.tag, source.excerpt]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });
}

export function freshnessTone(freshness: Freshness) {
  if (freshness === "Fresh") return "teal";
  if (freshness === "Watch") return "amber";
  return "coral";
}

export function confidenceLabel(value: number) {
  if (value >= 90) return "High confidence";
  if (value >= 80) return "Good confidence";
  return "Review confidence";
}

export function topicOptions() {
  return ["All topics", ...Array.from(new Set(claims.map(claim => claim.topic)))];
}

export function sourceTypeCount(type: SourceType) {
  return sources.filter(source => source.type === type).length;
}
