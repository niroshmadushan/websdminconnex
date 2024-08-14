// src/compo/page/DashboardPage.js

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  CircularProgress,
  IconButton,
  Zoom,
  Slide,
} from '@mui/material';
import { styled } from '@mui/system';
import PasswordIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Define initial data
const initialData = [
  {
    id: 1,
    name: 'Romesh De Silva',
    email: 'romesh@example.com',
    department: 'Organization Owner Accounts',
    activationKey: 'ABC123',
    system: 'connexit.biz',
    additional1: 'Value 1',
    additional2: 'Value 2',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Finance',
    activationKey: 'XYZ456',
    system: 'connexit.pro',
    additional1: 'Value A',
    additional2: 'Value B',
  },
  // Add more sample data if needed
];

// Define theme color
const themeColor = {
  primary: '#444',
  primaryDark: '#666',
  success: '#4caf50',
  error: '#f44336',
  headerBg: '#444',
  headerTextColor: '#ffffff',
  borderColor: '#777',
  color: '#000000',
  rowHoverColor: '#ebebeb', // Light grey for row hover
  rowAlternateColor: '#f5f5f5', // Alternate row color
  rowHoverHighlight: '#e0f7fa', // Distinct hover color for rows (Light Cyan)
};

// Define styled components
const PremiumButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '6px',
  padding: '6px 12px',
  textTransform: 'none',
  fontWeight: 'bold',
  height: '30px',
  minWidth: '80px',
  fontSize: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  cursor: 'pointer',
  border: 'none',
  boxShadow: `0 3px 6px rgba(0, 0, 0, 0.1)`,
  background: variant === 'contained' ? themeColor.primary : 'transparent',
  color:
    variant === 'contained' ? theme.palette.common.white : themeColor.primary,
  border: variant === 'outlined' ? `1px solid ${themeColor.primary}` : 'none',
  '&:hover': {
    backgroundColor:
      variant === 'contained'
        ? themeColor.primaryDark
        : 'rgba(51, 51, 51, 0.05)',
    transform: 'scale(1.03)',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '12px',
  borderBottom: `1px solid ${themeColor.borderColor}`,
  padding: '6px 8px',
  textAlign: 'center',
  backgroundColor: themeColor.rowAlternateColor,
  color: themeColor.color,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  height: '40px',
  transition: 'background-color 0.3s ease',
  '&:nth-of-type(odd)': {
    backgroundColor: '#ffffff', // White for alternate rows
  },
  '&:hover': {
    backgroundColor: themeColor.rowHoverHighlight, // Use the distinct hover color for rows
    boxShadow: `0px 2px 4px rgba(0,0,0,0.05)`,
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: themeColor.primary,
  color: themeColor.headerTextColor,
  position: 'sticky',
  top: 0,
  zIndex: 2,
  '& th': {
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '10px 12px',
    textAlign: 'center',
    borderRight: `1px solid ${themeColor.borderColor}`,
    background: themeColor.primary,
    color: themeColor.headerTextColor,
    '&:last-child': {
      borderRight: 'none',
    },
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: themeColor.headerTextColor,
  fontSize: '18px', // Reduced font size
  marginBottom: theme.spacing(2), // Reduced bottom margin
  textAlign: 'center',
  background: themeColor.headerBg,
  width: '50%', // Reduced width
  padding: '6px 0', // Reduced padding
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: '6px',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 3,
}));

const DetailTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: themeColor.color,
  fontSize: '16px', // Slightly reduced font size
  marginBottom: theme.spacing(1.5), // Reduced bottom margin
  textAlign: 'center',
}));

const DetailTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${themeColor.borderColor}`,
  padding: '8px',
  fontSize: '12px', // Slightly reduced font size
  color: themeColor.color,
  '&:first-of-type': {
    fontWeight: 'bold',
    color: themeColor.primaryDark, // Different color for emphasis
  },
}));

const DashboardPage = () => {
  const [data, setData] = useState(initialData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowDetailPopup(true);
  };

  const handleCloseDetailPopup = () => {
    setShowDetailPopup(false);
    setSelectedUser(null);
  };

  const handleRegisterClick = () => {
    setShowDetailPopup(false);
    setShowPasswordPopup(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (password === '12345') {
        // Correct password set to 12345
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Your registration has been completed successfully.',
          confirmButtonColor: themeColor.success,
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Password',
          text: 'The password you entered is incorrect.',
          confirmButtonColor: themeColor.error,
          confirmButtonText: 'Try Again',
        });
      }
      setIsProcessing(false);
      setShowPasswordPopup(false);
      setPassword('');
      setSelectedUser(null);
    }, 1000);
  };

  const handleClosePasswordPopup = () => {
    setShowPasswordPopup(false);
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Box sx={{ padding: 2, overflowY: 'hidden' }}>
      <TitleTypography variant="h5">
        New Business Registration Request Information
      </TitleTypography>
      <TableContainer
        component={Paper}
        sx={{
          overflow: 'auto',
          height: '450px',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Activation Key</StyledTableCell>
              <StyledTableCell>System</StyledTableCell>
              <StyledTableCell>Additional 1</StyledTableCell>
              <StyledTableCell>Additional 2</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((user) => (
              <StyledTableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
              >
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.department}</StyledTableCell>
                <StyledTableCell>{user.activationKey}</StyledTableCell>
                <StyledTableCell>{user.system}</StyledTableCell>
                <StyledTableCell>{user.additional1}</StyledTableCell>
                <StyledTableCell>{user.additional2}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Detail Popup */}
      <Dialog
        open={showDetailPopup}
        onClose={handleCloseDetailPopup}
        PaperProps={{
          style: {
            width: '400px',
            borderRadius: '8px',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
          },
        }}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogContent>
          {selectedUser && (
            <>
              <DetailTypography variant="h6">
                {selectedUser.name}
              </DetailTypography>
              <Table>
                <TableBody>
                  <TableRow>
                    <DetailTableCell>Department:</DetailTableCell>
                    <DetailTableCell>{selectedUser.department}</DetailTableCell>
                  </TableRow>
                  <TableRow>
                    <DetailTableCell>Email:</DetailTableCell>
                    <DetailTableCell>{selectedUser.email}</DetailTableCell>
                  </TableRow>
                  <TableRow>
                    <DetailTableCell>Activation Key:</DetailTableCell>
                    <DetailTableCell>
                      {selectedUser.activationKey}
                    </DetailTableCell>
                  </TableRow>
                  <TableRow>
                    <DetailTableCell>System:</DetailTableCell>
                    <DetailTableCell>{selectedUser.system}</DetailTableCell>
                  </TableRow>
                  <TableRow>
                    <DetailTableCell>Additional Info:</DetailTableCell>
                    <DetailTableCell>
                      {selectedUser.additional1}, {selectedUser.additional2}
                    </DetailTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <PremiumButton
            variant="outlined"
            color="error"
            onClick={handleCloseDetailPopup}
          >
            Cancel
          </PremiumButton>
          <PremiumButton variant="contained" onClick={handleRegisterClick}>
            Register
          </PremiumButton>
        </DialogActions>
      </Dialog>

      {/* Password Popup */}
      <Dialog
        open={showPasswordPopup}
        onClose={handleClosePasswordPopup}
        PaperProps={{
          style: {
            width: '300px',
            borderRadius: '8px',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
          },
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up', timeout: 400 }}
      >
        <DialogContent>
          <DetailTypography variant="h6">Enter Password</DetailTypography>
          <TextField
            autoFocus
            fullWidth
            label="Password"
            type={passwordVisible ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={{ marginBottom: '12px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isProcessing && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <PremiumButton
            variant="outlined"
            color="error"
            onClick={handleClosePasswordPopup}
          >
            Cancel
          </PremiumButton>
          <PremiumButton variant="contained" onClick={handlePasswordSubmit}>
            Submit
          </PremiumButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;
