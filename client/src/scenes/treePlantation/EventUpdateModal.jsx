import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const EventUpdateModal = ({ openModal, closeModal, eventDetails, updateEvent }) => {
  const [updatedEvent, setUpdatedEvent] = useState(eventDetails || {});

  useEffect(() => {
    setUpdatedEvent(eventDetails || {});
  }, [eventDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  const handleUpdate = () => {
    updateEvent(updatedEvent);
    closeModal();
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Update Event
        </Typography>
        <TextField
          name="eventName"
          label="Event Name"
          value={updatedEvent.eventName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="eventDate"
          label="Event Date"
          value={updatedEvent.eventDate || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="province"
          label="Province"
          value={updatedEvent.province || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="district"
          label="District"
          value={updatedEvent.district || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="city"
          label="City"
          value={updatedEvent.city || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="comments"
          label="Comments"
          value={updatedEvent.comments || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="coverImage"
          label="Cover Image URL"
          value={updatedEvent.coverImage || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventUpdateModal;
