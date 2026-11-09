import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { CommunityCard } from '~/components/CommunityCard';
import { WorldMap } from '~/components/WorldMap';
import { COMMUNITIES, COMMUNITY_STATS, NODES } from '~/utils/constants';

// filtering to be implemented later, for now every community is visible
const ALL_COMMUNITY_IDS = COMMUNITIES.map((community) => community.id);

function App() {
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);

  // Clicking the selected card again clears the selection
  const handleSelect = (communityId: string) =>
    setSelectedCommunityId((currentId) => (currentId === communityId ? null : communityId));

  return (
    <main className="mx-auto max-w-[120rem] p-4">
      <Typography variant="h4" component="h1" className="mb-4">
        Neurobagel Atlas
      </Typography>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(20rem,26rem)_1fr]">
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
        {/* TODO: the map column is taller than the world map is wide, which leaves grey bands above
            and below the map. Revisit the map height once the summary bar and the other
            layout pieces are in place. */}
        <div className="h-[480px] lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]" data-cy="map-column">
          <WorldMap
            nodes={NODES}
            selectedCommunityId={selectedCommunityId}
            visibleCommunityIds={ALL_COMMUNITY_IDS}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
