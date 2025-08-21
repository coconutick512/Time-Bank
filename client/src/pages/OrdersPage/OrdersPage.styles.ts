import { Box, Button, IconButton, Typography, TextField, FormControl, Alert, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Root container for the OrdersPage
export const OrdersRoot = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '36px auto',
  padding: '24px 20px',
  fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
  color: '#18191c',
  backgroundColor: 'transparent',
  [theme.breakpoints.down(600)]: {
    padding: '20px 12px',
  },
}));

// Header section
export const OrdersHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '30px',
  [theme.breakpoints.down(980)]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

// Header title
export const OrdersTitle = styled(Typography)({
  fontSize: '2.25rem',
  fontWeight: 600,
});

// Actions panel
export const OrdersActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  [theme.breakpoints.down(980)]: {
    justifyContent: 'flex-start',
  },
}));

// Primary button
export const OrdersButtonPrimary = styled(Button)({
  backgroundColor: '#3b82f6',
  color: 'white',
  fontWeight: 600,
  borderRadius: '10px',
  padding: '10px 26px',
  transition: 'background-color 0.15s ease',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#2563eb',
  },
});

// Icon button
export const OrdersIconButton = styled(IconButton)({
  color: '#4061ef',
  fontSize: '28px',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  borderRadius: '50%',
  '&:hover': {
    color: '#1e3a8a',
  },
});

// Filter panel
export const OrdersFilterPanel = styled(Box)({
  padding: '20px 22px',
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 10px rgba(60, 72, 120, 0.07)',
  marginBottom: '36px',
});

// Filter row
export const OrdersFilterRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '18px',
  alignItems: 'center',
});

// Search input
export const OrdersSearchInput = styled(TextField)({
  minWidth: '200px',
  flexGrow: 1,
});

// Select dropdown
export const OrdersSelect = styled(FormControl)({
  minWidth: '140px',
});

// Info row
export const OrdersInfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  fontSize: '0.95rem',
  color: '#565c6a',
});

// Reset button
export const OrdersResetButton = styled(Button)({
  background: 'transparent',
  border: 'none',
  color: '#4061ef',
  cursor: 'pointer',
  fontWeight: 500,
  padding: 0,
  textTransform: 'none',
  '&:hover': {
    textDecoration: 'underline',
    background: 'transparent',
  },
});

// Error alert
export const OrdersErrorAlert = styled(Alert)({
  marginBottom: '32px',
});

// Task list
export const OrdersTaskList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: '24px',
  [theme.breakpoints.down(600)]: {
    gap: '18px',
  },
}));

// Task item
export const OrdersTaskItem = styled(Box)(({ theme }) => ({
  background: '#fff',
  padding: '22px 24px',
  borderRadius: '20px',
  boxShadow: '0 3px 16px rgba(40, 55, 80, 0.08)',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
  border: '1px solid transparent',
  '&:hover, &:focus': {
    boxShadow: '0 6px 30px rgba(40, 55, 80, 0.12)',
    transform: 'translateY(-4px)',
    borderColor: '#3b82f6',
    outline: 'none',
  },
  [theme.breakpoints.down(600)]: {
    padding: '18px 14px',
  },
}));

// Empty state
export const OrdersEmptyState = styled(Box)({
  padding: '48px 32px',
  textAlign: 'center',
  border: '2px dashed #cbd5e1',
  borderRadius: '20px',
  background: '#f9fafb',
  color: '#606672',
});

// Empty state icon
export const OrdersEmptyIcon = styled('span')({
  fontSize: '54px',
  color: '#a0aec0',
  marginBottom: '16px',
});

// Skeleton rectangle (for loading state)
export const OrdersSkeletonRect = styled(Skeleton)({
  borderRadius: '20px',
});