export type PortfolioProjectKind = "integration" | "agent" | "voice" | "intelligence";

export interface PortfolioProject {
  id: string;
  number: string;
  kind: PortfolioProjectKind;
  category: string;
  title: string;
  headline: string;
  description: string;
  stack: string[];
  href: string;
  linkLabel: string;
}

// Reading order matters: top row MCP + LangGraph, bottom row Tutor + TravelTech.
export const selectedPortfolioProjects: PortfolioProject[] = [
  {
    id: "github-mcp-server",
    number: "01",
    kind: "integration",
    category: "INTEGRATION / CALLABLE TOOLS",
    title: "GitHub MCP Server",
    headline: "Give an AI assistant tools to work with repositories, not just talk about them.",
    description: "I built a Python MCP server that lets an assistant list repositories, read issues, and create issues through the GitHub REST API.",
    stack: ["Python", "FastMCP", "GitHub API"],
    href: "https://github.com/Lilli-Ai/github-mcp-server",
    linkLabel: "Explore the code",
  },
  {
    id: "business-card-agent",
    number: "02",
    kind: "agent",
    category: "AGENT / STRUCTURED EXTRACTION",
    title: "Business Card Agent",
    headline: "From an image to a usable contact, with each field checked.",
    description: "A LangGraph ReAct agent uses Gemini to read a sample card, saves structured details to CSV, and evaluates the result against fictional ground truth.",
    stack: ["LangGraph", "Gemini", "Python", "CSV"],
    href: "https://github.com/Lilli-Ai/langgraph-business-card-agent",
    linkLabel: "See the agent",
  },
  {
    id: "ai-english-tutor",
    number: "03",
    kind: "voice",
    category: "SELF-HOSTED / VOICE AI",
    title: "Private AI English Tutor",
    headline: "Bilingual speaking practice, assembled on my own VPS.",
    description: "I connected local Whisper transcription, Groq inference, and self-hosted Kokoro speech in Open WebUI. The public write-up covers architecture and real debugging decisions.",
    stack: ["Docker", "Open WebUI", "Whisper", "Groq", "Kokoro"],
    href: "https://github.com/Lilli-Ai/ai-english-tutor",
    linkLabel: "Read the build story",
  },
  {
    id: "traveltech-ai-insights",
    number: "04",
    kind: "intelligence",
    category: "AUTOMATION / RESEARCH",
    title: "TravelTech AI Insights",
    headline: "Turn scattered industry updates into a browsable intelligence feed.",
    description: "An n8n-led collection flow uses SerpApi, Firecrawl, and Airtable; the repository includes the Python/Gradio dashboard that displays collected insights.",
    stack: ["n8n", "SerpApi", "Firecrawl", "Airtable", "Gradio"],
    href: "https://github.com/Lilli-Ai/traveltech-ai-insights",
    linkLabel: "View the project",
  },
];
