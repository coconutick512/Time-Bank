import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'lightgrey',
  fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
  color: '#18191c',
  width: '100vw',
  margin: 0,
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  paddingTop: '20px'
}));

export const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto 24px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '48px',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '32px',
  },
}));

export const FooterSection = styled(Box)({
  flex: '1 1 200px',
  minWidth: '180px',
});

export const FooterTitle = styled(Typography)({
  fontSize: '2.4rem',
  fontWeight: 700,
  marginBottom: '14px',
  lineHeight: 1.1,
});

export const BlueSpan = styled('span')({
  color: '#3662ff',
});

export const FooterDesc = styled(Typography)({
  fontSize: '1.1rem',
  color: '#555f6d',
  lineHeight: 1.45,
  maxWidth: '300px',
  marginBottom: '16px',
});

export const FooterSocials = styled(Box)({
  display: 'flex',
  gap: '18px',
  flexWrap: 'wrap',
});

export const FooterLinks = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const FooterLinkItem = styled('li')({
  marginBottom: '10px',
});

export const FooterLinkButton = styled(Button)({
  background: 'transparent',
  color: '#3662ff',
  fontSize: '1rem',
  padding: 0,
  fontWeight: 500,
  textTransform: 'none',
  textAlign: 'left',
  '&:hover': {
    color: '#1e40af',
    background: 'transparent',
  },
});

export const FooterContacts = styled(Box)({
  '& p': {
    margin: '6px 0',
    fontSize: '1rem',
    color: '#555f6d',
  },
});

export const FooterStats = styled(Box)({
  marginTop: '24px',
  display: 'flex',
  gap: '24px',
  fontSize: '1.05rem',
  color: '#555f6d',
  flexWrap: 'wrap',
});

export const FooterStatBold = styled('b')({
  fontWeight: 700,
  marginRight: '6px',
});

export const StatGreen = styled('b')({
  color: '#22c55e',
});

export const FooterBottom = styled(Box)({
  paddingTop: '20px',
  backgroundColor: 'lightgrey',
  width: '100vw',
  margin: 0,
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
});

export const FooterBottomContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  paddingBottom:"2rem",
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '12px',
  fontSize: '0.95rem',
  color: '#555f6d',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'center',
  },
}));

export const FooterLegalButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#555f6d',
  fontSize: '0.95rem',
  padding: 0,
  fontWeight: 400,
  textTransform: 'none',
  marginLeft: '16px',
  '&:hover': {
    color: '#222',
    background: 'transparent',
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));