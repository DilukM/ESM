import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import CustomTextField from "./CustomTextField";
import DropDownTextField from "./DropDownTextField";
import Button from "components/Button";
import { useAddTreeEventMutation,useGetLastEventQuery } from "state/api";
import { useTheme } from '@mui/material/styles';

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

  const generateNextId = (lastId) => {
    const idNumber = parseInt(lastId.split('-')[2], 10);
    const nextIdNumber = (idNumber + 1).toString().padStart(6, '0');
    return `MD-TE-${nextIdNumber}`;
  };


  const [eventID, setEventID] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(getCurrentDate());
  const [comments, setComments] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [eventIDError, setEventIDError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [eventDateError,setEventDateError] = useState("");
  const[provinceError,setProvinceError]=useState("");
  const[districtError,setDistrictError] = useState("");
  const[cityError,setCityError] = useState("");
  const [coverImageError, setCoverImageError] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const [addTreeEvent] = useAddTreeEventMutation();
  const { data: lastEvent, isSuccess } = useGetLastEventQuery();

  useEffect(() => {
    if (isSuccess && lastEvent) {
      setEventID(generateNextId(lastEvent.eventID));
    } else {
      setEventID("MD-TE-000001");
    }
  }, [lastEvent, isSuccess]);


  const validateEventID = (value) => {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(value)) {
      setEventIDError("Event ID can only contain letters and numbers.");
    } else {
      setEventIDError("");
    }
    setEventID(value);
  };

  const validateEventName = (eventName) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(eventName)) {
      setEventNameError("Event Name can only contain letters and spaces.");
    } else {
      setEventNameError("");
    }
    setEventName(eventName);
  };

  const handleSave = async () => {
    let isValid = true;
  
    if (!eventID) {
      setEventIDError("Event ID is required.");
      isValid = false;
    } else {
      setEventIDError("");
    }
  
    if (!eventName) {
      setEventNameError("Event Name is required.");
      isValid = false;
    } else {
      setEventNameError("");
    }
  
    if (!eventDate) {
      setEventDateError("Event Date is required.");
      isValid = false;
    } else {
      setEventDateError("");
    }
  
    if (!province) {
      setProvinceError("Province is required.");
      isValid = false;
    } else {
      setProvinceError("");
    }
  
    if (!district) {
      setDistrictError("District is required.");
      isValid = false;
    } else {
      setDistrictError("");
    }
  
    if (!city) {
      setCityError("City is required.");
      isValid = false;
    } else {
      setCityError("");
    }
  
    if (!coverImage) {
      setCoverImageError("Cover Image is required.");
      isValid = false;
    } else {
      setCoverImageError("");
    }
  
    if (isValid) {
      const formData = new FormData();
      formData.append("eventID", eventID);
      formData.append("eventName", eventName);
      formData.append("eventDate", eventDate);
      formData.append("province", province);
      formData.append("district", district);
      formData.append("city", city);
      formData.append("comments", comments);
      formData.append("coverImage", coverImage);
  
      try {
        await addTreeEvent({
          coverImage,
          eventID,
          eventName,
          eventDate,
          province,
          district,
          city,
          comments,
        }).then((response) => {
          console.log("Event added successfully:", response);
          closeModal();
          refetch();
        });
      } catch (error) {
        console.error("Error saving event:", error);
      }
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setCoverImageError("Only JPEG, PNG, and GIF formats are allowed.");
      setCoverImage(null);
      return;
    }

    setCoverImageError("");
    setCoverImage(file);
  };

  return (
    // <Box  sx={{
    //   "& .MuiDataGrid-root": {
    //     border: "none",
    //   },
    //   "& .MuiDataGrid-cell": {
    //     borderBottom: "none",
    //   },
    //   "& .MuiDataGrid-columnHeaders": {
    //     backgroundColor: theme.palette.background.alt,
    //     color: theme.palette.secondary[100],
    //     borderBottom: "none",
    //   },
    //   "& .MuiDataGrid-virtualScroller": {
    //     backgroundColor: theme.palette.primary.light,
    //   },
    //   "& .MuiDataGrid-footerContainer": {
    //     backgroundColor: theme.palette.background.alt,
    //     color: theme.palette.secondary[100],
    //     borderTop: "none",
    //   },
    //   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    //     color: `${theme.palette.secondary[200]} !important`,
    //   },
    // }}>
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
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
        
            "&.Mui-focused": { color: "#d67e75" },
            "&.MuiInputLabel-shrink": { color: "#d67e75" },
          
          
        }}
      >
        <h2 id="modal-modal-title">Create Event</h2>
        <Box sx={{ mt: 6 }} >
          <CustomTextField
            label="Event ID"
            variant="outlined"
            fullWidth
            value={eventID}
            error={!!eventIDError}
            helperText={eventIDError}
            onChange={(e) => validateEventID(e.target.value)}
            sx={{
              mb: 2,"& .MuiFormLabel-root": {
                color: "#a3a3a3",
              },
              "& .Mui-focused .MuiFormLabel-root": {
                color: "#0101",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000",
                  },
                },
              },
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
          />
        </Box>
        <Box sx={{ mt: 6 }}>
          <CustomTextField
            label="Event Name"
            variant="outlined"
            fullWidth
            value={eventName}
            error={!!eventNameError}
            helperText={eventNameError}

            onChange={(e) => {
              setEventName(e.target.value);
              setEventNameError(validateEventName(e.target.value));
            }}
            
            
            sx={{
              mb: 2,
              "& .MuiFormLabel-root": {
                color: "#a3a3a3",
              },
              "& .Mui-focused .MuiFormLabel-root": {
                color: "#0101",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000",
                  },
                },
              },
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
            error={!!eventNameError}
            helperText={eventNameError}
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
        <Box sx={{ mt: 6}}>
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
          <TextField
            label="Comments"
            variant="outlined"
            name="comments"
            value={comments}
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setComments(e.target.value)}
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
          <TextField
            type="file"
            label="Cover Image"
            variant="outlined"
            name="coverImage"
            fullWidth
            accept="image/*"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleImageChange}
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
          {coverImageError && (
            <Typography variant="body2" color="error">
              {coverImageError}
            </Typography>
          )}
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
    // </Box>
  );
};

export default EventCreateModal;
