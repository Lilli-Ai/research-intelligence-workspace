import type { SourceType } from "@/data/researchDemo";

export function formatPercent(value: number) {
  return `${value}%`;
}

export function sourceTypeLabel(type: SourceType) {
  const labels: Record<SourceType, string> = {
    RSS: "RSS feed",
    URL: "Public URL",
    PDF: "PDF report",
    Newsletter: "Newsletter",
  };
  return labels[type];
}

export function initials(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}
