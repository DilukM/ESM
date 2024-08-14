import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "components/Header";
import { useGetItemsQuery, useDeleteItemsMutation } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

import { Button, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import DonorEvents from "../donors/donorEvents";
import UpdateFormCI from "./updateFormItems";
import Items from "./Items";
import Overview from "./overview";
import IncomingDonations from "./incomingDonations";
import OutgoingDonations from "./outgoingDonations";

const Inventory = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showUpdateFormCI, setShowUpdateFormCI] = useState(false);
  const [showUpdateFormRI, setShowUpdateFormRI] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);

  // values to be sent to the backend
  const [deleteItems] = useDeleteItemsMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [setSort] = useState({});
  const [setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetItemsQuery();
  const [rowIndex, setRowIndex] = useState(0); // State for custom index

  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (data) {
      setRowIndex(0); // Reset the index when data changes
    }
  }, [data]);

  //items
  const handleDelete = (itemID) => {
    deleteItems(itemID)
      .unwrap()
      .then((response) => {
        console.log("item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleUpdateClick = (item) => {
    setSelectedItems(item); // Set the selected item data
    setShowUpdateFormCI(true); // Show the update form
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowUpdateFormCI(false);
  };

  const items = [
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "unitScore",
      headerName: "Unit Score",
      flex: 1,
    },

    {
      field: " ",
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

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Inventory"
        subtitle="Manage all incoming and outgoing donations"
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="Primary"
        aria-label="Inventory tabs"
      >
        <Tab label="OverView" />
        <Tab label="Items" />
        <Tab label="Incomming Donations" />
        <Tab label="Outgoing Donations" />
        <Tab label="Events" />
      </Tabs>

      {activeTab === 0 && (
        <Overview
          data={data}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setSort={setSort}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearch={setSearch}
        />
        // <Box>
        //   <Box
        //     display="flex"
        //     justifyContent="flex-end"
        //     mb={2}
        //     sx={{
        //       "& button": {
        //         backgroundColor: theme.palette.secondary[400],
        //         color: "white",
        //       },
        //     }}
        //   >
        //     <Link to="generatereport">
        //       <Button variant="contained" sx={{ marginTop: 2 }}>
        //         Generate Report
        //       </Button>
        //     </Link>
        //   </Box>

        //   <Box
        //     height="80vh"
        //     sx={{
        //       "& .MuiDataGrid-root": {
        //         border: "none",
        //       },
        //       "& .MuiDataGrid-cell": {
        //         borderBottom: "none",
        //       },
        //       "& .MuiDataGrid-columnHeaders": {
        //         backgroundColor: theme.palette.background.alt,
        //         color: theme.palette.secondary[100],
        //         borderBottom: "none",
        //       },
        //       "& .MuiDataGrid-virtualScroller": {
        //         backgroundColor: theme.palette.primary.light,
        //       },
        //       "& .MuiDataGrid-footerContainer": {
        //         backgroundColor: theme.palette.background.alt,
        //         color: theme.palette.secondary[100],
        //         borderTop: "none",
        //       },
        //       "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        //         color: `${theme.palette.secondary[200]} !important`,
        //       },
        //     }}
        //   >
        //     <DataGrid
        //       loading={isLoading || !data}
        //       getRowId={(row) => row._id}
        //       rows={data || []}
        //       columns={overview}
        //       rowCount={(data && data.total) || 0}
        //       rowsPerPageOptions={[20, 50, 100]}
        //       pagination
        //       page={page}
        //       pageSize={pageSize}
        //       paginationMode="server"
        //       sortingMode="server"
        //       onPageChange={(newPage) => setPage(newPage)}
        //       onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        //       onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        //       components={{ Toolbar: DataGridCustomToolbar }}
        //       componentsProps={{
        //         toolbar: { searchInput, setSearchInput, setSearch },
        //       }}
        //     />
        //   </Box>
        // </Box>
      )}

      {activeTab === 1 && (
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
            <Button
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={() => setShowForm(true)}
            >
              Add Item
            </Button>
          </Box>

          <UpdateFormCI
            open={showUpdateFormCI}
            handleClose={handleCloseForm}
            refetch={refetch}
            itemsToUpdate={selectedItems}
          />

          <Items
            open={showForm}
            handleClose={handleCloseForm}
            refetch={refetch}
          />

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
              columns={items}
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

      {activeTab === 2 && <IncomingDonations />}

      {activeTab === 3 && <OutgoingDonations />}

      {activeTab === 4 && <DonorEvents />}
    </Box>
  );
};

export default Inventory;
