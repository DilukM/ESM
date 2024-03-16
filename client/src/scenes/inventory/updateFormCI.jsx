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
import { useAddCurrentItemMutation } from "state/api";

const UpdateFormCI = ({ open, handleClose, refetch }) => {
  const theme = useTheme();
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const [addCurrentItem] = useAddCurrentItemMutation();

  const handleUpdateCurrentItem = () => {
    addCurrentItem({ itemId, itemName, quantity, date })
      .unwrap()
      .then((response) => {
        console.log("Item Updated successfully:", response);
        // Clear form fields
        setItemId("");
        setItemName("");
        setQuantity("");
        setDate("");
        // Close the dialog
        handleClose();
        // Refetch the donors list
        refetch();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleCancel = () => {
    // Clear form fields
    setItemId("");
    setItemName("");
    setQuantity("");
    setDate("");
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
          label="Item Id"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
            onClick={handleUpdateCurrentItem}
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
