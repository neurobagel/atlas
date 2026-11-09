import type { Community, CommunityNode, CommunityStats } from '~/utils/types';

export interface SummaryStats {
  subjects: number;
  nodes: number;
  communities: number;
  countries: number;
}

export function getSummaryStats(
  communities: Community[],
  nodes: CommunityNode[],
  stats: Record<string, CommunityStats>
): SummaryStats {
  return {
    subjects: Object.values(stats).reduce((total, { subjects }) => total + (subjects ?? 0), 0),
    nodes: nodes.length,
    communities: communities.length,
    countries: new Set(nodes.map((node) => node.country)).size,
  };
}
