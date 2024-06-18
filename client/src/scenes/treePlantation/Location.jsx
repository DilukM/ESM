import React, { useState } from 'react';
import axios from 'axios';
import { Box, useTheme, Modal, TextField, colors } from '@mui/material';
import Header from 'components/Header';
import GoogleMap from 'components/GoogleMap';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

const Location = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventID:"",
    eventName: "",
    date:"",
    province:"",
    district:"",
    town: "",
    comments:"",
    coverImage:"",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('/location', eventDetails);
      console.log('Event created:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Tree Plantation" subtitle="Manage tree plantations" />
      <Box>
      <p sx={{ color: colors.blue[500], textDecoration: 'none' }}>
   
    <Link to="./Event" sx={{ color: colors.blue[500], textDecoration: 'none' }}>Index</Link>
    /
    <Link to="./Location" sx={{ color: colors.blue[500], textDecoration: 'none' }}>Location</Link>
  </p>
</Box>
      <Box mt="40px" height="75vh">
        <Box><h1>Locations</h1></Box>
       
        <Box position="absolute" top="220px" right="20px">
          <Button label="Create Event" onClick={handleOpenModal} />
        </Box>
        <Box mt={5} sx={{ width: "50%", ml: "auto", mr: "auto", textAlign: "center" }}>
          <GoogleMap />
          <Box mt={3}>
            <Button label="Search" />
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 id="modal-modal-title">Create New Event</h2>
          <form onSubmit={handleCreateEvent}>
            <Box>
              <TextField
                label="Event ID"
                variant="outlined"
                name="eventID"
                value={eventDetails.eventID}
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
                sx={{ mr: 1, mb: 2  }}
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
                onChange={handleInputChange}
                fullWidth
                rows={4}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mr: 1, mb: 2  }}
              />
              <Box display="flex" justifyContent="flex-end"> {/* Added to align buttons */}
                <Button type="button" label="Cancel" onClick={handleCloseModal}  sx={{ mr: 3 }}/> {/* Changed type to "button" */}
                <Box ml={1}> {/* Added box to create a gap */}
                  <Button type="submit" label="Save" />
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Location;
