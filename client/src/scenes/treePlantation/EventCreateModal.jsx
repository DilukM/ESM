import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "./CustomTextField";
import DropDownTextField from "./DropDownTextField";
import Button from "components/Button";
import { useAddTreeEventMutation } from "state/api";
import { useTheme } from '@mui/material/styles';


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
  const [comments, setComments] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [eventIDError, setEventIDError] = useState("");
  const [eventNameError, setEventNameError] = useState("");
  const [coverImageError, setCoverImageError] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const [addTreeEvent] = useAddTreeEventMutation();

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
      console.error("Validation error:");
      return;
    }

    const formData = new FormData();
    formData.append("eventID", eventID);
    formData.append("eventName", eventName);
    formData.append("eventDate", eventDate);
    formData.append("province", province);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("comments", comments);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      addTreeEvent({
        coverImage,
        eventID,
        eventName,
        eventDate,
        province,
        district,
        city,
        comments,
        
      }).then((response) => {
        console.log("Donor added successfully from frontend:", response);
        closeModal();
        refetch();
      });
      // await addTreeEvent({ eventDetails: formData }).unwrap();
      // console.log(formData);
    } catch (error) {
      console.error("Error saving event:", error);
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
            onChange={(e) => validateEventName(e.target.value)}
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
