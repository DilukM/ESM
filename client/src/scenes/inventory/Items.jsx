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
import { useAddItemsMutation } from "state/itemsApi";

const Items = ({ open, handleClose, refetch }) => {
  const theme = useTheme();

  const [itemName, setitemName] = useState("");
  const [unit, setunit] = useState("");
  const [unitScore, setunitScore] = useState("");

  // State variables for validation
  const [itemNameError, setitemNameError] = useState("");
  const [unitError, setunitError] = useState("");
  const [unitScoreError, setunitScoreError] = useState("");

  const [addItem] = useAddItemsMutation();

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
    if (!unit.trim()) {
      setunitError("Unit is required");
      isValid = false;
    } else {
      setunitError("");
    }

    // Validate donorId
    if (!unitScore.trim()) {
      setunitScoreError("Unit Score is required");
      isValid = false;
    } else {
      setunitScoreError("");
    }

    return isValid;
  };

  const handleAddItems = () => {
    if (validateInputs()) {
      addItem({ itemName, unit, unitScore })
        .then((response) => {
          console.log("Item added successfully from frontend:", response);
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
          console.error("Error adding item:", error);
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
