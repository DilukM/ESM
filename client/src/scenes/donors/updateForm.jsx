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

const UpdateForm = ({ open, handleClose, refetch, donorToUpdate }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [updateDonor] = useUpdateDonorMutation();
  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (donorToUpdate) {
      setName(donorToUpdate.name);
      setEmail(donorToUpdate.email);
      setPhone(donorToUpdate.phone);
      setPassword(donorToUpdate.password);
    }
  }, [donorToUpdate]);

  const donorId = donorToUpdate._id;

  const handleUpdateDonor = () => {
    updateDonor({ donorId, name, email, phone, password })
      .then((response) => {
        console.log("Donor updated successfully:", response);
        // Clear form fields
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        // Close the dialog
        handleClose();
        // Refetch the donors list
        refetch();
      })
      .catch((error) => {
        console.error("Error updating donor:", error);
      });
  };

  const handleCancel = () => {
    // Clear form fields
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
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
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
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
