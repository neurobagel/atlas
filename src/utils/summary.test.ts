import { describe, expect, it } from 'vitest';
import { getSummaryStats } from '~/utils/summary';
import type { Community, CommunityNode, CommunityStats } from '~/utils/types';

const communities: Community[] = [
  {
    id: 'a',
    name: 'A',
    status: 'active',
    queryToolUrl: 'https://a.example.org',
    federationApiUrl: 'https://a.example.org/',
  },
  {
    id: 'b',
    name: 'B',
    status: 'active',
    queryToolUrl: 'https://b.example.org',
    federationApiUrl: 'https://b.example.org/',
  },
  { id: 'c', name: 'C', status: 'onboarding' },
];

const node = (id: string, communityId: string, country: string): CommunityNode => ({
  id,
  name: id,
  communityId,
  city: 'City',
  country,
  lat: 0,
  lng: 0,
});

const nodes = [node('n1', 'a', 'Canada'), node('n2', 'a', 'Canada'), node('n3', 'b', 'France')];

const stats: Record<string, CommunityStats> = {
  a: { status: 'success', subjects: 100, datasets: 2, nodes: 2 },
  b: { status: 'success', subjects: 50, datasets: 1, nodes: 1 },
};

describe('getSummaryStats', () => {
  it('should sum the subjects and count the nodes and communities', () => {
    expect(getSummaryStats(communities, nodes, stats)).toMatchObject({
      subjects: 150,
      nodes: 3,
      communities: 3,
    });
  });

  it('should count a country once however many nodes it has', () => {
    expect(getSummaryStats(communities, nodes, stats).countries).toBe(2);
  });

  it('should add no subjects for communities without stats', () => {
    // Community c is onboarding and has no node
    expect(getSummaryStats(communities, nodes, { a: stats.a }).subjects).toBe(100);
  });

  it('should ignore stats that have no subject count', () => {
    expect(getSummaryStats(communities, nodes, { a: { status: 'loading' } }).subjects).toBe(0);
  });
});
