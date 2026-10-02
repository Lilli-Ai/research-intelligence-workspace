import { describe, expect, it } from "vitest";
import { selectedPortfolioProjects } from "../data/portfolioProjects";

describe("author portfolio selection", () => {
  it("keeps GitHub MCP and LangGraph above Tutor and TravelTech", () => {
    expect(selectedPortfolioProjects.map(project => project.id)).toEqual([
      "github-mcp-server",
      "business-card-agent",
      "ai-english-tutor",
      "traveltech-ai-insights",
    ]);
  });

  it("shows only public project links and specific technology tags", () => {
    for (const project of selectedPortfolioProjects) {
      expect(project.href).toMatch(/^https:\/\/github\.com\/Lilli-Ai\//);
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeLessThanOrEqual(5);
    }
    expect(selectedPortfolioProjects[2].linkLabel).toBe("Read the build story");
  });
});
