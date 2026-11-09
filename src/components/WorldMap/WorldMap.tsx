import { useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useTheme } from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import { getPinOffsets, getPinState } from '~/utils/map';
import type { PinState } from '~/utils/map';
import type { CommunityNode } from '~/utils/types';

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const FALLBACK_CENTER: [number, number] = [20, 0];
const FALLBACK_ZOOM = 2;

const PIN_SIZE = { default: 12, highlighted: 15, dimmed: 12 } satisfies Record<PinState, number>;

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
    const [dx, dy] = offsets[node.id];
    const style = [
      'box-sizing:border-box',
      `width:${size}px`,
      `height:${size}px`,
      'border-radius:50%',
      `background:${state === 'dimmed' ? theme.palette.grey[700] : theme.palette.primary.main}`,
      'border:2px solid #fff',
      'box-shadow:0 1px 3px rgba(0,0,0,0.4)',
      `opacity:${state === 'dimmed' ? 0.3 : 1}`,
    ].join(';');
    return L.divIcon({
      // An empty className replaces Leaflet's default white box icon style
      className: '',
      html: `<div data-cy="map-pin-${node.id}" data-state="${state}" style="${style}"></div>`,
      iconSize: [size, size],
      // Shifting the anchor moves the pin by a fixed number of pixels at any zoom level
      iconAnchor: [size / 2 - dx, size / 2 - dy],
    });
  };

  const viewProps =
    nodes.length > 0
      ? {
          bounds: L.latLngBounds(nodes.map((node) => [node.lat, node.lng] as [number, number])),
          boundsOptions: { padding: [32, 32] as [number, number] },
        }
      : { center: FALLBACK_CENTER, zoom: FALLBACK_ZOOM };

  return (
    <div className="h-full w-full" data-cy="world-map" role="img">
      <MapContainer
        {...viewProps}
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
