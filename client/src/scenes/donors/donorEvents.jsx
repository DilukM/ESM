import React, { useState, useEffect } from "react";
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
import {
  useAddDEventMutation,
  useGetDEventsQuery,
  useDeleteDEventMutation,
} from "state/api";

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

export default function DonorEvents() {
  const theme = useTheme();
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  // const [cover, setCover] = useState();

  const [eventDetails, setEventDetails] = useState({
    id: "",
    eventName: "",
    date: "",
    location: "",
    description: "",
    cover: "NULL",
  });

  const [addDEvent] = useAddDEventMutation();
  const { data, isLoading, refetch } = useGetDEventsQuery();
  const [rowIndex, setRowIndex] = useState(0); // State for custom index
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDEvent, setSelectedDEvent] = useState(null);

  const [deleteDEvent] = useDeleteDEventMutation();
  const handleMouseEnterBtn = () => {
    setIsHoveredBtn(true);
    setTabValue(0);
  };

  const handleMouseLeaveBtn = () => {
    setIsHoveredBtn(false);
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventDetails((prev) => ({
        ...prev,
        cover: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (donorId) => {
    deleteDEvent(donorId)
      .unwrap()
      .then((response) => {
        console.log("Donor deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
      });
  };

  const handleUpdateClick = (donor) => {
    setSelectedDEvent(donor); // Set the selected donor data
    setShowUpdateForm(true); // Show the update form
  };

  const handleCreateEvent = () => {
    addDEvent({ eventDetails })
      .then((response) => {
        console.log("Event added successfully from frontend:", response);
        // Clear form fields
        setEventDetails("");
        // Close the dialog
        handleCloseModal();
        // Refetch the event list
        refetch();
      })
      .catch((error) => {
        console.error("Error adding Event:", error);
      });
  };

  const columns1 = [
    {
      field: "cover",
      headerName: "Cover Image",
      width: 200,
      renderCell: (params) => (
        <div>
          {/* cd client */}
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
    { field: "description", headerName: "Description", width: 200 },
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
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={data || []}
            columns={columns1}
            pageSize={5}
            rowCount={(data && data.total) || 0}
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
            name="id"
            value={eventDetails.id}
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
            type="date"
            variant="outlined"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            fullWidth
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
                label="Location"
                variant="outlined"
                name="location"
                value={eventDetails.location}
                onChange={handleInputChange}
              />
            </Box>
          </Box>
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            type="file"
            variant="outlined"
            name="coverImage"
            onChange={handleFileInputChange}
            fullWidth
            sx={{ mb: 2 }}
            rows={4}
          />

          <Button variant="contained" onClick={handleCreateEvent} sx={{ m: 2 }}>
            Create
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
