import { WorldMap } from '~/components/WorldMap';
import type { CommunityNode } from '~/utils/types';

const node = (id: string, communityId: string, lat: number, lng: number): CommunityNode => ({
  id,
  name: id,
  communityId,
  city: 'City',
  country: 'Country',
  lat,
  lng,
});

// Three co-located nodes in two communities, plus one elsewhere
const nodes: CommunityNode[] = [
  node('a1', 'alpha', 45.5, -73.6),
  node('a2', 'alpha', 45.5, -73.6),
  node('b1', 'beta', 45.5, -73.6),
  node('b2', 'beta', 52.4, 4.9),
];
const allVisible = ['alpha', 'beta'];

const pinSelector = (id: string) => `[data-cy="map-pin-${id}"]`;

function mountMap(selected: string | null = null, visible: string[] = allVisible) {
  // WorldMap fills its parent (height: 100%) and Leaflet needs a container with a real height
  // to render. The test root has none, so without this wrapper the map would be 0px tall.
  cy.mount(
    <div style={{ height: 500, width: 800 }}>
      <WorldMap nodes={nodes} selectedCommunityId={selected} visibleCommunityIds={visible} />
    </div>
  );
}

describe('WorldMap', () => {
  beforeEach(() => {
    cy.intercept('https://tile.openstreetmap.org/**', { statusCode: 204 });
  });

  it('should render one pin per node', () => {
    mountMap();
    cy.get('[data-cy^="map-pin-"]').should('have.length', nodes.length);
  });

  it('should show all pins as default when nothing is selected and all communities are visible', () => {
    mountMap();
    cy.get('[data-cy^="map-pin-"]').each(($el) => {
      expect($el).to.have.attr('data-state', 'default');
    });
  });

  it('should dim pins of communities outside the visible communities', () => {
    mountMap(null, ['alpha']);
    cy.get(pinSelector('a1')).should('have.attr', 'data-state', 'default');
    cy.get(pinSelector('b1')).should('have.attr', 'data-state', 'dimmed');
    cy.get(pinSelector('b2')).should('have.attr', 'data-state', 'dimmed');
  });

  it('should highlight the selected community and dim all others', () => {
    mountMap('beta');
    cy.get(pinSelector('b1')).should('have.attr', 'data-state', 'highlighted');
    cy.get(pinSelector('b2')).should('have.attr', 'data-state', 'highlighted');
    cy.get(pinSelector('a1')).should('have.attr', 'data-state', 'dimmed');
    cy.get(pinSelector('a2')).should('have.attr', 'data-state', 'dimmed');
  });

  it('should highlight the selected community even when it is filtered out', () => {
    mountMap('beta', ['alpha']);
    cy.get(pinSelector('b1')).should('have.attr', 'data-state', 'highlighted');
    cy.get(pinSelector('a1')).should('have.attr', 'data-state', 'dimmed');
  });
});
