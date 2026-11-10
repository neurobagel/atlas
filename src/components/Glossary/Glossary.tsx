import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { GLOSSARY } from '~/utils/constants';

interface GlossaryProps {
  open: boolean;
  onClose: () => void;
}

// "Active (community)" becomes "active-community"
function toSlug(term: string) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function Glossary({ open, onClose }: GlossaryProps) {
  // Full-screen below Tailwind's sm breakpoint (640px), which MUI's own sm (600px) does not match
  const isPhone = !useMediaQuery('(min-width: 640px)');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isPhone}
      fullWidth
      maxWidth="sm"
      aria-labelledby="glossary-title"
      data-cy="glossary"
    >
      <DialogTitle id="glossary-title" className="flex items-center justify-between">
        Glossary
        <IconButton onClick={onClose} aria-label="Close glossary" data-cy="glossary-close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <dl className="m-0">
          {GLOSSARY.map(({ term, definition }) => (
            <div key={term} className="mb-4 last:mb-0" data-cy={`glossary-term-${toSlug(term)}`}>
              <Typography component="dt" className="font-bold">
                {term}
              </Typography>
              <Typography component="dd" className="m-0">
                {definition}
              </Typography>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}
