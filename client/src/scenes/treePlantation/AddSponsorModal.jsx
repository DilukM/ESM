import { Box, Modal, TextField, Typography, MenuItem, IconButton, Select, InputLabel, FormControl } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from './CustomTextField';
import DropDownTextField from './DropDownTextField';
import Button from 'components/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAddSponsorMutation } from 'state/api';


const AddSponsorModal = ({ openModal, closeModal }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const [eventID, setEventID] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(getCurrentDate());
  const [eventIDError, setEventIDError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  

  const [donations, setDonations] = useState([{ organizationName: '', contactDetails: '', donationDate: getCurrentDate() }]);

  const [addSponsor] = useAddSponsorMutation();

  const validateEventID = (value) => {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(value)) {
      setEventIDError("Event ID can only contain letters and numbers.");
    } else {
      setEventIDError("");
    }
    setEventID(value);
  };

  const validateEventName = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setEventNameError("Event Name can only contain letters and spaces.");
    } else {
      setEventNameError("");
    }
    setEventName(value);
  };

  const handleSave = async () => {
    if (eventIDError || eventNameError) {
      console.error('Validation error:');
      return;
    }
  
    const formData = new FormData();
    formData.append('eventID', eventID);
    formData.append('eventName', eventName);
    formData.append('eventDate', eventDate);
    formData.append('province', province);
    formData.append('district', district);
    formData.append('city', city);
  
    donations.forEach((donation, index) => {
      formData.append(`donations[${index}][organizationName]`, donation.organizationName);
      formData.append(`donations[${index}][contactDetails]`, donation.contactDetails);
      formData.append(`donations[${index}][donationDate]`, donation.donationDate);
    });
  
    try {
      await addSponsor(formData).unwrap();
      closeModal();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };
  

  

  const handleDonationChange = (index, field, value) => {
    const updatedDonations = donations.map((donation, i) =>
      i === index ? { ...donation, [field]: value } : donation
    );
    setDonations(updatedDonations);
  };

  const addDonationField = () => {
    setDonations([...donations, { organizationName: '', contactDetails: '', donationDate: getCurrentDate() }]);
  };

  const removeDonationField = (index) => {
    const updatedDonations = donations.filter((_, i) => i !== index);
    setDonations(updatedDonations);
  };

  return (
    <Modal open={openModal} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: 700,
        height: 600,
        bgcolor: "#fff",
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
        overflowY: "auto",
      }}>
        <h2 id="modal-modal-title">Create Event</h2>
        <Box sx={{ mt: 6 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="event-id-label">Event ID</InputLabel>
            <Select
              labelId="event-id-label"
              id="event-id"
              value={eventID}
              onChange={(e) => validateEventID(e.target.value)}
              label="Event ID"
              error={!!eventIDError}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="event1">Event 1</MenuItem>
              <MenuItem value="event2">Event 2</MenuItem>
              <MenuItem value="event3">Event 3</MenuItem>
            </Select>
            {eventIDError && <Typography color="error">{eventIDError}</Typography>}
          </FormControl>
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Event Name"
            variant="outlined"
            fullWidth
            value={eventName}
            error={!!eventNameError}
            helperText={eventNameError}
            onChange={(e) => validateEventName(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiFormLabel-root": {
                color: "#a3a3a3",
              },
              "& .Mui-focused .MuiFormLabel-root": {
                color: "#d67e75",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000",
                  },
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Date"
            type="date"
            variant="outlined"
            name="date"
            value={eventDate}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: getCurrentDate() },
            }}
            onChange={(e) => setEventDate(e.target.value)}
            sx={{
              mr: 1,
              mb: 2,
              "& .MuiFormLabel-root": {
                color: "#a3a3a3",
              },
              "& .Mui-focused .MuiFormLabel-root": {
                color: "#d67e75",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000",
                  },
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <h3>Location</h3>
          <DropDownTextField
            province={province}
            district={district}
            city={city}
            onProvinceChange={setProvince}
            onDistrictChange={setDistrict}
            onCityChange={setCity}
          />
        </Box>
        
        <Box sx={{ mt: 6 }}>
          <h3>Donation Details</h3>
          {donations.map((donation, index) => (
            <Box key={index} sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
              <CustomTextField
                label="Organization Name"
                variant="outlined"
                fullWidth
                value={donation.organizationName}
                onChange={(e) => handleDonationChange(index, 'organizationName', e.target.value)}
                sx={{ mb: 2 }}
              />
              <CustomTextField
                label="Contact Details"
                variant="outlined"
                fullWidth
                value={donation.contactDetails}
                onChange={(e) => handleDonationChange(index, 'contactDetails', e.target.value)}
                sx={{ mb: 2 }}
              />
              <CustomTextField
                label="Donation Date"
                type="date"
                variant="outlined"
                fullWidth
                value={donation.donationDate}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: getCurrentDate() } }}
                onChange={(e) => handleDonationChange(index, 'donationDate', e.target.value)}
                sx={{ mb: 2 }}
              />
              {index > 0 && (
                <IconButton onClick={() => removeDonationField(index)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button type="button" label="Add Donation" onClick={addDonationField} />
        </Box>

        <Box display="flex" justifyContent="flex-end" sx={{ mt: 6 }}>
          <Button type="button" label="Cancel" onClick={closeModal} sx={{ mr: 3 }} />
          <Box ml={1}>
            <Button type="button" label="Save" onClick={handleSave} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSponsorModal;



