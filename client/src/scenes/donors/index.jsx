import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import {
  useGetDonorsQuery,
  useDeleteDonorMutation,
  useAddDonorQuery,
} from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Donors = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [deleteDonor] = useDeleteDonorMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [setSort] = useState({});
  const [setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [donorDetails, setDonorDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetDonorsQuery();

  const handleDelete = (donorId) => {
    deleteDonor(donorId)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully");
        // Optionally, you can trigger a refetch of the donors list
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
      });
  };

  const handleChangePassword = (id) => {
    setSelectedDonorId(id); // Set the selected donor ID
    fetchDonorDetails(id); // Fetch donor details
    setOpenDialog(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log("Updating values...", donorDetails);
    setOpenDialog(false); // Close the dialog after update
  };

  const fetchDonorDetails = (id) => {
    // Make an API call to fetch donor details
    // For demonstration, assuming an API that fetches details by ID
    // Replace this with your actual API call
    fetch(`your-api-url/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDonorDetails({
          name: data.name,
          phone: data.phone,
          email: data.email,
          // Set other fields as needed
        });
      })
      .catch((error) => {
        console.error("Error fetching donor details:", error);
      });
  };

  const handleAddNewDonor = () => {
    setOpenDialog(true);
    setSelectedDonorId(null);
    // Clear existing donor details
    setDonorDetails({
      name: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/general/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorDetails),
      });
      if (response.ok) {
        console.log("New donor added successfully");
        // Optionally, you can fetch updated donor list or perform other actions
        setOpenDialog(false);
      } else {
        console.error("Failed to add new donor:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new donor:", error.message);
    }
  };

  const donorColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.2,
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
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => handleChangePassword(params.row._id)}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (selectedDonorId) {
      fetchDonorDetails(selectedDonorId);
    }
  }, [selectedDonorId]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Donor Management"
        subtitle="Manage all the donor actions in one place."
      />
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
              onClick={handleAddNewDonor} // Call the function to open dialog
            >
              Add New Donor
            </Button>
          </Box>
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
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          </Box>
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>
              {selectedDonorId ? "Update Donor" : "Add New Donor"}
            </DialogTitle>
            <DialogContent>
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={donorDetails.name}
                onChange={(e) =>
                  setDonorDetails({ ...donorDetails, name: e.target.value })
                }
              />
              <TextField
                required
                margin="dense"
                id="phone"
                label="Contact Number"
                type="number"
                fullWidth
                value={donorDetails.phone}
                onChange={(e) =>
                  setDonorDetails({ ...donorDetails, phone: e.target.value })
                }
              />
              <TextField
                required
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                value={donorDetails.email}
                onChange={(e) =>
                  setDonorDetails({ ...donorDetails, email: e.target.value })
                }
              />
              <TextField
                required
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={donorDetails.passwordl}
                onChange={(e) =>
                  setDonorDetails({ ...donorDetails, password: e.target.value })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="error">
                Cancel
              </Button>
              <Button onClick={handleUpdate} color="info">
                {selectedDonorId ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>
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
            rows={data || []}
            columns={donorColumns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      )}
      {activeTab === 2 && (
        <Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            mb={2}
            sx={{
              "& button": {
                backgroundColor: theme.palette.secondary[400],
                color: "white",
              },
            }}
          >
            <Button variant="contained" sx={{ marginTop: 2 }}>
              Add New Event
            </Button>
          </Box>
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
              rows={(data && data.transactions) || []}
              columns={donorColumns}
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Donors;
