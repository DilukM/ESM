import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import GoogleMap from "components/GoogleMap"; 
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useNavigate } from "react-router-dom"; 


import { Avatar, Button, Tab, Tabs, Typography,Modal,
  TextField} from "@mui/material";
  import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Reports1 from "./Reports1"; // Update the path based on your project structure
import { Link } from "react-router-dom";
import RoEvents from "./RoEvents";

const RoPlants = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [isHoveredReport, setIsHoveredReport] = useState(false);
  const navigate = useNavigate();


  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleMouseEnterReport1 = () => {
    setIsHoveredReport(true);
  };

  const handleMouseLeaveReport1 = () => {
    setIsHoveredReport(false);
  };

  //Add location...
  const [addlocation, setAddlocation] = useState({
    Name: "",
    date: "",
    itemId: "",
    donorId: "",
    itemQuantity: "",
   
  });
//Release Item...
  {/*const [releaseItem, setReleaseItem] = useState({
    itemName: "",
    date: "",
    itemId: "",
    eventId: "",
    itemQuantity: "",
   
  });*/}

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
//Add Item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddlocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAddlocation((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleAddlocation = () => {
    
    console.log(addlocation);
    handleCloseModal();
  };
//Release Item
  {/*const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setReleaselocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange1 = (e) => {
    const file = e.target.files[0];
    setReleaselocation((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleReleaselocation= () => {
    
    console.log(setReleaselocation);
    handleCloseModal();
  };
*/}
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "ProjectName",
      headerName: "Project_name",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "Province",
      headerName: "Province",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "District",
      headerName: "District",
      flex: 1,
      
    },
    {
      field: "Town",
      headerName: "Town",
      flex: 1,
      
    },
    {
      field: "Category",
      headerName: "Category",
      flex: 1,
      
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Ro_Plants"
        subtitle="Located Ro_plants"
      />
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="standard"
        indicatorColor="secondary"
        textColor="Primary"
        aria-label="Donor management tabs"
      >
        <Tab label="Map" />
        <Tab label="OverView" />
        <Tab label="Location" />
        <Tab label="Events" />
      </Tabs>


{activeTab === 0 && (
    
          <Box >
          <GoogleMap />
        </Box>
    
      )}
      {/*Overview...*/}
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
            
              <Button variant="contained" sx={{ marginTop: 2 }}
              onMouseEnter={handleMouseEnterReport1}
              onMouseLeave={handleMouseLeaveReport1}
              onClick={() => navigate('/Reports1')} >
                View Report
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
              columns={columns}
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


{/*Location*/}
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
          onClick={handleOpenModal}
        >
         Add Location
        </Button>
          </Box>

          <Modal
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
          <h2 id="modal-modal-title">Add Location</h2>

          <TextField
            label="Id"
            variant="outlined"
            name="ProjectId"
            value={addlocation.ProjectId}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="ProjectName"
            variant="outlined"
            name="ProjectName"
            value={addlocation.ProjectName}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Create_At"
            type="date"
            variant="outlined"
            name="date"
            value={addlocation.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Province"
            variant="outlined"
            name="Province"
            value={addlocation.Province}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}

            
          />
        
          <TextField
            label="District"
            variant="outlined"
            name="District"
            value={addlocation.District}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Town"
            variant="outlined"
            name="Town"
            value={addlocation.Town}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            variant="outlined"
            name="Category"
            value={addlocation.Category}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          

          <Button variant="contained" onClick={handleAddlocation} sx={{ m: 2 }}>
            Add 
          </Button>
          <Button variant="contained" onClick={handleAddlocation}>
            close
          </Button>
        </Box>
      </Modal>

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
              columns={columns}
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

     {/* {activeTab === 2 && (
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
          onClick={handleOpenModal}
        >
         Release Item
        </Button>
      </Box>

      <Modal
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
      </Modal>

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
              columns={columns}
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
      )}*/}

      {activeTab === 3 && (
        <Box>
          <RoEvents />
        </Box>
      )}

    </Box>
  );
};

export default RoPlants;
