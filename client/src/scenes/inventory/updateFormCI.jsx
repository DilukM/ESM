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

import { useUpdateItemsMutation } from "state/api";

const UpdateFormCI = ({ open, handleClose, refetch, itemsToUpdate }) => {
  const theme = useTheme();
  const [itemName, setitemName] = useState("");
  const [quantity, setquantity] = useState("");
  const [date, setdate] = useState("");

  // State variables for validation
  const [itemNameError, setitemNameError] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [dateError, setdateError] = useState("");

  const [updateItems] = useUpdateItemsMutation();
  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (itemsToUpdate) {
      setitemName(itemsToUpdate.itemName);
      setquantity(itemsToUpdate.quantity);
      setdate(itemsToUpdate.date);
    }
  }, [itemsToUpdate]);

  //const itemID = itemToUpdate ? itemToUpdate._id : "";

  const validateInputs = () => {
    let isValid = true;

    // Validate itemID
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

    // Validate date
    if (!date.trim()) {
      setdateError("Date is required");
      isValid = false;
    } else {
      setdateError("");
    }

    return isValid;
  };

  const handleUpdateItems = () => {
    if (validateInputs()) {
      updateItems({ itemName, quantity, date })
        .then((response) => {
          console.log("Item updated successfully:", response);
          // Clear form fields
          setitemName("");
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
    setitemName("");
    setquantity("");
    setdate("");

    setitemNameError("");
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
            onClick={handleUpdateItems}
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

export default UpdateFormCI;
