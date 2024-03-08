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

import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";

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

export default function RoEvents() {
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
  };

  const columns1 = [
    {
      field: "coverImage",
      headerName: "Cover Image",
      width: 200,
      renderCell: (params) => (
        <div>
          <div>{params.row.id}</div> {/* Display Event ID */}
          <img
            src={params.value}
            alt="Cover"
            style={{ width: "50%", height: "auto" }}
          />
        </div>
      ),
    },
    { field: "eventName", headerName: "Event_Name ", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "Description", headerName: "Description", width: 200 },
  ];

  const columns2 = [
    {
      field: "coverImage",
      headerName: "Cover Image",
      width: 200,
      renderCell: (params) => (
        <div>
          <div>{params.row.id}</div> {/* Display Event ID */}
          <img
            src={params.value}
            alt="Cover"
            style={{ width: "50%", height: "auto" }}
          />
        </div>
      ),
    },
    { field: "eventName", headerName: "Event ", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "Description", headerName: "Description", width: 200 },
  ];

  const rows1 = [
    {
      id: 1,
      coverImage:
        "data:image/jpeg;base64,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",
      eventName: "Event 1",
      date: "2024-02-21",
      location: "Location 1",
    },
    {
      id: 2,
      coverImage:
        "data:image/jpeg;base64,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",
      eventName: "Event 2",
      date: "2024-02-22",
      location: "Location 2",
    },
    {
      id: 3,
      coverImage:
        "data:image/jpeg;base64,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",
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
          Create Event
        </Button>
      </Box>
      <Box mt={2}>
        <Box height="80vh" position={"relative"}>
          <DataGrid
            rows={rows1}
            columns={columns1}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            getRowHeight={() => 150}
          />
        </Box>
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
          <h2 id="modal-modal-title">Create New Event</h2>
          <TextField
            label="Event ID"
            variant="outlined"
            name="eventID"
            value={eventDetails.eventName}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Event Name"
            variant="outlined"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Box mr={2}>
              <TextField
                label="Province"
                variant="outlined"
                name="province"
                value={eventDetails.province}
                onChange={handleInputChange}
              />
            </Box>
            <Box mr={2}>
              <TextField
                label="District"
                variant="outlined"
                name="district"
                value={eventDetails.district}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                label="Town"
                variant="outlined"
                name="town"
                value={eventDetails.town}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
          <TextField
            label="Comments"
            variant="outlined"
            name="comments"
            value={eventDetails.comments}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            type="file"
            label="Cover Image"
            variant="outlined"
            name="coverImage"
            onChange={handleFileInputChange}
            fullWidth
            rows={4}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
            
          />

          <Button variant="contained" onClick={handleCreateEvent} sx={{ m: 2 }}>
            Create
          </Button>
          <Button variant="contained" onClick={handleCreateEvent}>
            close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
