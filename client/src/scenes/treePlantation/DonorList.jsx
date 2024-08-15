import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { useGetSponsorQuery,useDeleteSponsorMutation } from "state/api";
import ConfirmationDialog from "components/ConfirmationDialog";
import { Delete, Edit } from "@mui/icons-material";
import PatientRegistrationModal from "./PatientRegistrationModal";
import PatientUpdateModal from "./PatientUpdateModal";

const DonorList = ({ open, onClose, event}) => {
  const theme = useTheme();
  const { data: donors, isLoading, refetch, error } = useGetSponsorQuery(camp?._id, { skip: !camp });
  const [deleteDonor] = useDeleteSponsorMutation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openDonorModal, setOpenDonorModal] = useState(false);
  const [openDonorUpdateModal, setOpenDonorUpdateModal] = useState(false);
  const [currentDonor, setCurrentDonor] = useState(null);

  useEffect(() => {
    if (error) {
      console.error("Error fetching donor:", error);
    }
  }, [error]);

  const handleDelete = (eventID) => {
    setOpenConfirm(true);
    setSelectedPatient(eventID);
  };

  const confirmDelete = () => {
    deleteDonor(selectedDonor)
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "donor deleted successfully", severity: "success" });
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting donor:", error);
        setSnackbar({ open: true, message: "Error deleting donor", severity: "error" });
      });
    setOpenConfirm(false);
  };

  const DonorsColumns = [
    { field: "sponsorID", headerName: "sponsor ID", flex: 1 },
    { field: "sponsorName", headerName: "sponsor Name", flex: 1 },
    { field: "sponsorDate", headerName: "sponsor Date", flex: 1 },
    { field: "donation", headerName: "Donation", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="info"
            endIcon={<Edit />}
            onClick={() => handleOpenPatientUpdateModal(params.row)}
          >
            Update
          </Button>
          <div style={{ padding: "2px" }}></div>
          <Button
            variant="contained"
            color="error"
            endIcon={<Delete />}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle sx={{ bgcolor: "#f0f0f0" }} id="form-dialog-title">
      <div
        style={{
          color: "#d63333",
          fontWeight: "700",
          fontSize: "16px",
          display: "flex",
          justifyContent: "space-between", // Align children with space between
          alignItems: "center", // Align items vertically
        }}
      >
        <div>Patients of {camp?.CampId}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleOpenPatientModal}
            color="secondary"
            variant="contained"
            style={{ marginRight: "8px" }} // Add some margin between button and icon
          >
            Register Patient
          </Button>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <hr style={{ borderColor: "#d63333", marginTop: "8px" }} />
    </DialogTitle>
        <DialogContent sx={{ marginTop: "10px" }}>
          <Box height="75vh">
            <DataGrid
              loading={isLoading}
              getRowId={(row) => row._id}
              rows={patients || []}
              columns={patientColumns}
              pageSize={20}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f0f0f0" }}>
          <Button
            onClick={handleOpenPatientModal}
            color="secondary"
            variant="contained"
          >
            Register Patient
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <PatientRegistrationModal
        openModal={openPatientModal}
        closeModal={handleClosePatientModal}
        campId={camp?._id}
      />

      <PatientUpdateModal
        openModal={openPatientUpdateModal}
        closeModal={handleClosePatientUpdateModal}
        currentPatient={currentPatient}
        campId={camp?._id}
      />

      <ConfirmationDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this patient? This action cannot be undone."
      />

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
    </>
  )
}

export default DonorList