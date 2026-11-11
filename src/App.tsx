import { useState } from 'react';
import { CommunityCard } from '~/components/CommunityCard';
import { Glossary } from '~/components/Glossary';
import { Header } from '~/components/Header';
import { IntroBanner } from '~/components/IntroBanner';
import { SummaryBar } from '~/components/SummaryBar';
import { WorldMap } from '~/components/WorldMap';
import { COMMUNITIES, COMMUNITY_STATS, INTRO_TEXT, NODES } from '~/utils/constants';
import { getSummaryStats } from '~/utils/summary';

// filtering to be implemented later, for now every community is visible
const ALL_COMMUNITY_IDS = COMMUNITIES.map((community) => community.id);

// The totals are fixed for now; they will follow the filters once filtering is added
const SUMMARY = getSummaryStats(COMMUNITIES, NODES, COMMUNITY_STATS);

// Supported screen sizes: from 375px (the smallest phones) up to 1536px, where the content stops
// growing and is centred (max-w-screen-2xl). The breakpoints are Tailwind's defaults.
//   mobile  375px and up:  single column, with the summary bar and a square map under the cards
//                          (the summary bar is 2x2 here, and one row from sm: 640px)
//   desktop 1024px and up: two columns (lg:), with a sticky map column next to the cards
function App() {
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  // Clicking the selected card again clears the selection
  const handleSelect = (communityId: string) =>
    setSelectedCommunityId((currentId) => (currentId === communityId ? null : communityId));

  return (
    <>
      <Header onOpenGlossary={() => setGlossaryOpen(true)} />
      <Glossary open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <main className="mx-auto max-w-screen-2xl p-4">
        <IntroBanner title="About the Neurobagel Atlas" text={INTRO_TEXT} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[24rem_1fr]">
          <div className="flex flex-col gap-4" data-cy="community-list">
            {COMMUNITIES.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                nodes={NODES.filter((node) => node.communityId === community.id)}
                stats={COMMUNITY_STATS[community.id]}
                isSelected={community.id === selectedCommunityId}
                onSelect={handleSelect}
              />
            ))}
          </div>
          {/* On large screens the column sticks below the header (6rem high) and is as tall as the
              rest of the viewport: 100vh minus the header and 1rem of space above and below */}
          <div
            className="flex flex-col gap-4 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]"
            data-cy="map-column"
          >
            <SummaryBar {...SUMMARY} />
            {/* Square on small screens so the map has about the shape of the world, and it fills the
              rest of the column on large screens. isolate keeps the map's own z-indexes (Leaflet uses
              up to 1000) below the header. */}
            <div className="isolate aspect-square min-h-0 lg:aspect-auto lg:flex-1">
              <WorldMap
                nodes={NODES}
                selectedCommunityId={selectedCommunityId}
                visibleCommunityIds={ALL_COMMUNITY_IDS}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
