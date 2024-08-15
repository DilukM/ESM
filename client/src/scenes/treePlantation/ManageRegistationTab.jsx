import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import { useGetTreeEventQuery } from "state/api";
// import PatientListModal from "./PatientListModal";


const ManageRegistationTab = () => {
  const theme = useTheme();
  const { data: Events, isLoading: isLoadingEvents, error: eventError } = useGetTreeEventQuery();
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (eventError) {
      console.error("Error fetching camps:", eventError);
      setSnackbar({ open: true, message: "Error fetching health camps", severity: "error" });
    }
  }, [eventError]);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateStr));
  };

  const filteredEvent= Events?.filter(
      (event) =>
        event.eventID.toLowerCase().includes(searchTerm) ||
      event.town.toLowerCase().includes(searchTerm) ||
        event.district.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => new Date(b.Date) - new Date(a.Date)); // Sort by latest date

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" fontWeight="bold">Manage Donors</Typography>
        <Tooltip title="Search by Event ID, Town, or District" arrow>
          <TextField
            label="Search Events"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: "300px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {isLoadingEvents && <Typography>Loading Events...</Typography>}
        {filteredEvent?.map((e) => (
          <Card key={e._id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h5">{e.eventID}</Typography>
              <Typography variant="body2">
                {e.city}, {e.district} 
                
              </Typography>
              <Typography variant="body2">{formatDate(e.Date)}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary" variant="outlined" onClick={() => handleOpenModal(e)}>
                Assign Donors
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
{/* 
      {selectedCamp && (
        <PatientListModal open={openModal} onClose={handleCloseModal} camp={selectedCamp} />
      )} */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ManageRegistationTab