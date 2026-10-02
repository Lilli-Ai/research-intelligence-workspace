import { describe, expect, it } from "vitest";
import { briefSections, claims, dashboardMetrics, documents, evidence, pipelineStages, sources, type Evidence } from "../data/researchDemo";
import { filterClaims, filterSources, claimEvidence, claimSources } from "./research";

describe("research demo model", () => {
  it("derives every visible metric from the inspectable sample", () => {
    expect(dashboardMetrics.sourcesTracked).toBe(sources.length);
    expect(dashboardMetrics.documents).toBe(documents.length);
    expect(dashboardMetrics.decisionSignals).toBe(claims.length);
    expect(dashboardMetrics.evidenceExcerpts).toBe(evidence.length);
    expect(dashboardMetrics.sourceCheckedExcerpts).toBe(evidence.filter(item => item.sourceChecked).length);
    expect(dashboardMetrics.conflicts).toBe(claims.filter(claim => claim.conflict).length);
    expect(dashboardMetrics.duplicateFlags).toBe(documents.filter(document => document.status === "Duplicate").length);
    expect(dashboardMetrics.mappedDocuments).toBe(documents.filter(document => evidence.some(item => item.sourceId === document.sourceId)).length);
    expect(pipelineStages[0].count).toContain(String(sources.length));
    expect(pipelineStages.every(stage => stage.duration === "Not timed")).toBe(true);
    expect(sources.every(source => source.lastProcessed === "Demo snapshot")).toBe(true);
    expect(documents).toHaveLength(sources.length);
  });

  it("keeps the checked 2026 report connected from source to brief without inventing a conflict", () => {
    const source = sources.find(item => item.id === "src-mck");
    const comparison = claims.find(item => item.id === "cl-3");
    expect(source?.name).toBe("The state of AI in 2026: On the road to ROI");
    expect(source?.publishedAt).toBe("Aug 25, 2026");
    expect(source?.type).toBe("URL");
    expect(source?.sourceChecked).toBe(true);
    expect(comparison?.conflict).toBe(false);
    expect(comparison?.sourceIds).toContain(source?.id);
    expect(comparison?.evidenceIds).toHaveLength(2);
    const reportPassages = claimEvidence(comparison!);
    expect(reportPassages.every((item: Evidence | undefined) => item?.sourceChecked && item.sourceId === source?.id && item.support === "supports")).toBe(true);
    expect(reportPassages[0]?.quote).toContain("44 percent");
    expect(reportPassages[1]?.quote).toContain("Thirty-seven percent");
    expect(dashboardMetrics.sourceCheckedExcerpts).toBe(2);
    expect(dashboardMetrics.conflicts).toBe(0);
    expect(briefSections.find(section => section.heading === "What the numbers actually say")?.claimIds).toContain(comparison?.id);
  });

  it("keeps every claim linked to existing evidence and sources", () => {
    for (const claim of claims) {
      expect(claimEvidence(claim).length).toBe(claim.evidenceIds.length);
      expect(claimSources(claim).length).toBe(claim.sourceIds.length);
      for (const item of claimEvidence(claim)) {
        expect(item).toBeDefined();
        expect(claim.sourceIds).toContain(item!.sourceId);
      }
    }
    expect(evidence.length).toBeGreaterThan(claims.length);
  });

  it("keeps every brief section traceable to a claim and supporting evidence", () => {
    for (const section of briefSections) {
      expect(section.claimIds.length).toBeGreaterThan(0);
      for (const claimId of section.claimIds) {
        const claim = claims.find(item => item.id === claimId);
        expect(claim).toBeDefined();
        expect(claimEvidence(claim!).some((item: Evidence | undefined) => item?.support === "supports")).toBe(true);
      }
      for (const sourceId of section.citations) {
        expect(sources.some(source => source.id === sourceId)).toBe(true);
      }
    }
  });

  it("filters by topic, freshness and confidence without fabricating a conflicting claim", () => {
    const all = filterClaims(claims, "all");
    expect(all).toHaveLength(claims.length);
    expect(filterClaims(claims, "conflicts")).toHaveLength(0);
    expect(filterClaims(claims, "high-confidence").every(claim => claim.confidence >= 85)).toBe(true);
    expect(filterClaims(claims, "fresh").every(claim => claim.freshness === "Fresh")).toBe(true);
    expect(filterClaims(claims, "all", "", "Regulation").every(claim => claim.topic === "Regulation")).toBe(true);
    expect(filterClaims(claims, "all", "", "All topics", "PDF").every(claim => claim.sourceIds.some((id: string) => sources.find(source => source.id === id)?.type === "PDF"))).toBe(true);
    expect(filterClaims(claims, "all", "External evaluation").some(claim => claim.id === "cl-5")).toBe(true);
    expect(filterClaims(claims, "all", "European Commission").some(claim => claim.id === "cl-2")).toBe(true);
    expect(filterClaims(claims, "all", "not-a-real-claim")).toHaveLength(0);
  });

  it("filters sources by format, freshness and search term", () => {
    expect(filterSources(sources, "", "PDF").every(source => source.type === "PDF")).toBe(true);
    expect(filterSources(sources, "", "All types", "Fresh").every(source => source.freshness === "Fresh")).toBe(true);
    expect(filterSources(sources, "NIST")).toHaveLength(1);
  });
});
