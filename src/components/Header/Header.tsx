import type { ReactNode } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddLinkIcon from '@mui/icons-material/AddLink';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import logo from '~/assets/logos/neurobagel.png';

const CONNECT_URL =
  'https://neurobagel.org/user_guide/production_deployment/#making-your-node-publicly-discoverable';

interface HeaderLinkProps {
  label: string;
  href: string;
  dataCy: string;
  children: ReactNode;
}

function HeaderLink({ label, href, dataCy, children }: HeaderLinkProps) {
  return (
    <Tooltip title={label}>
      <IconButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        data-cy={dataCy}
        className="p-1 sm:p-2"
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

interface HeaderProps {
  onOpenGlossary: () => void;
}

export function Header({ onOpenGlossary }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-24 bg-white" data-cy="header">
      <div className="mx-auto h-full max-w-screen-2xl px-4">
        <Toolbar disableGutters className="h-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center">
              <img src={logo} alt="Neurobagel logo" height="60" />
              {/* On phones the title is smaller and the tagline is hidden, so everything fits in the fixed
                  header height next to the logo and the buttons */}
              <div className="ml-2 min-w-0 sm:ml-4">
                <Typography
                  variant="h5"
                  component="h1"
                  className="text-lg leading-tight sm:text-2xl"
                >
                  Neurobagel Atlas
                </Typography>
                <Typography className="hidden text-gray-500 sm:block">
                  Explore the communities and nodes of the Neurobagel network
                </Typography>
              </div>
            </div>
            <div className="flex shrink-0 items-center">
              <HeaderLink
                label="About Neurobagel"
                href="https://neurobagel.org"
                dataCy="header-about"
              >
                <MenuBookIcon />
              </HeaderLink>
              <HeaderLink
                label="GitHub"
                href="https://github.com/neurobagel"
                dataCy="header-github"
              >
                <GitHubIcon />
              </HeaderLink>
              {/* The glossary opens a dialog on this page, so it is a button, not a link */}
              <Tooltip title="Glossary">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onOpenGlossary}
                  aria-label="Glossary"
                  data-cy="header-glossary"
                  className="ml-1 min-w-0 px-2 font-bold sm:ml-2 sm:px-4"
                >
                  {/* Only an icon on phones, where the label does not fit next to the title */}
                  <HelpOutlineIcon className="sm:hidden" />
                  <span className="hidden sm:inline">Glossary</span>
                </Button>
              </Tooltip>
              <Tooltip title="Connect a node">
                <Button
                  variant="contained"
                  color="primary"
                  href={CONNECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect a node"
                  data-cy="header-connect"
                  className="ml-1 min-w-0 px-2 font-bold sm:ml-2 sm:px-4"
                >
                  {/* Only an icon on phones, where the label does not fit next to the title */}
                  <AddLinkIcon className="sm:hidden" />
                  <span className="hidden sm:inline">Connect a Node</span>
                </Button>
              </Tooltip>
            </div>
          </div>
        </Toolbar>
      </div>
    </header>
  );
}
