import React, { useState } from 'react';
import { Box, useTheme, Modal, TextField } from '@mui/material';
import Button from 'components/Button';
import Header from 'components/Header';
import GoogleMap from "components/GoogleMap"; 

const Location = () => {
    const theme = useTheme();
    const [openModal, setOpenModal] = useState(false);
    const [eventDetails, setEventDetails] = useState({
        eventName: "",
        // date: "",
        // location: "",
        // comments: "",
        // coverImage: null,
        // province: "",
        // district: "",
        // town: "",
      });
    

    const handleOpenModal=()=>{
        setOpenModal(true);
    }
     const handleCloseModal=()=>{
        setOpenModal(false);
     }

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

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Tree Plantation" subtitle="Manage tree plantations" />
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
                <Box><h1>Locations</h1></Box>
                <Button label="Create Event" alignment="Right"  onClick={handleOpenModal}/>
                <Box mt={3} sx={{ width: "50%", ml: "auto", mr: "auto", textAlign: "center" }}>
                    <GoogleMap />
                    <Box mt={3}>
                        <Button label="Search" alignment="center" />
                    </Box>
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
            sx={{ mr: 1,mb: 2  }}
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
            sx={{ mr: 1,mb: 2  }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}> {/* Align buttons to the right */}
            <Button label="Cancel" alignment="right" onClick={handleCloseModal} sx={{ marginRight: '10px' }} /> {/* Add margin-right */}
            <Button label="Next" alignment="Right" onClick={handleCreateEvent}/>
          </Box>
        </Box>
      </Modal>
        </Box>
    );
};

export default Location;
