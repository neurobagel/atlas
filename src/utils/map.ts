import type { CommunityNode } from '~/utils/types';

export type PinState = 'default' | 'highlighted' | 'dimmed';

// Distance in pixels between a pin and the centre of its co-located group
export const PIN_FAN_RADIUS = 10;

// Selection takes precedence over the filters (to be implemented)
export function getPinState(
  communityId: string,
  selectedCommunityId: string | null,
  visibleCommunityIds: string[]
): PinState {
  if (selectedCommunityId !== null) {
    return communityId === selectedCommunityId ? 'highlighted' : 'dimmed';
  }
  return visibleCommunityIds.includes(communityId) ? 'default' : 'dimmed';
}

// Pixel offset per node so co-located pins fan out instead of stacking
export function getPinOffsets(
  nodes: CommunityNode[],
  radius = PIN_FAN_RADIUS
): Record<string, [number, number]> {
  const groups = new Map<string, CommunityNode[]>();
  nodes.forEach((node) => {
    const key = `${node.lat},${node.lng}`;
    groups.set(key, [...(groups.get(key) ?? []), node]);
  });

  const offsets: Record<string, [number, number]> = {};
  groups.forEach((group) => {
    group.forEach((node, i) => {
      if (group.length === 1) {
        offsets[node.id] = [0, 0];
        return;
      }
      // Start at the top (-PI/2) so the first pin sits above the others
      const angle = (2 * Math.PI * i) / group.length - Math.PI / 2;
      offsets[node.id] = [
        Math.round(radius * Math.cos(angle)),
        Math.round(radius * Math.sin(angle)),
      ];
    });
  });
  return offsets;
}
