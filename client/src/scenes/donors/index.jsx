import React, { useState } from "react";
import { Avatar, Box, Button, Tab, Tabs, useTheme } from "@mui/material";
import { useGetDonorsQuery, useDeleteDonorMutation } from "state/api";
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
    // Handle change password logic here
    console.log("Changing password for record with ID:", id);
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
            Change Password
          </Button>
        </Box>
      ),
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
            <Button variant="contained" sx={{ marginTop: 2 }}>
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
