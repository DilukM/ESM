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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import {
  useUpdateItems_outMutation,
  useGetItemsQuery,
  useGetDEventsQuery,
} from "state/api";

const UpdateFormOut = ({ open, handleClose, refetch, itemsToUpdate }) => {
  const theme = useTheme();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [quantity, setquantity] = useState("");
  const [date, setdate] = useState("");

  // State variables for validation
  const [itemNameError, setitemNameError] = useState("");
  const [eventIdError, seteventIdError] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [dateError, setdateError] = useState("");

  const [updateItems_out] = useUpdateItems_outMutation();
  const { data: items, isLoading } = useGetItemsQuery();
  const { data: events, isLoadingEvent } = useGetDEventsQuery();

  // Populate form fields with donorToUpdate data when it's available
  useEffect(() => {
    if (itemsToUpdate && items && events) {
      setSelectedItem(items.find((item) => item._id === itemsToUpdate.itemId));
      setSelectedEvent(
        events.find((event) => event._id === itemsToUpdate.eventId)
      );
      setquantity(itemsToUpdate.quantity);
      setdate(itemsToUpdate.date);
    }
  }, [itemsToUpdate]);

  const itemID = itemsToUpdate ? itemsToUpdate._id : "";

  const validateInputs = () => {
    let isValid = true;

    // Validate itemName
    if (selectedItem == null) {
      setitemNameError("Item is required");
      isValid = false;
    } else {
      setitemNameError("");
    }

    if (selectedEvent == null) {
      seteventIdError("Event is required");
      isValid = false;
    } else {
      seteventIdError("");
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

  const handleUpdateItems_out = () => {
    if (validateInputs()) {
      updateItems_out({
        itemID,
        itemId: selectedItem._id,
        itemName: selectedItem.itemName,
        quantity,
        eventId: selectedEvent._id,
        eventName: selectedEvent.eventName,
        date,
      })
        .then((response) => {
          console.log("Item updated successfully:", response);
          // Clear form fields
          setSelectedItem(null);
          setSelectedEvent(null);
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
    setSelectedItem(null);
    setSelectedEvent(null);
    setquantity("");
    setdate("");

    setitemNameError("");
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
        <Autocomplete
          options={items || []} // Provide the entire objects as options
          getOptionLabel={(option) => option.itemName || ""} // Show the ItemName as the label
          isOptionEqualToValue={(option, value) => option.Id === value.Id} // Define equality based on Id
          loading={isLoading}
          value={selectedItem} // Set value to the selected item object
          onChange={(event, newValue) => {
            setSelectedItem(newValue); // newValue contains the selected object
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Item Name"
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!itemNameError}
              helperText={itemNameError}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
                sx: {
                  "&.Mui-focused": {
                    color: theme.palette.secondary[100],
                  },
                },
              }}
            />
          )}
        />
        <Autocomplete
          options={events || []} // Provide the entire objects as options
          getOptionLabel={(option) => option.eventName || ""} // Show the ItemName as the label
          isOptionEqualToValue={(option, value) => option.Id === value.Id} // Define equality based on Id
          loading={isLoadingEvent}
          value={selectedEvent} // Set value to the selected item object
          onChange={(event, newValue) => {
            setSelectedEvent(newValue); // newValue contains the selected object
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Donation Event"
              fullWidth
              variant="outlined"
              margin="normal"
              error={!!eventIdError}
              helperText={eventIdError}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
                sx: {
                  "&.Mui-focused": {
                    color: theme.palette.secondary[100],
                  },
                },
              }}
            />
          )}
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
          type="date"
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

export default UpdateFormOut;
