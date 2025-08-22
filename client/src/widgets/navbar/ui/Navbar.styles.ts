import { AppBar, Box, Button, InputBase, MenuItem, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

// StyledAppBar remains fixed but we’ll account for its height in the content
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'cyan',
  color: '#111827',
  borderBottom: '1px solid #e5e7eb',
  paddingTop: '8px',
  paddingBottom: '8px',
  width: '100%',
  maxWidth: '100vw',
  margin: 0,
  boxSizing: 'border-box',
  position: 'fixed', // Keep fixed for top alignment
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  // Define a CSS variable for navbar height to use in content padding
  '--navbar-height': '64px', // Adjust based on your navbar’s actual height
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  maxWidth: 'lg',
  width: '100%',
  margin: '0 auto',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// Add a ContentContainer to wrap page content and offset it by navbar height
export const ContentContainer = styled(Box)({
  paddingTop: 'var(--navbar-height)', // Use the CSS variable defined in StyledAppBar
  boxSizing: 'border-box',
  minHeight: '100vh', // Ensure content takes full height
});

export const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
});

export const LogoIconContainer = styled(Box)({
  width: '36px',
  height: '36px',
  backgroundColor: '#3b82f6',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
});

export const MenuContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '4px 16px',
  width: '300px',
  '&:focus-within': {
    boxShadow: '0 0 0 2px #bfdbfe',
  },
});

export const SearchInput = styled(InputBase)({
  width: '100%',
  '& input': {
    padding: '8px 0',
  },
});

export const ProfileContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#f3f4f6',
  },
});

export const ProfileIconContainer = styled(Box)({
  width: '32px',
  height: '32px',
  backgroundColor: '#e0f2fe',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
});

export const ProfileBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
});

export const ProfileIconBox = styled(Box)({
  width: '40px',
  height: '40px',
  backgroundColor: '#e0f2fe',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
});

export const CreateTaskButton = styled(Button)({
  backgroundColor: '#3b82f6',
  marginBottom: '16px',
  '&:hover': {
    backgroundColor: '#2563eb',
  },
});

export const AuthButton = styled(Button)({
  color: '#111827',
  borderColor: '#d1d5db',
  '&:hover': {
    borderColor: '#9ca3af',
  },
});

export const JoinButton = styled(Button)({
  backgroundColor: '#3b82f6',
  '&:hover': {
    backgroundColor: '#2563eb',
  },
});

export const LogoutButton = styled(Button)({
  color: '#ef4444',
  '&:hover': {
    backgroundColor: '#fee2e2',
  },
});

export const DrawerPaper = styled(Box)({
  width: '320px',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  borderLeft: '1px solid #e2e8f0',
});

export const DrawerMenuItem = styled(MenuItem)({
  borderRadius: '8px',
  marginBottom: '4px',
  '&:hover': {
    backgroundColor: '#f1f5f9',
  },
  color: '#111827',
  '&:last-child': {
    color: '#ef4444',
  },
});
