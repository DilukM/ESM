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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import {
  useAddItems_outMutation,
  useGetItemsQuery,
  useGetDEventsQuery,
} from "state/api";

const Items_out = ({ open, handleClose, refetch }) => {
  const theme = useTheme();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [quantity, setquantity] = useState("");
  const [date, setdate] = useState("");

  // State variables for validation
  const [itemNameError, setitemNameError] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [eventIdError, seteventIdError] = useState("");
  const [dateError, setdateError] = useState("");

  const [addItem] = useAddItems_outMutation();
  const { data: items, isLoading } = useGetItemsQuery();
  const { data: events, isLoadingEvent } = useGetDEventsQuery();

  const validateInputs = () => {
    let isValid = true;

    // Validate itemName
    if (selectedItem == null) {
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

    // Validate eventId
    if (selectedEvent == null) {
      seteventIdError("Event is required");
      isValid = false;
    } else {
      seteventIdError("");
    }

    if (!date.trim()) {
      setdateError("Date is required");
      isValid = false;
    } else {
      setdateError("");
    }

    return isValid;
  };

  const handleAddItems = async () => {
    if (validateInputs()) {
      console.log("eventId", selectedEvent.eventId);
      try {
        const response = await addItem({
          itemId: selectedItem._id, // Ensure you're using the correct key for ID
          itemName: selectedItem.itemName, // Ensure consistency in naming
          quantity,
          eventId: selectedEvent._id,
          eventName: selectedEvent.eventName,
          date,
        }).unwrap(); // Unwrap the response to handle it directly

        console.log("Item added successfully from backend:", response);

        // Clear form fields
        setSelectedItem(null);
        setSelectedEvent(null);
        setquantity("");
        setdate("");

        // Close the dialog only after successful addition
        handleClose();

        // Refetch the donors list
        refetch();
      } catch (error) {
        console.error("Error adding item:", error);
        setitemNameError(error);
      }
    }
  };

  const handleCancel = () => {
    // Clear form fields
    setSelectedItem(null);
    setSelectedEvent(null);
    setquantity("");
    setdate("");

    setitemNameError("");
    setquantityError("");
    seteventIdError("");
    setdateError("");

    // Close the dialog
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle align="center" sx={{ fontWeight: 700 }}>
        Add New Donation
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
              label="Item"
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

        <Autocomplete
          options={events || []} // Provide the entire objects as options
          getOptionLabel={(option) => option.eventName || ""} // Show the Event Name as the label
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

export default Items_out;
