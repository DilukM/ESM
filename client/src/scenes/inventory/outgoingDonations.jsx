import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetItemsOutQuery,
  useDeleteItems_outMutation,
} from "../../state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Items_out from "./addItems_out";
import UpdateFormRI from "./updateFormOut";

const OutgoingDonations = () => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [showUpdateFormOut, setshowUpdateFormOut] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [setSort] = useState({});
  const [setSearch] = useState("");
  const { data, error, isLoading, refetch } = useGetItemsOutQuery(undefined, {
    refetchOnMountOrArgChange: true, // Forces refetch on mount
  });
  const [deleteItemsOut] = useDeleteItems_outMutation();
  const [rowIndex, setRowIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (data) {
      setRowIndex(0); // Reset the index when data changes
    }
  }, [data]);

  const handleDelete = (itemID) => {
    setItemToDelete(itemID);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      deleteItemsOut(itemToDelete)
        .unwrap()
        .then((response) => {
          console.log("Item deleted successfully");
          refetch();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
    setOpenConfirmDialog(false);
    setItemToDelete(null);
  };

  const handleUpdateClick = (item) => {
    setSelectedItems(item); // Set the selected item data
    console.log(selectedItems);
    setshowUpdateFormOut(true); // Show the update form
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setshowUpdateFormOut(false);
  };

  const generateRowsWithIndex = (rows) => {
    return rows.map((row, index) => ({ ...row, index: rowIndex + index + 1 }));
  };

  const outgoingDonations = [
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "eventName",
      headerName: "Event Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      sortable: false,
    },

    {
      field: " ",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
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
              color="error"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
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
            <Button
              variant="contained"
              color="info"
              onClick={() => handleUpdateClick(params.row)}
            >
              Update
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        mb={2}
        sx={{
          "& button": {
            backgroundColor: theme.palette.secondary[400],
            color: "white",
          },
        }}
      >
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => setShowForm(true)}
        >
          Release Item
        </Button>
      </Box>

      <UpdateFormRI
        open={showUpdateFormOut}
        handleClose={handleCloseForm}
        refetch={refetch}
        itemsToUpdate={selectedItems}
      />

      <Items_out
        open={showForm}
        handleClose={handleCloseForm}
        refetch={refetch}
      />

      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={generateRowsWithIndex(data || [])}
          columns={outgoingDonations}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OutgoingDonations;
