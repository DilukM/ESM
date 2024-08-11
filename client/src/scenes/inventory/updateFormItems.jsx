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
  const [unit, setunit] = useState("");
  const [unitScore, setunitScore] = useState("");

  // State variables for validation
  const [itemNameError, setitemNameError] = useState("");
  const [unitError, setunitError] = useState("");
  const [unitScoreError, setunitScoreError] = useState("");

  const [updateItems] = useUpdateItemsMutation();
  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (itemsToUpdate) {
      setitemName(itemsToUpdate.itemName);
      setunit(itemsToUpdate.unit);
      setunitScore(itemsToUpdate.unitScore);
    }
  }, [itemsToUpdate]);

  const itemID = itemsToUpdate ? itemsToUpdate._id : "";

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
    if (!unit.trim()) {
      setunitError("Unit is required");
      isValid = false;
    } else {
      setunitError("");
    }

    // Validate date
    if (unitScore == null || unitScore == "") {
      setunitScoreError("Unit score is required");
      isValid = false;
    } else {
      setunitScoreError("");
    }

    return isValid;
  };

  const handleUpdateItems = () => {
    if (validateInputs()) {
      updateItems({ itemID, itemName, unit, unitScore })
        .then((response) => {
          console.log("Item updated successfully:", response);
          // Clear form fields
          setitemName("");
          setunit("");
          setunitScore("");

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
    setunit("");
    setunitScore("");

    setitemNameError("");
    setunitError("");
    setunitScoreError("");

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
          label="Unit"
          value={unit}
          onChange={(e) => setunit(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!unitError}
          helperText={unitError}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: theme.palette.secondary[100],
              },
            },
          }}
        />
        <TextField
          label="Unit Score"
          value={unitScore}
          onChange={(e) => setunitScore(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!unitScoreError}
          helperText={unitScoreError}
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
