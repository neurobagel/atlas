import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface SummaryBarProps {
  subjects: number;
  nodes: number;
  communities: number;
  countries: number;
}

export function SummaryBar({ subjects, nodes, communities, countries }: SummaryBarProps) {
  const items = [
    { key: 'subjects', label: 'Total subjects', value: subjects },
    { key: 'nodes', label: 'Federated nodes', value: nodes },
    { key: 'communities', label: 'Communities', value: communities },
    { key: 'countries', label: 'Countries', value: countries },
  ];

  return (
    <Paper
      variant="outlined"
      className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4"
      data-cy="summary-bar"
    >
      {items.map(({ key, label, value }) => (
        <div key={key}>
          <Typography variant="h5" component="div" className="font-bold" data-cy={`summary-${key}`}>
            {value.toLocaleString('en-US')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </div>
      ))}
    </Paper>
  );
}
