// src/compo/page/RegisterPartnerBusinessesPage.js

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
  IconButton,
  Zoom,
  Slide,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

// Define initial data
const initialData = [
  {
    id: 1,
    companyName: 'Tech Innovations',
    contactName: 'Jane Doe',
    contactEmail: 'jane.doe@techinnovations.com',
    contactPhone: '+1234567890',
    address: '123 Tech Lane, Silicon Valley, CA',
    website: 'techinnovations.com',
    registrationNumber: 'REG12345',
    vatNumber: 'VAT67890',
  },
  {
    id: 2,
    companyName: 'Future Corp',
    contactName: 'John Smith',
    contactEmail: 'john.smith@futurecorp.com',
    contactPhone: '+1987654321',
    address: '456 Future Blvd, New York, NY',
    website: 'futurecorp.com',
    registrationNumber: 'REG98765',
    vatNumber: 'VAT43210',
  },
  // Add more sample data if needed
];

const themeColor = {
  primary: '#444',
  primaryDark: '#666',
  success: '#4caf50',
  error: '#f44336',
  headerBg: '#444',
  headerTextColor: '#ffffff',
  borderColor: '#777',
  color: '#000000',
  rowHoverColor: '#e0f7fa', // Light cyan for row hover
  scrollbarThumbColor: '#888', // Color for scrollbar
};

// Define styled components
const PremiumButton = styled(Button)(({ variant }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 'bold',
  height: '35px',
  minWidth: '90px',
  fontSize: '13px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  cursor: 'pointer',
  border: 'none',
  boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
  background: variant === 'contained' ? themeColor.primary : 'transparent',
  color: variant === 'contained' ? '#fff' : themeColor.primary,
  border: variant === 'outlined' ? `2px solid ${themeColor.primary}` : 'none',
  '&:hover': {
    backgroundColor:
      variant === 'contained'
        ? themeColor.primaryDark
        : 'rgba(51, 51, 51, 0.1)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: '12px',
  borderBottom: `1px solid ${themeColor.borderColor}`,
  padding: '8px',
  textAlign: 'center',
  backgroundColor: '#ffffff', // Default white background for cells
  color: themeColor.color,
}));

const StyledTableRow = styled(TableRow)(() => ({
  cursor: 'pointer',
  height: '40px',
  transition: 'background-color 0.3s ease',
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9', // Light gray for alternate rows
  },
  '&:hover': {
    backgroundColor: themeColor.rowHoverColor, // Distinct hover color
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Shadow on hover
  },
}));

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: themeColor.headerBg,
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
    background: themeColor.headerBg,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    color: themeColor.headerTextColor,
    '&:last-child': {
      borderRight: 'none', // No border on the last header cell
    },
  },
}));

const TitleTypography = styled(Typography)(() => ({
  fontWeight: 'bold',
  color: themeColor.headerTextColor,
  fontSize: '18px',
  marginBottom: 2,
  textAlign: 'center',
  background: themeColor.headerBg,
  width: '50%',
  padding: '8px 0',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: '8px',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
  position: 'sticky',
  top: 0,
  zIndex: 3,
}));

const DialogTableCell = styled(TableCell)(() => ({
  fontSize: '13px',
  borderBottom: `1px solid ${themeColor.borderColor}`,
  padding: '8px',
  textAlign: 'left', // Align text to the left
  color: themeColor.color,
}));

const RegisterPartnerBusinessesPage = () => {
  const [data, setData] = useState(initialData);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddAdminPopup, setShowAddAdminPopup] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    contactNumber: '',
    designation: '',
    fullName: '',
    title: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleRowClick = (business) => {
    setSelectedBusiness(business);
    setShowDetailPopup(true);
  };

  const handleCloseDetailPopup = () => {
    setShowDetailPopup(false);
    setSelectedBusiness(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(
    (business) =>
      business.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
    if (!value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: 'This field is required' }));
    } else {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddAdminSubmit = () => {
    const errors = {};
    Object.keys(newAdmin).forEach((key) => {
      if (!newAdmin[key]) {
        errors[key] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    Swal.fire('Admin added successfully!', '', 'success');
    setShowAddAdminPopup(false);
    setNewAdmin({
      email: '',
      contactNumber: '',
      designation: '',
      fullName: '',
      title: '',
    });
    setFormErrors({});
  };

  const handleAddAdminClick = () => {
    setShowAddAdminPopup(true);
  };

  const handleCloseAddAdminPopup = () => {
    setShowAddAdminPopup(false);
    setFormErrors({});
  };

  return (
    <Box sx={{ padding: 2, overflowY: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '250px' }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ marginRight: 1 }} />
            ),
          }}
        />
      </Box>
      <TitleTypography variant="h5">
        Register Partner Businesses
      </TitleTypography>
      <TableContainer
        component={Paper}
        sx={{
          overflow: 'auto',
          height: '400px',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: themeColor.scrollbarThumbColor,
            borderRadius: '4px',
          },
        }}
      >
        <Table stickyHeader>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Contact Name</StyledTableCell>
              <StyledTableCell>Contact Email</StyledTableCell>
              <StyledTableCell>Contact Phone</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>
              <StyledTableCell>Registration Number</StyledTableCell>
              <StyledTableCell>VAT Number</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredData.map((business) => (
              <StyledTableRow
                key={business.id}
                onClick={() => handleRowClick(business)}
              >
                <StyledTableCell>{business.companyName}</StyledTableCell>
                <StyledTableCell>{business.contactName}</StyledTableCell>
                <StyledTableCell>{business.contactEmail}</StyledTableCell>
                <StyledTableCell>{business.contactPhone}</StyledTableCell>
                <StyledTableCell>{business.address}</StyledTableCell>
                <StyledTableCell>{business.website}</StyledTableCell>
                <StyledTableCell>{business.registrationNumber}</StyledTableCell>
                <StyledTableCell>{business.vatNumber}</StyledTableCell>
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
            borderRadius: '12px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          },
        }}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogContent>
          {selectedBusiness && (
            <>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                {selectedBusiness.companyName}
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>Contact Name:</strong>
                    </DialogTableCell>
                    <DialogTableCell>
                      {selectedBusiness.contactName}
                    </DialogTableCell>
                  </TableRow>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>Contact Email:</strong>
                    </DialogTableCell>
                    <DialogTableCell>
                      {selectedBusiness.contactEmail}
                    </DialogTableCell>
                  </TableRow>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>Contact Phone:</strong>
                    </DialogTableCell>
                    <DialogTableCell>
                      {selectedBusiness.contactPhone}
                    </DialogTableCell>
                  </TableRow>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>Address:</strong>
                    </DialogTableCell>
                    <DialogTableCell>{selectedBusiness.address}</DialogTableCell>
                  </TableRow>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>Website:</strong>
                    </DialogTableCell>
                    <DialogTableCell>{selectedBusiness.website}</DialogTableCell>
                  </TableRow>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>Registration Number:</strong>
                    </DialogTableCell>
                    <DialogTableCell>
                      {selectedBusiness.registrationNumber}
                    </DialogTableCell>
                  </TableRow>
                  <TableRow>
                    <DialogTableCell component="th" scope="row">
                      <strong>VAT Number:</strong>
                    </DialogTableCell>
                    <DialogTableCell>{selectedBusiness.vatNumber}</DialogTableCell>
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
            Close
          </PremiumButton>
          <PremiumButton
            variant="contained"
            color="primary"
            onClick={handleAddAdminClick}
          >
            Add Admin
          </PremiumButton>
        </DialogActions>
      </Dialog>

      {/* Add Admin Popup */}
      <Dialog
        open={showAddAdminPopup}
        onClose={handleCloseAddAdminPopup}
        PaperProps={{
          style: {
            borderRadius: '12px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          },
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up', timeout: 400 }}
      >
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            Add New Admin
          </Typography>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={newAdmin.email}
              onChange={handleAddAdminChange}
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              name="contactNumber"
              value={newAdmin.contactNumber}
              onChange={handleAddAdminChange}
              required
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber}
            />
            <TextField
              label="Designation"
              variant="outlined"
              name="designation"
              value={newAdmin.designation}
              onChange={handleAddAdminChange}
              required
              error={!!formErrors.designation}
              helperText={formErrors.designation}
            />
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={newAdmin.fullName}
              onChange={handleAddAdminChange}
              required
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
            />
            <FormControl variant="outlined" required error={!!formErrors.title}>
              <InputLabel>Title</InputLabel>
              <Select
                label="Title"
                name="title"
                value={newAdmin.title}
                onChange={handleAddAdminChange}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
              </Select>
              <FormHelperText>{formErrors.title}</FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <PremiumButton
            variant="contained"
            color="primary"
            onClick={handleAddAdminSubmit}
          >
            Submit
          </PremiumButton>
          <PremiumButton
            variant="outlined"
            color="error"
            onClick={handleCloseAddAdminPopup}
          >
            Cancel
          </PremiumButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegisterPartnerBusinessesPage;
