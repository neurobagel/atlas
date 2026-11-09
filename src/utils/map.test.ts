import { describe, expect, it } from 'vitest';
import { getPinOffsets, getPinState, PIN_FAN_RADIUS } from '~/utils/map';
import type { CommunityNode } from '~/utils/types';

const node = (id: string, lat: number, lng: number): CommunityNode => ({
  id,
  name: id,
  communityId: 'c',
  city: 'City',
  country: 'Country',
  lat,
  lng,
});

describe('getPinState', () => {
  const all = ['a', 'b'];

  it('should return default for every pin when nothing is selected and all are visible', () => {
    expect(getPinState('a', null, all)).toBe('default');
    expect(getPinState('b', null, all)).toBe('default');
  });

  it('should dim pins outside the visible communities when only a filter applies', () => {
    expect(getPinState('a', null, ['a'])).toBe('default');
    expect(getPinState('b', null, ['a'])).toBe('dimmed');
  });

  it('should highlight the selected community and dim the others when only a selection applies', () => {
    expect(getPinState('a', 'a', all)).toBe('highlighted');
    expect(getPinState('b', 'a', all)).toBe('dimmed');
  });

  it('should highlight the selected community even when it is outside the visible communities', () => {
    expect(getPinState('a', 'a', ['b'])).toBe('highlighted');
    expect(getPinState('b', 'a', ['b'])).toBe('dimmed');
  });
});

describe('getPinOffsets', () => {
  const nodes = [node('x', 1, 1), node('y', 2, 2), node('z', 2, 2), node('w', 2, 2)];

  it('should give a lone node a zero offset', () => {
    expect(getPinOffsets(nodes).x).toEqual([0, 0]);
  });

  it('should give co-located nodes distinct offsets', () => {
    const offsets = getPinOffsets(nodes);
    const keys = ['y', 'z', 'w'].map((id) => offsets[id].join(','));
    expect(new Set(keys).size).toBe(3);
  });

  it('should place co-located nodes at the fan radius from the origin', () => {
    const offsets = getPinOffsets(nodes);
    ['y', 'z', 'w'].forEach((id) => {
      const [dx, dy] = offsets[id];
      // Distance from the origin is sqrt(dx² + dy²).
      // Offsets are rounded to whole pixels, so allow up to one pixel of error.
      expect(Math.abs(Math.hypot(dx, dy) - PIN_FAN_RADIUS)).toBeLessThanOrEqual(1);
    });
  });

  it('should be deterministic', () => {
    expect(getPinOffsets(nodes)).toEqual(getPinOffsets([...nodes]));
  });
});
