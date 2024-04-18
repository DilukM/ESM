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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUpdateItems_outMutation } from "state/api";

const UpdateFormRI = ({ open, handleClose, refetch, itemsToUpdate }) => {
  const theme = useTheme();
  const [eventId, seteventId] = useState("");
  const [quantity, setquantity] = useState("");
  const [date, setdate] = useState("");

  

  // State variables for validation
  const [eventIdError, seteventIdError] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [dateError, setdateError] = useState("");
 

  const [updateItems_out] = useUpdateItems_outMutation();
  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (itemsToUpdate) {
      seteventId(itemsToUpdate.eventId);
      setquantity(itemsToUpdate.quantity);
      setdate(itemsToUpdate.date);
    
    }
  }, [itemsToUpdate]);

  //const itemID = itemToUpdate ? itemToUpdate._id : "";

  const validateInputs = () => {
    let isValid = true;

    // Validate itemID
    if (!eventId.trim()) {
      seteventIdError("Event Id is required");
      isValid = false;
    } else {
      seteventIdError("");
    }

    // Validate quantity
    if (!quantity.trim()) {
      setquantityError("Quantity is required");
      isValid = false;
    }  else {
      setquantityError("");
    }

    // Validate date
    if (!date.trim()) {
      setdateError("Date is required");
      isValid = false;
    } else {
      setdateError("");
    }

   

    return isValid;
  };

  const handleUpdateItems_out = () => {
    if (validateInputs()) {
      updateItems_out({ eventId, quantity, date })
        .then((response) => {
          console.log("Item updated successfully:", response);
          // Clear form fields
          seteventId("");
          setquantity("");
          setdate("");
          
          // Close the dialog
          handleClose();
          // Refetch the donors list
          refetch();
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    }
  };

  const handleCancel = () => {
    // Clear form fields
    seteventId("");
    setquantity("");
    setdate("");
    

    seteventIdError("");
    setquantityError("");
    setdateError("");
    
    // Close the dialog
    handleClose();
  };

  

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle align="center" sx={{ fontWeight: 700 }}>
        Update Item
      </DialogTitle>
      <DialogContent>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateItems_out}
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

export default UpdateFormRI;
