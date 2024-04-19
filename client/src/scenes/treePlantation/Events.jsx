import React, { useState } from "react";
import {
  Box,
  useTheme,
  Tab,
  Tabs,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

function TabPanel({ value, index, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function Events() {
  const theme = useTheme();
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: "",
    location: "",
    comments: "",
    coverImage: null,
    province: "",
    district: "",
    town: "",
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const handleMouseEnterBtn = () => {
    setIsHoveredBtn(true);
    setTabValue(0);
  };

  const handleMouseLeaveBtn = () => {
    setIsHoveredBtn(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRowClick = (params) => {
    setSelectedEvent(params.row); // Set the selected event details
    setOpenDetailsModal(true); // Open the details modal
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setEventDetails((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleCreateEvent = () => {
    // Here you can perform actions with eventDetails like sending it to an API
    console.log(eventDetails);
    handleCloseModal();
  };

  const handleViewClick = (id) => {
    // Handle view action
    console.log("View clicked for event with id:", id);
  };

  const handleUpdateClick = (id) => {
    // Handle update action
    console.log("Update clicked for event with id:", id);
  };

  const handleDeleteClick = (id) => {
    // Handle delete action
    console.log("Delete clicked for event with id:", id);
  };

  const btnBoxStyle = {
    marginTop: "20px",
    marginRight: "20px",
    backgroundColor: isHoveredBtn ? "grey" : theme.palette.secondary[400],
    position: "absolute",
    top: "35px",
    right: 0,
    color: "white",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 10px",
    borderRadius: "5px",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary[400],
    },
  };

  const columns1 = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "coverImage",
      headerName: "Cover Image",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            src={params.value}
            alt="Cover"
            style={{ width: "50%", height: "auto" }}
          />
        </div>
      ),
    },
    { field: "eventName", headerName: "Event", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Box display="flex" justifyContent="space-around">
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
                // onClick={() => setShowUpdateForm(true)}
              >
                Update
              </Button>
            </Box>
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
                // onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "coverImage",
      headerName: "Cover Image",
      width: 200,
      renderCell: (params) => (
        <div>
          <img
            src={params.value}
            alt="Cover"
            style={{ width: "50%", height: "auto" }}
          />
        </div>
      ),
    },
    { field: "eventName", headerName: "Event", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Box display="flex" justifyContent="space-around">
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
                // onClick={() => setShowUpdateForm(true)}
              >
                Update
              </Button>
            </Box>
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
                // onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </div>
      ),
    },
  ];

  const rows1 = [
    {
      id: 1,
      coverImage:
        "sacdvffbgnhj",
      eventName: "Event 1",
      date: "2024-02-21",
      location: "Location 1",
    },
    {
      id: 2,
      coverImage:
        "fdcsx",
      eventName: "Event 2",
      date: "2024-02-22",
      location: "Location 2",
    },
    {
      id: 3,
      coverImage:
        "fvghb",
      eventName: "Event 3",
      date: "2024-02-23",
      location: "Location 3",
    },
  ];

  const rows2 = [
    {
      id: 1,
      coverImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsvpLqVWw7G39MEpDHK4StplqBs2Mot6fxYkU_s2Fi9oiTMlmarVSZ3VzsYA&s",
      eventName: "Event 1",
      date: "2024-02-21",
      location: "Location 1",
    },
    {
      id: 2,
      coverImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFRkOsQlMqlHvrYlAa7D62gVATxQbgBgTeYhuRJd46MrcL_3oVAT3Lw1UOQ&s",
      eventName: "Event 2",
      date: "2024-02-22",
      location: "Location 2",
    },
    {
      id: 3,
      coverImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWbPff4NcGRaa-jsM84ISSl_np37VsToO-B8bHqgWn0qQR4Z6vDEaZv9J9g&s",
      eventName: "Event 3",
      date: "2024-02-23",
      location: "Location 3",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem" position="relative">
      <Header title="Tree Plantation" subtitle="Manage tree plantations" />
      <Box
        className="btnBox"
        style={btnBoxStyle}
        onMouseEnter={handleMouseEnterBtn}
        onMouseLeave={handleMouseLeaveBtn}
      ></Box>
      <Box mt={2}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: { background: theme.palette.secondary[400] },
          }}
        >
          <Tab
            label="Events"
            sx={{
              color:
                tabValue === 0
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              "&.Mui-selected": {
                color: theme.palette.secondary[400],
              },
            }}
          />
          <Tab
            label="Upcoming Events"
            sx={{
              color:
                tabValue === 1
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
              "&.Mui-selected": {
                color: theme.palette.secondary[400],
              },
            }}
          />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Box height="80vh">
            <DataGrid
              rows={rows1}
              columns={columns1}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              getRowHeight={() => 150}
              onRowClick={handleRowClick}
            />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box height="80vh">
            <DataGrid
              rows={rows2}
              columns={columns2}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              getRowHeight={() => 150}
              onRowClick={handleRowClick}
            />
          </Box>
        </TabPanel>
      </Box>
      <Modal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-modal-title">Event Details</h2>
          <p>ID: {selectedEvent?.id}</p>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              src={selectedEvent?.coverImage}
              alt="Cover"
              style={{ width: "100%" }}
            />
          </div>
          <p>Event Name: {selectedEvent?.eventName}</p>
          <p>Date: {selectedEvent?.date}</p>
          <p>Location: {selectedEvent?.location}</p>
        </Box>
      </Modal>
    </Box>
  );
}
