import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useUpdateTreeEventMutation } from 'state/api'; // Import the update mutation

const EventUpdateModal = ({ openModal, closeModal, eventDetails, refetch }) => {

  console.log(eventDetails);
  const [updatedEvent, setUpdatedEvent] = useState(eventDetails || {});
  const [updateEvent, { isLoading, isError, isSuccess }] = useUpdateTreeEventMutation(); // Use the mutation

  useEffect(() => {
    setUpdatedEvent(eventDetails || {});
  }, [eventDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateEvent(updatedEvent).unwrap();
      if (response) {
        console.log('Event successfully updated:', response);
        refetch(); // Optionally refetch data if needed
        closeModal();
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Update Event
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="eventName"
            label="Event Name"
            value={updatedEvent.eventName || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="eventDate"
            label="Event Date"
            type="date"
            value={updatedEvent.eventDate || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="province"
            label="Province"
            value={updatedEvent.province || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="district"
            label="District"
            value={updatedEvent.district || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="city"
            label="City"
            value={updatedEvent.city || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="comments"
            label="Comments"
            value={updatedEvent.comments || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}  // Add gap between buttons if needed
        >
          <Button variant="contained" color="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </Box>
        {isError && (
          <Typography color="error" variant="body2" mt={2}>
            Failed to update the event. Please try again.
          </Typography>
        )}
        {/* {isSuccess && (
          // <Typography color="success" variant="body2" mt={2}>
          //   Event updated successfully!
          // </Typography>
        )} */}
      </Box>
    </Modal>
  );
};

export default EventUpdateModal;
