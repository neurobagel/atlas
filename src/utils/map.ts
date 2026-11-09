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

/**
 * Computes a pixel offset for each node so that nodes sharing the exact same location
 * are spread out around that location instead of being drawn on top of each other.
 *
 * @remarks
 * Nodes are first grouped by their coordinates. A node alone at its location gets no offset.
 * For a group of n nodes, each node is placed on a circle around the real location, evenly
 * spaced (360° / n apart), with the first one at the top. The offsets are in screen pixels
 * (not degrees) so the spacing looks the same at every zoom level.
 *
 * @example
 * Three nodes in Montreal (radius 10) and one in Toronto:
 * `{ a: [0, -10], b: [9, 5], c: [-9, 5], d: [0, 0] }`, where a, b and c are in Montreal.
 *
 * @param nodes - The nodes to place
 * @param radius - Distance in pixels between each node of a group and the group's location
 * @returns The `[dx, dy]` pixel offset for each node id, where positive dx is right and
 * positive dy is down
 */
export function getPinOffsets(
  nodes: CommunityNode[],
  radius = PIN_FAN_RADIUS
): Record<string, [number, number]> {
  // Group the nodes by location. Nodes with identical coordinates get the same key,
  // e.g. "45.5,-73.6", so each group holds the nodes that would otherwise overlap.
  const groups = new Map<string, CommunityNode[]>();
  nodes.forEach((node) => {
    const key = `${node.lat},${node.lng}`;
    const group = groups.get(key);
    if (group) {
      group.push(node);
    } else {
      groups.set(key, [node]);
    }
  });

  // Give every node in a group its own spot on the circle
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

/**
 * Computes the Leaflet icon anchor that draws a pin shifted by a pixel offset.
 *
 * @remarks
 * The anchor is the point of the icon that Leaflet puts on the node's location. Anchoring at
 * the icon's centre keeps the pin on the location, and moving the anchor the opposite way
 * moves the pin: an anchor 10px above the centre draws the pin 10px below the location.
 *
 * @param size - Width and height of the pin icon in pixels
 * @param offset - The `[dx, dy]` pixel offset the pin should be drawn at
 * @returns The `[x, y]` anchor inside the icon, measured from its top-left corner
 */
export function getPinAnchor(size: number, [dx, dy]: [number, number]): [number, number] {
  return [size / 2 - dx, size / 2 - dy];
}
