import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// Root container for the MainPage
export const MainRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}));

// Header section
export const MainHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '90px',
  background: 'none',
  padding: '58px 0 54px 0',
  [theme.breakpoints.down(1050)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    paddingTop: '44px',
  },
}));

// Header left (unused in JSX but included for completeness)
export const MainHeaderLeft = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down(1050)]: {
    textAlign: 'center',
    alignItems: 'center',
  },
}));

// Header title
export const MainHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  textAlign: 'center',
  fontWeight: 600,
  margin: '10px 0 16px 0',
  color: '#18191c',
}));

// Header description
export const MainDesc = styled(Typography)(({ theme }) => ({
  color: '#555e6c',
  textAlign: 'center',
  fontSize: '1rem',
  marginBottom: '42px',
}));

// Button group
export const MainButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '18px',
  marginBottom: '38px',
}));

// Primary button
export const PrimaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  borderRadius: '9px',
  padding: '14px 33px',
  cursor: 'pointer',
  outline: 'none',
  transition: 'box-shadow 0.13s, background 0.13s',
  margin: '0 3px',
  boxShadow: '0 1.5px 9px rgba(35, 40, 66, 0.88)',
  background: '#18191c',
  color: '#fff',
  '&:hover': {
    background: '#28292e',
  },
  [theme.breakpoints.down(600)]: {
    width: '100%',
  },
}));

// Secondary button
export const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',
  borderRadius: '9px',
  padding: '14px 33px',
  cursor: 'pointer',
  outline: 'none',
  transition: 'box-shadow 0.13s, background 0.13s',
  margin: '0 3px',
  boxShadow: '0 1.5px 9px rgba(10, 15, 40, 0.06)',
  background: '#f3f2f3',
  color: '#222',
  border: '1.2px solid #e6eaf1',
  '&:hover': {
    background: '#ebefff',
  },
}));

// Stats section
export const MainStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginTop: '22px',
  fontSize: '1rem',
  color: '#565d65',
  [theme.breakpoints.down(600)]: {
    flexDirection: 'column',
    gap: '12px',
  },
}));

// Green stat highlight
export const StatGreen = styled('span')({
  color: '#22c47c',
});

// Stat tag (unused but included)
export const StatTd = styled('span')({
  background: '#e6f6ef',
  color: '#4061ef',
  borderRadius: '6px',
  padding: '0 8px',
  fontWeight: 500,
});

// Header right
export const MainHeaderRight = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// How it works section
export const MainHow = styled(Container)(({ theme }) => ({
  background: 'aliceblue',
  marginBottom:'2rem',
  borderRadius: '2rem',
  padding: '36px 0 44px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// How it works description
export const MainHowDesc = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  margin: '11px 0 22px 0',
  [theme.breakpoints.down(600)]: {
    fontSize: '1rem',
  },
}));

// Cards container
export const MainCards = styled(Grid)(({ theme }) => ({
  display: 'flex',
  gap: '28px',
  justifyContent: 'center',
  marginTop: '18px',
  flexWrap: 'wrap',
  [theme.breakpoints.down(600)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '13px',
  },
}));

// Card
export const MainCard = styled(Card)(({ theme }) => ({
  background: '#fff',
  border: '1.1px solid #ededef',
  borderRadius: '20px',
  boxShadow: '0 2px 12px rgba(90, 105, 135, 0.09), 0 0px 1px rgba(60, 70, 80, 0.1)',
  padding: '32px 19px 27px 19px',
  minWidth: '220px',
  maxWidth: '270px',
  height: '250px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'box-shadow 0.15s',
  '&:hover': {
    boxShadow: '0 6px 26px rgba(61, 79, 125, 0.13)',
  },
  [theme.breakpoints.down(600)]: {
    minWidth: 'auto',
    maxWidth: '100%',
  },
}));

// Card icon
export const MainCardIcon = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: '13px',
}));

// Why section
export const MainWhy = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '90px',
  padding: '52px 0 44px 0',
  borderRadius:'2rem',
  backgroundColor:'aliceblue',
  [theme.breakpoints.down(1050)]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '35px',
  },
}));

// Why left (unused but included)
export const MainWhyLeft = styled(Box)(({ theme }) => ({
  maxWidth: '550px',
  [theme.breakpoints.down(1050)]: {
    textAlign: 'center',
    alignItems: 'center',
  },
}));

// Why description
export const WhyDesc = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  margin: '13px 0 20px 0',
  [theme.breakpoints.down(600)]: {
    fontSize: '1rem',
  },
}));

// Why list
export const WhyList = styled('ul')(({ theme }) => ({
  margin: '0 0 30px 19px',
  padding: 0,
  color: '#2b3136',
  fontSize: '1rem',
  lineHeight: 1.7,
  '& li': {
    marginBottom: '9px',
  },
}));

// Why button
export const WhyButton = styled(Button)(({ theme }) => ({
  background: '#18191c',
  color: '#fff',
  borderRadius: '8px',
  padding: '14px 34px',
  fontSize: '1rem',
  fontWeight: 500,
  border: 'none',
  marginTop: '19px',
  transition: 'background 0.12s',
  '&:hover': {
    background: '#28292e',
  },
  [theme.breakpoints.down(600)]: {
    width: '100%',
  },
}));

// Why right (unused but included)
export const MainWhyRight = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  minWidth: '260px',
});

// Safety card
export const SafetyCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  background: '#f7f7fa',
  border: '1.1px solid #ececf2',
  borderRadius: '16px',
  padding: '28px 20px',
  minWidth: '223px',
  maxWidth: '290px',
  boxShadow: '0 1.2px 6px rgba(44, 62, 80, 0.06)',
  [theme.breakpoints.down(600)]: {
    minWidth: 'auto',
    maxWidth: '100%',
  },
}));

// Safety icon (unused but included)
export const SafetyIcon = styled(Box)({
  fontSize: '2rem',
  color: '#4061ef',
  alignSelf: 'flex-start',
});

// Safety rating (unused but included)
export const SafetyRating = styled(Typography)({
  marginTop: '12px',
  color: '#22c47c',
});

// Call to action section
export const MainCta = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '50px 0 58px 0',
  [theme.breakpoints.down(600)]: {
    padding: '32px 0',
  },
}));
