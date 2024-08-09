import React, { useState } from "react";
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
import { useAddItems_inMutation } from "state/itemsApi";

const AddItems_in = ({ open, handleClose, refetch }) => {
  const theme = useTheme();

  const [itemName, setitemName] = useState("");
  const [quantity, setquantity] = useState("");
  const [donorId, setdonorId] = useState("");
  const [date, setdate] = useState("");

  // State variables for validation
  const [itemNameError, setitemNameError] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [donorIdError, setdonorIdError] = useState("");
  const [dateError, setdateError] = useState("");

  const [addItem] = useAddItems_inMutation();

  const validateInputs = () => {
    let isValid = true;

    // Validate itemName
    if (!itemName.trim()) {
      setitemNameError("Item Name is required");
      isValid = false;
    } else {
      setitemNameError("");
    }

    // Validate quantity
    if (!quantity.trim()) {
      setquantityError("Quantity is required");
      isValid = false;
    } else {
      setquantityError("");
    }

    // Validate donorId
    if (!donorId.trim()) {
      setdonorIdError("Donor is required");
      isValid = false;
    } else {
      setdonorIdError("");
    }

    if (!date.trim()) {
      setdateError("Date is required");
      isValid = false;
    } else {
      setdateError("");
    }

    return isValid;
  };

  const handleAddItems = () => {
    if (validateInputs()) {
      addItem({ itemName, quantity, donorId, date })
        .then((response) => {
          console.log("Item added successfully from frontend:", response);
          // Clear form fields

          setitemName("");
          setquantity("");
          setdonorId("");
          setdate("");

          // Close the dialog
          handleClose();
          // Refetch the donors list
          refetch();
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  };

  const handleCancel = () => {
    // Clear form fields

    setitemName("");
    setquantity("");
    setdonorId("");
    setdate("");

    setitemNameError("");
    setquantityError("");
    setdonorIdError("");
    setdateError("");

    // Close the dialog
    handleClose();
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle align="center" sx={{ fontWeight: 700 }}>
        Add New Donation
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setitemName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!itemNameError}
          helperText={itemNameError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setquantity(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!quantityError}
          helperText={quantityError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />

        <TextField
          label="Donor"
          value={donorId}
          onChange={(e) => setdonorId(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!donorIdError}
          helperText={donorIdError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />

        <TextField
          type="date"
          variant="outlined"
          name="date"
          margin="normal"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          fullWidth
          error={!!dateError}
          helperText={dateError}
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
          <Button variant="contained" color="primary" onClick={handleAddItems}>
            Add
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

export default AddItems_in;
