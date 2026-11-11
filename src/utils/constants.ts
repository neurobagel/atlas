import asmqLogo from '~/assets/logos/asmq.png';
import enigmaLogo from '~/assets/logos/enigma.png';
import enigmaAddictionLogo from '~/assets/logos/enigma-addiction.png';
import neurobagelLogo from '~/assets/logos/neurobagel.png';
import nichyLogo from '~/assets/logos/nichy.png';
import parkinsonNLLogo from '~/assets/logos/parkinson-nl.svg';
import scandLogo from '~/assets/logos/scand.jpg';
import trr379Logo from '~/assets/logos/trr379.png';
import type { Community, CommunityNode, CommunityStats } from './types';

export const COMMUNITIES: Community[] = [
  {
    id: 'neurobagel',
    name: 'Neurobagel',
    status: 'active',
    logoUrl: neurobagelLogo,
    queryToolUrl: 'https://query.neurobagel.org',
    federationApiUrl: 'https://federate.neurobagel.org/',
  },
  {
    id: 'enigma-pd',
    name: 'ENIGMA-PD',
    status: 'active',
    logoUrl: enigmaLogo,
    contact: { name: 'Ysbrand van der Werf' },
    queryToolUrl: 'https://enigma.neurobagel.org/?node=All',
    federationApiUrl: 'https://enigma.neurobagel.org/federate/',
  },
  {
    id: 'scand',
    name: 'SCanD',
    fullName: 'Schizophrenia Canadian Neuroimaging Database',
    status: 'active',
    logoUrl: scandLogo,
    contact: { name: 'Erin Dickie' },
    queryToolUrl: 'https://scand.neurobagel.org/?node=All',
    federationApiUrl: 'https://scand.neurobagel.org/federate/',
  },
  {
    id: 'asmq',
    name: 'ASMQ',
    fullName: 'Alliance en santé mentale du Québec',
    status: 'active',
    logoUrl: asmqLogo,
    contact: { name: 'Vincent Taschereau-Dumouchel' },
    queryToolUrl: 'https://neurobagel-alliancefrqs.douglasneuroinformatics.ca/?node=All',
    federationApiUrl: 'https://neurobagel-alliancefrqs.douglasneuroinformatics.ca/federate/',
  },
  {
    id: 'npc',
    name: 'NPC',
    fullName: 'Netherlands Parkinson Cohort',
    status: 'active',
    logoUrl: parkinsonNLLogo,
    contact: { name: "Emile d'Angremont" },
    queryToolUrl: 'https://npc.neurobagel.org/',
    federationApiUrl: 'https://npc.neurobagel.org/federate/',
  },
  {
    id: 'neuro-ad',
    name: 'NEURO-AD',
    fullName: "NEURO Alzheimer's Disease",
    status: 'onboarding',
    contact: { name: 'Baptiste Couvy-Duchesne' },
    // TODO(confirm): projectedStats
  },
  {
    id: 'mnd-network',
    name: 'MND Network',
    fullName: 'Motor Neuron Disease Network',
    status: 'onboarding',
    contact: { name: 'Sicong Tu' },
    // TODO(confirm): projectedStats
  },
  {
    id: 'trr379',
    name: 'TRR379',
    fullName: 'Transregional Collaborative Research Center 379',
    status: 'onboarding',
    logoUrl: trr379Logo,
    contact: { name: 'Michael Hanke' },
    // TODO(confirm): projectedStats
  },
  {
    id: 'enigma-tremor',
    name: 'ENIGMA-Tremor',
    status: 'onboarding',
    logoUrl: enigmaLogo,
    contact: { name: 'Max Laansma' },
    // TODO(confirm): projectedStats
  },
  {
    id: 'enigma-addiction',
    name: 'ENIGMA-AD',
    fullName: 'ENIGMA Addiction',
    status: 'onboarding',
    logoUrl: enigmaAddictionLogo,
    contact: { name: 'Anthony Juliano' },
    // TODO(confirm): projectedStats
  },
  {
    id: 'nichy',
    name: 'NICHY',
    fullName: 'NeuroImaging Consortium in Central Disorders of Hypersomnolence (Nichy)',
    status: 'onboarding',
    logoUrl: nichyLogo,
    contact: { name: 'Ysbrand van der Werf' },
    // TODO(confirm): projectedStats
  },
];

// Only active communities have known nodes. Coordinates are city-level.
export const NODES: CommunityNode[] = [
  {
    id: 'openneuro',
    name: 'OpenNeuro',
    communityId: 'neurobagel',
    city: 'Stanford',
    country: 'USA',
    lat: 37.4275,
    lng: -122.1697,
  },
  {
    id: 'ebrains',
    name: 'EBRAINS',
    communityId: 'neurobagel',
    city: 'Brussels',
    country: 'Belgium',
    lat: 50.8503,
    lng: 4.3517,
  },
  {
    id: 'anc',
    name: 'ANC (Austrian NeuroCloud)',
    communityId: 'neurobagel',
    city: 'Salzburg',
    country: 'Austria',
    lat: 47.8095,
    lng: 13.055,
  },
  {
    id: 'indi',
    name: 'INDI',
    communityId: 'neurobagel',
    city: 'New York City',
    country: 'USA',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 'shanoir',
    name: 'Shanoir',
    communityId: 'neurobagel',
    city: 'Rennes',
    country: 'France',
    lat: 48.1173,
    lng: -1.6778,
  },
  {
    id: 'publicneuro',
    name: 'PublicnEUro',
    communityId: 'neurobagel',
    city: 'Copenhagen',
    country: 'Denmark',
    lat: 55.6761,
    lng: 12.5683,
  },
  {
    id: 'obi',
    name: 'OBI (Ontario Brain Institute)',
    communityId: 'neurobagel',
    city: 'Toronto',
    country: 'Canada',
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: 'tosi-neuro',
    name: 'TOSI Neuro',
    communityId: 'neurobagel',
    city: 'Montreal',
    country: 'Canada',
    lat: 45.5017,
    lng: -73.5673,
  },
  {
    id: 'amsterdam-umc',
    name: 'Amsterdam UMC',
    communityId: 'enigma-pd',
    city: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    id: 'umc-groningen',
    name: 'UMC Groningen',
    communityId: 'enigma-pd',
    city: 'Groningen',
    country: 'Netherlands',
    lat: 53.2194,
    lng: 6.5665,
  },
  {
    id: 'radboud-umc',
    name: 'Radboud UMC',
    communityId: 'enigma-pd',
    city: 'Nijmegen',
    country: 'Netherlands',
    lat: 51.8126,
    lng: 5.8372,
  },
  {
    id: 'mcgill',
    name: 'McGill',
    communityId: 'enigma-pd',
    city: 'Montreal',
    country: 'Canada',
    lat: 45.5017,
    lng: -73.5673,
  },
  {
    id: 'camh',
    name: 'CAMH',
    communityId: 'scand',
    city: 'Toronto',
    country: 'Canada',
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: 'asmq',
    name: 'ASMQ',
    communityId: 'asmq',
    city: 'Montreal',
    country: 'Canada',
    lat: 45.5017,
    lng: -73.5673,
  },
  {
    id: 'duparc',
    name: 'DUPARC (Dutch Parkinson Cohort)',
    communityId: 'npc',
    city: 'Groningen',
    country: 'Netherlands',
    lat: 53.2194,
    lng: 6.5665,
  },
  {
    // TODO(confirm): PPP is managed in Nijmegen
    id: 'ppp',
    name: 'PPP (Personalized Parkinson Project)',
    communityId: 'npc',
    city: 'Nijmegen',
    country: 'Netherlands',
    lat: 51.8126,
    lng: 5.8372,
  },
];

// TODO: replace HARDCODED_STATS and COMMUNITY_STATS with live stats fetched from each
// community's federation API.
// Snapshot of the federation API summary stats (Nov 2026). Subjects are total subjects
// (catalog-level and record-level), not just matching ones.
const HARDCODED_STATS: Record<string, { subjects: number; datasets: number }> = {
  neurobagel: { subjects: 114528, datasets: 2052 },
  'enigma-pd': { subjects: 2151, datasets: 12 },
  scand: { subjects: 1190, datasets: 7 },
  asmq: { subjects: 2849, datasets: 5 },
  npc: { subjects: 691, datasets: 2 },
};

// Node counts come from NODES so they always match the card's node list and the map pins
export const COMMUNITY_STATS: Record<string, CommunityStats> = Object.fromEntries(
  Object.entries(HARDCODED_STATS).map(([communityId, { subjects, datasets }]) => [
    communityId,
    {
      status: 'success',
      subjects,
      datasets,
      nodes: NODES.filter((node) => node.communityId === communityId).length,
    },
  ])
);

export const INTRO_TEXT =
  'Neurobagel enables neuroscience research communities ' +
  'to make their data discoverable without directly sharing or uploading data to a central place. ' +
  'Within a community, ' +
  'each data site hosts their own local node and ' +
  'keeps control of their data, ' +
  'while standardized annotations allow data from different sites ' +
  'to be queried together. ' +
  'The Neurobagel Atlas offers an overview of these communities in one place: ' +
  'see where member nodes are, ' +
  'how much data they hold, ' +
  "and easily access each community's portal to search available data at the subject level.";

export const GLOSSARY: { term: string; definition: string }[] = [
  {
    term: 'Node',
    definition:
      'A collection of datasets (one or more) owned, hosted, and/or made available by a research team, institution, or data provider',
  },
  {
    term: 'Community',
    definition:
      'A collection of nodes (one or more) connected by a shared research focus, consortium, or other collaborative initiative.',
  },
  {
    term: 'Active (community)',
    definition: 'Community is currently online and accepting queries through a dedicated portal',
  },
  {
    term: 'Onboarding (community)',
    definition:
      'A local deployment of the portal exists and has been tested with data, and a production deployment is underway but not yet available publicly.',
  },
];
