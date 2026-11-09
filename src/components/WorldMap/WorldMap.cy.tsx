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

const pin = (id: string) => `[data-cy="map-pin-${id}"]`;

function mountMap(selected: string | null = null, visible: string[] = allVisible) {
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

  it('should render co-located nodes at distinct screen positions', () => {
    mountMap();

    // a1, a2 and b1 have identical coordinates. Without the fan-out they would be
    // drawn on top of each other, so we check that each one ends up somewhere different.
    cy.get(`${pin('a1')}, ${pin('a2')}, ${pin('b1')}`).should(($pins) => {
      // Step 1: ask the browser for each pin's position on screen as "x,y" text.
      const positions = $pins.toArray().map((el) => {
        const box = el.getBoundingClientRect();
        // box.x and box.y are the pin's top-left corner. Adding half the width and height
        // moves to the middle of the pin, which is where the pin "is".
        const middleX = Math.round(box.x + box.width / 2);
        const middleY = Math.round(box.y + box.height / 2);
        return `${middleX},${middleY}`;
      });

      // Step 2: remove repeats. If two pins share a spot, the list gets shorter.
      const uniquePositions = new Set(positions);

      // Step 3: three pins and three different positions means none are stacked.
      expect(uniquePositions.size).to.equal(3);
    });
  });

  it('should show all pins as default when nothing is selected and all communities are visible', () => {
    mountMap();
    cy.get('[data-cy^="map-pin-"]').each(($el) => {
      expect($el).to.have.attr('data-state', 'default');
    });
  });

  it('should dim pins of communities outside the visible communities', () => {
    mountMap(null, ['alpha']);
    cy.get(pin('a1')).should('have.attr', 'data-state', 'default');
    cy.get(pin('b1')).should('have.attr', 'data-state', 'dimmed');
    cy.get(pin('b2')).should('have.attr', 'data-state', 'dimmed');
  });

  it('should highlight the selected community and dim all others', () => {
    mountMap('beta');
    cy.get(pin('b1')).should('have.attr', 'data-state', 'highlighted');
    cy.get(pin('b2')).should('have.attr', 'data-state', 'highlighted');
    cy.get(pin('a1')).should('have.attr', 'data-state', 'dimmed');
    cy.get(pin('a2')).should('have.attr', 'data-state', 'dimmed');
  });

  it('should highlight the selected community even when it is filtered out', () => {
    mountMap('beta', ['alpha']);
    cy.get(pin('b1')).should('have.attr', 'data-state', 'highlighted');
    cy.get(pin('a1')).should('have.attr', 'data-state', 'dimmed');
  });
});
