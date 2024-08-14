// src/compo/page/ControlUserAccounts.js

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  Grid,
  Zoom,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

// Define initial data for the table
const initialData = [
  { empId: 'EMP123', name: 'John Doe', email: 'john.doe@example.com', department: 'IT', businessUnit: 'Software', status: 'Active' },
  { empId: 'EMP124', name: 'Jane Smith', email: 'jane.smith@example.com', department: 'HR', businessUnit: 'Recruitment', status: 'Inactive' },
];

// Mock data for employee details
const employeeDetails = {
  EMP001: {
    name: 'John Doe',
    department: 'IT',
    businessUnit: 'Development',
    position: 'Developer',
    email: 'john.doe@example.com',
    head: {
      name: 'Alice Johnson',
      empId: 'EMP003',
    },
  },
  EMP002: {
    name: 'Jane Smith',
    department: 'HR',
    businessUnit: 'Operations',
    email: 'jane.smith@example.com',
    position: 'Manager',
    head: null,
  },
  // Add more mock data as needed
};

// Theme colors
const themeColor = {
  primary: '#444',
  primaryDark: '#666',
  success: '#4caf50',
  error: '#f44336',
  headerBg: '#444',
  headerTextColor: '#ffffff',
  borderColor: '#777',
  color: '#000000',
  rowHoverColor: '#f5f5f5', // Light hover color for rows
  scrollbarThumbColor: '#888', // Custom scrollbar color
};

// Styled components for consistent UI
const PremiumButton = styled(Button)(({ theme, variant }) => ({
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
  color: variant === 'contained' ? theme.palette.common.white : themeColor.primary,
  border: variant === 'outlined' ? `2px solid ${themeColor.primary}` : 'none',
  '&:hover': {
    backgroundColor: variant === 'contained' ? themeColor.primaryDark : 'rgba(51, 51, 51, 0.05)',
    transform: 'scale(1.03)',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '13px',
  borderBottom: `1px solid ${themeColor.borderColor}`,
  padding: '8px',
  textAlign: 'center',
  backgroundColor: '#ffffff', // Default white background for cells
  color: themeColor.color,
  transition: 'background-color 0.3s ease',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  height: '40px',
  transition: 'background-color 0.3s ease',
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9', // Light gray for alternate rows
  },
  '&:hover': {
    backgroundColor: themeColor.rowHoverColor, // Distinct hover color
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
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

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: themeColor.headerTextColor,
  fontSize: '18px',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  background: themeColor.headerBg,
  width: '40%',
  padding: '8px 0',
  marginLeft: 'auto',
  marginRight: 'auto',
  borderRadius: '8px',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
  position: 'sticky',
  top: 0,
  zIndex: 3,
}));

const DialogTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '13px',
  borderBottom: `1px solid ${themeColor.borderColor}`,
  padding: '8px',
  textAlign: 'left', // Align text to the left
  color: themeColor.color,
}));

const ControlUserAccounts = () => {
  const theme = useTheme();
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newUser, setNewUser] = useState({
    empId: '',
    email: '',
  });
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setNewStatus(user.status);
    setShowViewPopup(true);
  };

  const handleCloseViewPopup = () => {
    setShowViewPopup(false);
    setSelectedUser(null);
  };

  const handleRequestUpdate = () => {
    setShowPasswordPopup(true);
  };

  const handleClosePasswordPopup = () => {
    setShowPasswordPopup(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmUpdate = () => {
    if (password === 'your-secure-password') {
      const updatedData = data.map((user) =>
        user.id === selectedUser.id ? { ...user, status: newStatus } : user
      );
      setData(updatedData);
      setFilteredData(updatedData);
      setShowPasswordPopup(false);
      handleCloseViewPopup();
      Swal.fire('Success!', 'Status updated successfully!', 'success');
    } else {
      Swal.fire('Error!', 'Incorrect password. Please try again.', 'error');
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.empId.toLowerCase().includes(searchTerm) ||
        user.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    const filtered = initialData.filter((user) => user.department === department || department === '');
    setFilteredData(filtered);
  };

  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase().replace(/\s/g, ''); // Convert to uppercase and remove spaces
    setNewUser({ ...newUser, [name]: uppercaseValue });
    if (name === 'empId' && uppercaseValue in employeeDetails) {
      setEmployeeInfo(employeeDetails[uppercaseValue]);
    } else {
      setEmployeeInfo(null);
    }
    if (!uppercaseValue) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: 'This field is required' }));
    } else {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddUserSubmit = () => {
    const errors = {};
    Object.keys(newUser).forEach((key) => {
      if (!newUser[key]) {
        errors[key] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedData = [
      ...data,
      {
        ...newUser,
        id: data.length + 1,
        name: employeeInfo.name,
        department: employeeInfo.department,
        businessUnit: employeeInfo.businessUnit,
        position: employeeInfo.position,
        status: 'Active',
        online: false,
      },
    ];
    setData(updatedData);
    setFilteredData(updatedData);
    setShowAddUserPopup(false);
    setNewUser({
      empId: '',
      email: '',
    });
    setEmployeeInfo(null);
    setFormErrors({});
    Swal.fire('Success!', 'User added successfully!', 'success');
  };

  const handleAddUserClick = () => {
    setShowAddUserPopup(true);
  };

  const handleCloseAddUserPopup = () => {
    setShowAddUserPopup(false);
    setFormErrors({});
  };

  return (
    <Box sx={{ padding: 3, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TitleTypography variant="h5">Control User Accounts</TitleTypography>
        <PremiumButton variant="contained" onClick={handleAddUserClick}>
          <AddIcon sx={{ marginRight: 1 }} />
          Add User
        </PremiumButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 2,
          height: '35px',
        }}
      >
        <FormControl
          variant="outlined"
          sx={{
            minWidth: 150,
            marginRight: 2,
            height: '35px',
            '& .MuiOutlinedInput-root': {
              height: '35px',
              fontSize: '0.875rem',
              '& fieldset': {
                borderColor: themeColor.borderColor,
              },
              '&:hover fieldset': {
                borderColor: themeColor.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: themeColor.primaryDark,
              },
            },
          }}
        >
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            label="Department"
          >
            <MenuItem value="">
              <em>All Departments</em>
            </MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          value={search}
          sx={{
            maxWidth: 400,
            height: '35px',
            '& .MuiOutlinedInput-root': {
              height: '35px',
              fontSize: '0.875rem',
              '& fieldset': {
                borderColor: themeColor.borderColor,
              },
              '&:hover fieldset': {
                borderColor: themeColor.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: themeColor.primaryDark,
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search by Name, Email or EMP ID"
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          overflow: 'auto',
          maxHeight: '450px',
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
              <StyledTableCell>Emp ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Business Unit</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredData.map((user) => (
              <StyledTableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
              >
                <StyledTableCell>{user.empId}</StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.department}</StyledTableCell>
                <StyledTableCell>{user.businessUnit}</StyledTableCell>
                <StyledTableCell>{user.status}</StyledTableCell>
               
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Popup */}
      <Dialog
        open={showViewPopup}
        onClose={handleCloseViewPopup}
        PaperProps={{
          style: {
            borderRadius: '12px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease-out',
            transform: showViewPopup ? 'scale(1)' : 'scale(0.9)',
            width: '500px',
          },
        }}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          <Grid container spacing={2}>
           
            
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Full Name:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedUser?.fullName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Email:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedUser?.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Emp ID:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{selectedUser?.empId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Status:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  label="Status"
                  sx={{
                    height: '35px',
                    fontSize: '0.875rem',
                    '& .MuiOutlinedInput-root': {
                      height: '35px',
                      '& fieldset': {
                        borderColor: themeColor.borderColor,
                      },
                      '&:hover fieldset': {
                        borderColor: themeColor.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: themeColor.primaryDark,
                      },
                    },
                  }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <PremiumButton variant="outlined" onClick={handleCloseViewPopup}>
            Close
          </PremiumButton>
          <PremiumButton variant="contained" onClick={handleRequestUpdate}>
            Update Status
          </PremiumButton>
        </DialogActions>
      </Dialog>

      {/* Password Confirmation Popup */}
      <Dialog
        open={showPasswordPopup}
        onClose={handleClosePasswordPopup}
        PaperProps={{
          style: {
            borderRadius: '12px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease-out',
            transform: showPasswordPopup ? 'scale(1)' : 'scale(0.9)',
            width: '400px',
          },
        }}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Confirm Update
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={handlePasswordChange}
            value={password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              height: '35px',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-root': {
                height: '35px',
                '& fieldset': {
                  borderColor: themeColor.borderColor,
                },
                '&:hover fieldset': {
                  borderColor: themeColor.primary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: themeColor.primaryDark,
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <PremiumButton variant="outlined" onClick={handleClosePasswordPopup}>
            Cancel
          </PremiumButton>
          <PremiumButton variant="contained" onClick={handleConfirmUpdate}>
            Confirm
          </PremiumButton>
        </DialogActions>
      </Dialog>

      {/* Add User Popup */}
      <Dialog
        open={showAddUserPopup}
        onClose={handleCloseAddUserPopup}
        PaperProps={{
          style: {
            borderRadius: '12px',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease-out',
            transform: showAddUserPopup ? 'scale(1)' : 'scale(0.9)',
            width: '500px',
          },
        }}
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 400 }}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Add New User
          </Typography>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Employee ID"
              variant="outlined"
              name="empId"
              value={newUser.empId}
              onChange={handleAddUserChange}
              required
              error={!!formErrors.empId}
              helperText={formErrors.empId}
            />
            {employeeInfo && (
              <>
                <TextField
                  label="Employee Name"
                  variant="outlined"
                  value={employeeInfo.name}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Department"
                  variant="outlined"
                  value={employeeInfo.department}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Business Unit"
                  variant="outlined"
                  value={employeeInfo.businessUnit}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Position"
                  variant="outlined"
                  value={employeeInfo.position}
                  InputProps={{ readOnly: true }}
                />
                {employeeInfo.position !== 'Head' && employeeInfo.head && (
                  <>
                    <TextField
                      label="Department Head Name"
                      variant="outlined"
                      value={employeeInfo.head.name}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Department Head Emp ID"
                      variant="outlined"
                      value={employeeInfo.head.empId}
                      InputProps={{ readOnly: true }}
                    />
                  </>
                )}
                <TextField
                  label="Email"
                  variant="outlined"
                  value={employeeInfo.email}
                  InputProps={{ readOnly: true }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <PremiumButton variant="outlined" onClick={handleCloseAddUserPopup}>
            Cancel
          </PremiumButton>
          <PremiumButton variant="contained" onClick={handleAddUserSubmit}>
            Create Account
          </PremiumButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ControlUserAccounts;
