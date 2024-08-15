import { Box, Modal, TextField, Typography, Grid, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTextField from "./CustomTextField";
import Button from "components/Button";
import { useAddTreeEventMutation, useGetLastEventQuery } from "state/api";
import { useTheme } from "@mui/material/styles";

const generateNextId = (lastId) => {
  const idNumber = parseInt(lastId.split("-")[2], 10);
  const nextIdNumber = (idNumber + 1).toString().padStart(6, "0");
  return `MD-TE-${nextIdNumber}`;
};

const sriLankanData = {
  "Western": {
    "Colombo": ["Colombo 1", "Colombo 2", "Colombo 3", "Colombo 4", "Colombo 5", "Colombo 6", "Colombo 7", "Colombo 8", "Colombo 9", "Colombo 10", "Colombo 11", "Colombo 12", "Colombo 13", "Colombo 14", "Colombo 15"],
    "Gampaha": ["Negombo", "Gampaha", "Veyangoda", "Wattala", "Minuwangoda", "Ja-Ela", "Kadawatha", "Ragama", "Divulapitiya", "Nittambuwa", "Kiribathgoda"],
    "Kalutara": ["Kalutara", "Panadura", "Horana", "Beruwala", "Aluthgama", "Matugama", "Wadduwa", "Bandaragama", "Ingiriya"]
  },
  "Central": {
    "Kandy": ["Kandy", "Gampola", "Nawalapitiya", "Peradeniya", "Akurana", "Kadugannawa", "Katugastota"],
    "Matale": ["Matale", "Dambulla", "Sigiriya", "Nalanda", "Ukuwela", "Rattota"],
    "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Nanu Oya", "Talawakele", "Bandarawela", "Welimada"]
  },
  "Southern": {
    "Galle": ["Galle", "Hikkaduwa", "Ambalangoda", "Elpitiya", "Bentota", "Baddegama"],
    "Matara": ["Matara", "Weligama", "Mirissa", "Akurugoda", "Hakmana", "Devinuwara"],
    "Hambantota": ["Hambantota", "Tangalle", "Tissamaharama", "Ambalantota", "Beliatta", "Weeraketiya"]
  },
  "Northern": {
    "Jaffna": ["Jaffna", "Nallur", "Chavakachcheri", "Point Pedro", "Karainagar", "Velanai"],
    "Kilinochchi": ["Kilinochchi", "Pallai", "Paranthan", "Poonakary"],
    "Mannar": ["Mannar", "Nanattan", "Madhu", "Pesalai"],
    "Vavuniya": ["Vavuniya", "Nedunkeni", "Settikulam", "Vavuniya South"],
    "Mullaitivu": ["Mullaitivu", "Oddusuddan", "Puthukudiyiruppu", "Weli Oya"]
  },
  "Eastern": {
    "Trincomalee": ["Trincomalee", "Kinniya", "Mutur", "Kuchchaveli"],
    "Batticaloa": ["Batticaloa", "Kaluwanchikudy", "Valachchenai", "Eravur"],
    "Ampara": ["Ampara", "Akkaraipattu", "Kalmunai", "Sainthamaruthu", "Pottuvil"]
  },
  "North Western": {
    "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala", "Wariyapola", "Pannala", "Melsiripura"],
    "Puttalam": ["Puttalam", "Chilaw", "Wennappuwa", "Anamaduwa", "Nattandiya", "Dankotuwa"]
  },
  "North Central": {
    "Anuradhapura": ["Anuradhapura", "Kekirawa", "Thambuttegama", "Eppawala", "Medawachchiya"],
    "Polonnaruwa": ["Polonnaruwa", "Kaduruwela", "Medirigiriya", "Hingurakgoda"]
  },
  "Uva": {
    "Badulla": ["Badulla", "Bandarawela", "Haputale", "Welimada", "Mahiyanganaya", "Passara"],
    "Monaragala": ["Monaragala", "Bibile", "Wellawaya", "Medagama", "Buttala"]
  },
  "Sabaragamuwa": {
    "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda", "Pelmadulla", "Eheliyagoda", "Kuruwita"],
    "Kegalle": ["Kegalle", "Mawanella", "Warakapola", "Rambukkana", "Galigamuwa"]
  }
};


const EventCreateModal = ({ openModal, closeModal, refetch }) => {
  const theme = useTheme();

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
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [comments, setComments] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [eventIDError, setEventIDError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [cityError, setCityError] = useState("");
  const [coverImageError, setCoverImageError] = useState("");
  const [city, setCity] = useState("");
  const { data: lastEvent, isSuccess } = useGetLastEventQuery();

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [addTreeEvent] = useAddTreeEventMutation();

  useEffect(() => {
    if (isSuccess && lastEvent) {
      setEventID(generateNextId(lastEvent.eventID));
    } else {
      setEventID("MD-TE-000001");
    }
  }, [lastEvent, isSuccess]);

  useEffect(() => {
    if (province) {
      setDistricts(Object.keys(sriLankanData[province]));
    } else {
      setDistricts([]);
    }
    setDistrict("");
    setCity("");
  }, [province]);

  useEffect(() => {
    if (district) {
      setCities(sriLankanData[province][district]);
    } else {
      setCities([]);
    }
    setCity("");
  }, [district]);

  const validateEventID = (value) => {
    if (!value) {
      setEventIDError("Event ID is required.");
    } else {
      setEventIDError("");
    }
    setEventID(value);
  };

  const validateEventName = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!value) {
      setEventNameError("Event Name is required.");
    } else if (!regex.test(value)) {
      setEventNameError("Event Name can only contain letters and spaces.");
    } else {
      setEventNameError("");
    }
    setEventName(value);
  };

  const validateProvince = (value) => {
    if (!value) {
      setProvinceError("Province is required.");
    } else {
      setProvinceError("");
    }
    setProvince(value);
  };

  const validateDistrict = (value) => {
    if (!value) {
      setDistrictError("District is required.");
    } else {
      setDistrictError("");
    }
    setDistrict(value);
  };

  const validateCity = (value) => {
    if (!value) {
      setCityError("City is required.");
    } else {
      setCityError("");
    }
    setCity(value);
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setCoverImage(file);
  //     setCoverImageError("");
  //   } else {
  //     setCoverImage(null);
  //     setCoverImageError("Please select an image.");
  //   }
  // };

  const handleSave = async () => {
    validateEventID(eventID);
    validateEventName(eventName);
    validateProvince(province);
    validateDistrict(district);
    validateCity(city);
  
    if (
      !eventIDError &&
      !eventNameError &&
      !provinceError &&
      !districtError &&
      !cityError 
     
    ) {
      try {
        const formData = {
        
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          comments,
        };
  
        const response = await addTreeEvent(formData).unwrap();
  
        if (response) {
          console.log("Event successfully saved:", response);
  
          // Reset form fields
          setEventID("");
          setEventName("");
          setProvince("");
          setDistrict("");
          setCity("");
          setComments("");
         
  
          refetch();
          closeModal();
        }
      } catch (error) {
        console.error("Failed to save event:", error);
  
        // Optionally, you can display the error to the user
        setCoverImageError("Failed to save the event. Please try again.");
      }
    } else {
      console.log("Validation errors:", {
        eventIDError,
        eventNameError,
        provinceError,
        districtError,
        cityError,
        
      });
    }
  };
  


  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Create New Event
        </Typography>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Event ID"
            value={eventID}
            onChange={(e) => validateEventID(e.target.value)}
            fullWidth
            error={Boolean(eventIDError)}
            helperText={eventIDError}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Event Name"
            value={eventName}
            onChange={(e) => validateEventName(e.target.value)}
            fullWidth
            error={Boolean(eventNameError)}
            helperText={eventNameError}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <CustomTextField
            label="Event Date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Location:
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CustomTextField
                  select
                  label="Province"
                  value={province}
                  onChange={(e) => validateProvince(e.target.value)}
                  fullWidth
                  error={Boolean(provinceError)}
                  helperText={provinceError}
                >
                  {Object.keys(sriLankanData).map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomTextField
                  select
                  label="District"
                  value={district}
                  onChange={(e) => validateDistrict(e.target.value)}
                  fullWidth
                  error={Boolean(districtError)}
                  helperText={districtError}
                  disabled={!province}
                >
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomTextField
                  select
                  label="Town"
                  value={city}
                  onChange={(e) => validateCity(e.target.value)}
                  fullWidth
                  error={Boolean(cityError)}
                  helperText={cityError}
                  disabled={!district}
                >
                  {cities.map((town) => (
                    <MenuItem key={town} value={town}>
                      {town}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Comments"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            fullWidth
          />
        </Box>

        
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="button"
            label="Cancel"
            onClick={closeModal}
            sx={{ mr: 3 }}
          />
          <Box ml={1}>
            <Button type="button" label="Save" onClick={handleSave} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventCreateModal;
