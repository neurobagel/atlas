import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IntroBannerProps {
  title: string;
  text: string;
}

// An info admonition that can be collapsed to just its title, so returning visitors can get it
// out of the way. It starts expanded.
export function IntroBanner({ title, text }: IntroBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Alert
      severity="info"
      variant="outlined"
      className="mb-4"
      data-cy="intro"
      action={
        <IconButton
          size="small"
          color="inherit"
          aria-label={isExpanded ? 'Collapse introduction' : 'Expand introduction'}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          data-cy="intro-toggle"
        >
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      }
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderColor: 'grey.300',
        '& .MuiAlert-icon': { color: 'primary.main' },
        '& .MuiAlert-message': { flex: 1 },
      }}
    >
      <AlertTitle className={isExpanded ? undefined : '!mb-0'}>{title}</AlertTitle>
      <Collapse in={isExpanded}>
        <Typography>{text}</Typography>
      </Collapse>
    </Alert>
  );
}
