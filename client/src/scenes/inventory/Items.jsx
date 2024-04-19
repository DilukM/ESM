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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAddItemsMutation } from "state/api";

const Items = ({ open, handleClose, refetch }) => {
  const theme = useTheme();
  const [itemId, setitemID] = useState("");
  const [itemName, setitemName] = useState("");
  const [quantity, setquantity] = useState("");
  const [donorId, setdonorId] = useState("");
  const [date, setdate] = useState("");

  // State variables for validation
  const [itemIDError, setitemIDError] = useState("");
  const [itemNameError, setitemNameError] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [donorIdError, setdonorIdError] = useState("");
  const [dateError, setdateError] = useState("");

  const [addItem] = useAddItemsMutation();

  const validateInputs = () => {
    let isValid = true;

    // Validate itemID
    if (!itemId.trim()) {
      setitemIDError("Item ID is required");
      isValid = false;
    } else {
      setitemIDError("");
    }

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
      setdonorIdError("Donor Id is required");
      isValid = false;
    } else {
      setdonorIdError("");
    }

    // Validate phone
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
      addItem({ itemId, itemName, quantity, donorId, date })
        .then((response) => {
          console.log("Item added successfully from frontend:", response);
          // Clear form fields
          setitemID("");
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
          console.error("Error adding donor:", error);
        });
    }
  };

  const handleCancel = () => {
    // Clear form fields
    setitemID("");
    setitemName("");
    setquantity("");
    setdonorId("");
    setdate("");

    setitemIDError("");
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
        Add New Item
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Item ID"
          value={itemId}
          onChange={(e) => setitemID(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!itemIDError}
          helperText={itemIDError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
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
          label="Donor Id"
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
          label="Date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
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

export default Items;
