import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import {
  useGetItemssQuery,
  useDeleteItemsMutation,
  useDeleteItems_outMutation,
} from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

import {
  Avatar,
  Button,
  Tab,
  Tabs,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import DonorEvents from "./donorEvents";
import UpdateFormCI from "./updateFormCI";
import UpdateFormRI from "./updateFormRI";
import Items from "./Items";
import Items_out from "./Items_out";

const Inventory = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showUpdateFormCI, setShowUpdateFormCI] = useState(false);
  const [showUpdateFormRI, setShowUpdateFormRI] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  //const [selectedItems_out, setSelectedItems_out] = useState(null);

  // values to be sent to the backend
  const [deleteItems] = useDeleteItemsMutation();
  // const [deleteItems_out] = useDeleteItems_outMutation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [setSort] = useState({});
  const [setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, refetch } = useGetItemssQuery();
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
        // Optionally, you can trigger a refetch of the donors list
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleUpdateClick = (item) => {
    setSelectedItems(item); // Set the selected item data
    setShowUpdateFormCI(true); // Show the update form
  };

  // const handleUpdateClickRI = (item_out) => {
  //   setSelectedItems_out(item_out); // Set the selected donor data
  //   setShowUpdateFormRI(true); // Show the update form
  // };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowUpdateFormCI(false);
  };

  const handleCloseFormRI = () => {
    setShowForm(false);
    setShowUpdateFormRI(false);
  };

  const generateRowsWithIndex = (rows) => {
    return rows.map((row, index) => ({ ...row, index: rowIndex + index + 1 }));
  };

  //Add Item...
  // const [addItem, setAddItem] = useState({
  //   itemName: "",
  //   date: "",
  //   itemId: "",
  //   donorId: "",
  //   itemQuantity: "",

  // });

  //Release Item...

  // const [releaseItem, setReleaseItem] = useState({
  //   itemName: "",
  //   date: "",
  //   itemId: "",
  //   eventId: "",
  //   itemQuantity: "",

  // });

  // const handleTabChange = (event, newValue) => {
  //   setActiveTab(newValue);
  // };

  // const [searchInput, setSearchInput] = useState("");
  // const { data, isLoading } = useGetTransactionsQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  //Add Item
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setAddItem((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   setAddItem((prev) => ({
  //     ...prev,
  //     coverImage: file,
  //   }));
  // };

  // const handleAddItem = () => {

  //   console.log(addItem);
  //   handleCloseModal();
  // };
  //Release Item
  // const handleInputChange1 = (e) => {
  //   const { name, value } = e.target;
  //   setReleaseItem((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleFileInputChange1 = (e) => {
  //   const file = e.target.files[0];
  //   setReleaseItem((prev) => ({
  //     ...prev,
  //     coverImage: file,
  //   }));
  // };

  // const handleReleaseItem= () => {

  //   console.log(releaseItem);
  //   handleCloseModal();
  // };

  const overview = [
    {
      field: "eventid",
      headerName: "Event ID",
      flex: 1,
    },

    {
      field: "itemId",
      headerName: "Item ID",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "donorId",
      headerName: "Donor Id",
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
              onClick={() => setShowUpdateFormCI(true)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const items = [
    {
      field: "itemId",
      headerName: "Item ID",
      flex: 1,
    },

    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "donorId",
      headerName: "Donor ID",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },

    {
      field: "",
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
              onClick={() => handleUpdateClick(true)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const currentItems = [
    {
      field: "itemId",
      headerName: "Item ID",
      flex: 1,
    },

    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },

    {
      field: "",
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
              onClick={() => setShowUpdateFormCI(true)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const releaseItems = [
    {
      field: "itemID",
      headerName: "Item ID",
      flex: 1,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "eventId",
      headerName: "Event Id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      sortable: false,
    },

    {
      field: "",
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
          {/* <Box
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
              onClick={() => setShowUpdateFormCI(true)}
            >
              Update
            </Button>
          </Box> */}
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
        <Tab label="Current Items" />
        <Tab label="Release Items" />
        <Tab label="Events" />
      </Tabs>

      {activeTab === 0 && (
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
            <Link to="generatereport">
              <Button variant="contained" sx={{ marginTop: 2 }}>
                Generate Report
              </Button>
            </Link>
          </Box>

          <UpdateFormCI
            open={showUpdateFormCI}
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
              columns={overview}
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
            itemToUpdate={selectedItems}
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
            itemToUpdate={selectedItems}
          />

          <Items
            open={showForm}
            handleClose={handleCloseForm}
            refetch={refetch}
          />

          {/* <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-modal-title">Add Item</h2>

          <TextField
            label="Item Name"
            variant="outlined"
            name="itemName"
            value={addItem.itemName}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Item Id"
            variant="outlined"
            name="itemId"
            value={addItem.itemId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Donor Id"
            variant="outlined"
            name="donorId"
            value={addItem.donorId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Item Quantity"
            variant="outlined"
            name="itemQuantity"
            value={addItem.itemQuantity}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            name="date"
            value={addItem.date}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          

          <Button variant="contained" onClick={handleAddItem} sx={{ m: 2 }}>
            Add 
          </Button>
          <Button variant="contained" onClick={handleAddItem}>
            close
          </Button>
        </Box>
      </Modal> */}

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
              columns={currentItems}
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

      {activeTab === 3 && (
        <Box>
          <Box
            display="flex"
            flex={1}
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
              Release Item
            </Button>
          </Box>

          <UpdateFormRI
            open={showUpdateFormRI}
            handleClose={handleCloseForm}
            refetch={refetch}
            itemToUpdate={selectedItems}
          />

          <Items_out open={showForm} />

          <Box
            display="flex"
            flex={1}
            justifyContent="flex-end"
            mb={2}
            sx={{
              "& button": {
                backgroundColor: theme.palette.secondary[400],
                color: "white",
              },
            }}
          >
            {/* <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleOpenModal}
        >
         Release Item
        </Button> */}
          </Box>

          <UpdateFormCI
            open={showUpdateFormCI}
            handleClose={handleCloseForm}
            refetch={refetch}
          />

          {/* <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-modal-title">Release Item</h2>
          <TextField
            label="Item Name"
            variant="outlined"
            name="itemName"
            value={releaseItem.itemName}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Item Id"
            variant="outlined"
            name="itemId"
            value={releaseItem.itemId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Event Id"
            variant="outlined"
            name="eventId"
            value={releaseItem.eventId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Item Quantity"
            variant="outlined"
            name="itemQuantity"
            value={releaseItem.itemQuantity}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            name="date"
            value={releaseItem.date}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          

          <Button variant="contained" onClick={handleReleaseItem} sx={{ m: 2 }}>
            Release
          </Button>
          <Button variant="contained" onClick={handleReleaseItem}>
            close
          </Button>
        </Box>
      </Modal> */}

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
              columns={releaseItems}
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

      {activeTab === 4 && (
        <Box>
          <DonorEvents />
        </Box>
      )}
    </Box>
  );
};

export default Inventory;
