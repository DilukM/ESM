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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAddItems_outMutation } from "state/api";

const Items_out = ({ open, handleClose, refetch }) => {
  const theme = useTheme();
  const [itemID, setitemID] = useState("");
  
  const [quantity, setquantity] = useState("");
  const [eventId, seteventId] = useState("");
  const [date, setdate] = useState("");
  //const [showPassword, setShowPassword] = useState(false);

  // State variables for validation
  const [itemIDError, setitemIDError] = useState("");
  
  const [quantityError, setquantityError] = useState("");
  const [eventIdError, seteventIdError] = useState("");
  const [dateError, setdateError] = useState("");

  const [addItems_out] = useAddItems_outMutation();

  const validateInputs = () => {
    let isValid = true;

    // Validate itemID
    if (!itemID.trim()) {
      setitemIDError("Item ID is required");
      isValid = false;
    } else {
      setitemIDError("");
    }

   

    // Validate quantity
    if (!quantity.trim()) {
      setquantityError("Quantity is required");
      isValid = false;
    
    } else {
      setquantityError("");
    }

    // Validate donorId
    if (!eventId.trim()) {
      seteventIdError("Event Id is required");
      isValid = false;
    } else {
      seteventIdError("");
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

  const handleAddItems_out = () => {
    if (validateInputs()) {
      addItems_out({ itemID, quantity, eventId, date })
        .then((response) => {
          console.log("Item released successfully from frontend:", response);
          // Clear form fields
          setitemID("");
          
          setquantity("");
          seteventId("");
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
    
    setquantity("");
    seteventId("");
    setdate("");

    setitemIDError("");
    
    setquantityError("");
    seteventIdError("");
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
        Release Item
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Item ID"
          value={itemID}
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
          label="Event Id"
          value={eventId}
          onChange={(e) => seteventId(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!eventIdError}
          helperText={eventIdError}
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
          <Button variant="contained" color="primary" onClick={handleAddItems_out}>
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

export default Items_out;
