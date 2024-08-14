import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";

import { useUpdateDEventMutation } from "state/api";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.js";

const EventUpdateForm = ({
  open,
  handleClose,
  refetch,
  eventToUpdate,
  handleSuccess,
}) => {
  const theme = useTheme();
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("NULL");

  const [progress, setProgress] = useState(0);

  // State variables for validation
  const [eventNameError, setEventNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [updateDonor] = useUpdateDEventMutation();

  
  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (eventToUpdate) {
      setEventName(eventToUpdate.eventName);
      setDate(eventToUpdate.date);
      setLocation(eventToUpdate.location);
      setDescription(eventToUpdate.description);
      setCover(eventToUpdate.cover);
    }
  }, [eventToUpdate]);

  const donorId = eventToUpdate ? eventToUpdate._id : "";

  const validateInputs = () => {
    let isValid = true;

    // Validate name
    if (!eventName.trim()) {
      setEventNameError("Event Name is required");
      isValid = false;
    } else {
      setEventNameError("");
    }

    // Validate email
    if (!date.trim()) {
      setDateError("Date is required");
      isValid = false;
    }  else {
      setDateError("");
    }

    // Validate phone
    if (!location.trim()) {
      setLocationError("Location is required");
      isValid = false;
    } else {
      setLocationError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleUpdateDonor = () => {
    if (validateInputs()) {
      updateDonor({ id:donorId, eventName,date,location,description,cover })
        .then((response) => {
          console.log("Donor updated successfully:", response);
          // Clear form fields
          setEventName("");
      setDate("");
          setLocation("");
      setDescription("");
      setCover("");

          // Close the dialog
          handleClose();
          // Refetch the donors list
          refetch();
          handleSuccess();
        })
        .catch((error) => {
          console.error("Error updating donor:", error);
        });
    }
  };

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

  const handleCancel = () => {
    // Clear form fields
    setEventName("");
    setDate("");
    setLocation("");
    setDescription("");
    setCover("");

    setEventNameError("");
      setDateError("");
      setLocationError("");
      setDescriptionError("");
 

    // Close the dialog
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle align="center" sx={{ fontWeight: 700 }}>
        Update Event
      </DialogTitle>
      <DialogContent>
      <TextField
            label="Event Name"
            variant="outlined"
            margin="normal"
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
      </DialogContent>
      <DialogActions>
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
            color="primary"
            onClick={handleUpdateDonor}
          >
            Update
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
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EventUpdateForm;
