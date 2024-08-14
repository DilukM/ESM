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
import EventUpdateForm from "./dEventUpdate";
import {
  useAddDEventMutation,
  useGetDEventsQuery,
  useDeleteDEventMutation,useUpdateDEventMutation
} from "state/api";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.js";



export default function DonorEvents() {
  const theme = useTheme();
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("NULL");
  

  const [addDEvent] = useAddDEventMutation();
  const { data, isLoading, refetch } = useGetDEventsQuery();
  const [rowIndex, setRowIndex] = useState(0); // State for custom index
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedDEvent, setSelectedDEvent] = useState(null);

  const [deleteDEvent] = useDeleteDEventMutation();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
  


  useEffect(() => {
    if (data) {
      setRowIndex(0); // Reset the index when data changes
    }
  }, [data]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCover("");

    setEventName("");
    setDate("");
    setLocation("");
    setDescription("");
    setOpenModal(false);
 
    
  };

  const handleCloseForm = () => {

    setShowUpdateForm(false);
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
    setShowUpdateForm(true);
};

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventDetails((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `donorEvents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCover(downloadURL);
        });
      }
    );
  };

  const handleCreateEvent = () => {
    addDEvent({ eventName, location, date, description, cover })
      .then((response) => {
        console.log(
          "Event added successfully from frontend:",

          eventName,
          location,
          date,
          description,
          cover,
          response
        );
        // Clear form fields
        setCover("");

        setEventName("");
        setDate("");
        setLocation("");
        setDescription("");
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
    { field: "eventName", headerName: "Event", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: " ",
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
        <Box height="80vh">
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={data || []}
            columns={columns1}
            pageSize={5}
            rowCount={(data && data.total) || 0}
            // checkboxSelection

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
            label="Event Name"
            variant="outlined"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            type="date"
            variant="outlined"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Location"
            variant="outlined"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          <progress value={progress} max="100" style={{ width: "100%" }} />
          <Button variant="contained" onClick={handleCreateEvent} sx={{ m: 2 }}>
            Create
          </Button>
          <Button variant="contained" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>
      <EventUpdateForm
            open={showUpdateForm}
            handleClose={handleCloseForm}
            refetch={refetch}
            eventToUpdate={selectedDEvent}
            handleSuccess={handleSuccessUpdate}
            setAlertState={setAlertState}
          />
    </Box>
  );
}
