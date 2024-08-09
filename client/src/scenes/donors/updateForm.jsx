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

import { useUpdateDonorMutation } from "state/api";

const UpdateForm = ({
  open,
  handleClose,
  refetch,
  donorToUpdate,
  handleSuccess,
}) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State variables for validation
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [updateDonor] = useUpdateDonorMutation();
  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (donorToUpdate) {
      setName(donorToUpdate.name);
      setEmail(donorToUpdate.email);
      setPhone(donorToUpdate.phone);
    }
  }, [donorToUpdate]);

  const donorId = donorToUpdate ? donorToUpdate._id : "";

  const validateInputs = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate phone
    if (!phone.trim()) {
      setPhoneError("Phone is required");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleUpdateDonor = () => {
    if (validateInputs()) {
      updateDonor({ donorId, name, email, phone })
        .then((response) => {
          console.log("Donor updated successfully:", response);
          // Clear form fields
          setName("");
          setEmail("");
          setPhone("");

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

  const handleCancel = () => {
    // Clear form fields
    setName("");
    setEmail("");
    setPhone("");

    setNameError("");
    setEmailError("");
    setPhoneError("");

    // Close the dialog
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle align="center" sx={{ fontWeight: 700 }}>
        Update Donor
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!nameError}
          helperText={nameError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!emailError}
          helperText={emailError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!phoneError}
          helperText={phoneError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
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

export default UpdateForm;
