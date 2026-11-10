import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import { getPinAnchor, getPinOffsets, getPinState } from '~/utils/map';
import type { PinState } from '~/utils/map';
import type { CommunityNode } from '~/utils/types';

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// The whole world, without Antarctica and the far north which have no nodes.
// Fitting to fixed bounds (not to the nodes) keeps the view the same whatever the data is,
// and an empty node list can't produce invalid bounds.
const WORLD_BOUNDS = L.latLngBounds([-60, -180], [85, 180]);

// The edges of the map tiles. Keeping the view inside them avoids a grey band where there are no
// tiles (above latitude 85): when the container is taller than the world bounds, the extra
// space is filled with more map at the bottom instead.
const TILE_EDGES = L.latLngBounds([-85.05, -180], [85.05, 180]);

const PIN_SIZE = { default: 12, highlighted: 15, dimmed: 12 } satisfies Record<PinState, number>;

// Preflight is off, so the border style has to be set explicitly
const PIN_CLASSES = 'box-border rounded-full border-2 border-solid border-white shadow-md';

interface WorldMapProps {
  nodes: CommunityNode[];
  selectedCommunityId: string | null;
  visibleCommunityIds: string[];
}

export function WorldMap({ nodes, selectedCommunityId, visibleCommunityIds }: WorldMapProps) {
  const theme = useTheme();
  const offsets = useMemo(() => getPinOffsets(nodes), [nodes]);

  const createIcon = (node: CommunityNode, state: PinState) => {
    const size = PIN_SIZE[state];
    // Only the values that depend on the state or the MUI theme are inline;
    // the rest is Tailwind. Leaflet needs the icon as an HTML string, so React props can't be used.
    const background = state === 'dimmed' ? theme.palette.grey[700] : theme.palette.primary.main;
    const style = `width:${size}px;height:${size}px;background:${background}`;
    const opacity = state === 'dimmed' ? 'opacity-30' : 'opacity-100';
    return L.divIcon({
      // divIcon adds the class "leaflet-div-icon" by default, which gives every marker a white
      // background and a grey border. An empty className drops it, so only our pin styles apply.
      className: '',
      html: `<div data-cy="map-pin-${node.id}" data-state="${state}" class="${PIN_CLASSES} ${opacity}" style="${style}"></div>`,
      iconSize: [size, size],
      // Shifting the anchor moves the pin by a fixed number of pixels at any zoom level
      iconAnchor: getPinAnchor(size, offsets[node.id]),
    });
  };

  return (
    <div className="h-full w-full" data-cy="world-map" role="img">
      <MapContainer
        bounds={WORLD_BOUNDS}
        maxBounds={TILE_EDGES}
        // Fractional zoom so the world fits the container width exactly instead of snapping to a
        // whole zoom level, which can leave the map much smaller than its container
        zoomSnap={0}
        className="h-full w-full"
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
        {nodes.map((node) => {
          const state = getPinState(node.communityId, selectedCommunityId, visibleCommunityIds);
          return (
            <Marker
              key={node.id}
              position={[node.lat, node.lng]}
              icon={createIcon(node, state)}
              interactive={false}
              keyboard={false}
              zIndexOffset={state === 'highlighted' ? 1000 : 0}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
