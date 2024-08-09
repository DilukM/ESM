import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  useTheme,
  IconButton,
  Alert,
  TextField,
  InputAdornment,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  useDeleteDonorMutation,
  useGetLeaderboardQuery,
  useResetPasswordDonorMutation,
} from "state/api";
import Header from "components/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import DonorForm from "./donorForm";
import UpdateForm from "./updateForm";
import DonorEvents from "./donorEvents";

const Donors = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  // values to be sent to the backend
  const [deleteDonor] = useDeleteDonorMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetLeaderboardQuery();
  const [rowIndex, setRowIndex] = useState(0); // State for custom index
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleResetPasswordOpen = (donor) => {
    setSelectedDonor(donor);
    setResetPasswordOpen(true);
  };

  const handleResetPasswordClose = () => {
    setResetPasswordOpen(false);
    setSelectedDonor(null);
  };

  useEffect(() => {
    if (data) {
      setRowIndex(0); // Reset the index when data changes
    }
  }, [data]);

  const handleDelete = (donorId) => {
    deleteDonor(donorId)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
      });
    setAlertState({
      open: true,
      message: "Donor deleted successfully!",
      severity: "success",
    });
    setTimeout(() => {
      setAlertState({ open: false, message: "", severity: "success" });
    }, 3000);
  };

  const handleUpdateClick = (donor) => {
    setSelectedDonor(donor); // Set the selected donor data
    setShowUpdateForm(true); // Show the update form
  };
  const handleSuccessUpdate = () => {
    setAlertState({
      open: true,
      message: "Donor Updated successfully!",
      severity: "success",
    });
    refetch();
    setTimeout(() => {
      setAlertState({ ...alertState, open: false });
    }, 3000);
  };
  const handleSuccessAdd = () => {
    setAlertState({
      open: true,
      message: "Donor Added successfully!",
      severity: "success",
    });
    refetch();
    setTimeout(() => {
      setAlertState({ ...alertState, open: false });
    }, 3000);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowUpdateForm(false);
  };
  const generateRowsWithIndex = (rows) => {
    return rows.map((row, index) => ({ ...row, index: rowIndex + index + 1 }));
  };

  const donorColumns = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.2,
      renderCell: (params) => <Avatar src={params.row.photoURL} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Contact Number",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "resetPassword",
      headerName: "Reset Password",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: theme.palette.primary[700],
            ":hover": { backgroundColor: theme.palette.secondary[400] },
            color: theme.palette.background.alt,
          }}
          variant="contained"
          color="primary"
          onClick={() => handleResetPasswordOpen(params.row)}
        >
          Reset Password
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Box
            display="flex"
            justifyContent="flex-end"
            mr={2}
            sx={{
              "& button": {
                backgroundColor: theme.palette.secondary[400],
                color: "white",
              },
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{
              "& button": {
                backgroundColor: theme.palette.primary[700],
                color: "white",
              },
            }}
          >
            <Button
              variant="contained"
              color="info"
              onClick={() => handleUpdateClick(params.row)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const leaderboardColumns = [
    {
      field: "index",
      headerName: "#",
      flex: 0.2,
      valueGetter: (params) => params.row.index,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.2,
      renderCell: (params) => <Avatar src={params.row.photoURL} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Contact Number",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "score",
      headerName: "Score",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Donor Management"
        subtitle="Manage all the donor actions in one place."
      />
      {alertState.open && (
        <Alert
          severity={alertState.severity}
          onClose={() => setAlertState({ ...alertState, open: false })}
        >
          {alertState.message}
        </Alert>
      )}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="Donor management tabs"
      >
        <Tab label="Donors" />
        <Tab label="Leaderboard" />
        <Tab label="Events" />
      </Tabs>
      {activeTab === 0 && (
        <Box>
          <Box
            display="flex"
            flex={0.2}
            justifyContent="flex-end"
            mb={2}
            sx={{
              "& button": {
                backgroundColor: theme.palette.secondary[400],
                color: "white",
              },
            }}
          >
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={() => setShowForm(true)}
            >
              Add New Donor
            </Button>
          </Box>

          <UpdateForm
            open={showUpdateForm}
            handleClose={handleCloseForm}
            refetch={refetch}
            donorToUpdate={selectedDonor}
            handleSuccess={handleSuccessUpdate}
            setAlertState={setAlertState}
          />

          <DonorForm
            open={showForm}
            handleClose={handleCloseForm}
            refetch={refetch}
            handleSuccess={handleSuccessAdd}
            setAlertState={setAlertState}
          />
          <ResetPasswordDialog
            open={resetPasswordOpen}
            onClose={handleResetPasswordClose}
            user={selectedDonor}
            setAlertState={setAlertState}
          />

          <Box
            mt="40px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={data || []}
              columns={donorColumns}
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="client"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          </Box>
        </Box>
      )}
      {activeTab === 1 && (
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={generateRowsWithIndex(data || [])}
            columns={leaderboardColumns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="client"
            sortingMode="client"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <DonorEvents />
        </Box>
      )}
    </Box>
  );
};

const ResetPasswordDialog = ({ open, onClose, user, setAlertState }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword] = useResetPasswordDonorMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const donorId = user ? user._id : "";

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidationError("");
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handlePasswordReset = async () => {
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    try {
      await resetPassword({ donorId, password }).unwrap();
      setPassword("");
      setError("");
      setAlertState({
        open: true,
        message: "Password reset successfully!",
        severity: "success",
      });
      setTimeout(() => {
        setAlertState({ open: false, message: "", severity: "success" });
      }, 3000);
      onClose();
    } catch (error) {
      if (error.data && error.data.message) {
        setError(error.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleDialogClose = () => {
    setPassword("");
    setError("");
    setValidationError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Reset Password
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
        {validationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {validationError}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{
            "& button": {
              backgroundColor: theme.palette.primary[700],
              ":hover": { backgroundColor: theme.palette.primary[400] },
              color: "white",
            },
          }}
        >
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          mr={2}
          sx={{
            "& button": {
              backgroundColor: theme.palette.secondary[400],
              ":hover": { backgroundColor: theme.palette.secondary[200] },
              color: "white",
            },
          }}
        >
          <Button onClick={handlePasswordReset} color="primary">
            Reset Password
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default Donors;
