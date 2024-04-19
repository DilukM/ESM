import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Tab, Tabs, useTheme } from "@mui/material";
import { useGetDonorsQuery, useDeleteDonorMutation } from "state/api";
import Header from "components/Header";
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

  // values to be sent to the backend
  const [deleteDonor] = useDeleteDonorMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [setSort] = useState({});
  const [setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetDonorsQuery();
  const [rowIndex, setRowIndex] = useState(0); // State for custom index

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
  };

  const handleUpdateClick = (donor) => {
    setSelectedDonor(donor); // Set the selected donor data
    setShowUpdateForm(true); // Show the update form
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
      field: "password",
      headerName: "Password",
      flex: 1,
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
          />

          <DonorForm
            open={showForm}
            handleClose={handleCloseForm}
            refetch={refetch}
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
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(newSortModel[0])}
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

export default Donors;
