import React, { useState, useMemo } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetItemsOutQuery, useGetItemsInQuery } from "../../state/api";

const Overview = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  setSort,
  searchInput,
  setSearchInput,
  setSearch,
}) => {
  const theme = useTheme();
  const { data: dataOut, isLoading: isLoadingOut } = useGetItemsOutQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: dataIn, isLoading: isLoadingIn } = useGetItemsInQuery();

  // Combine incoming and outgoing data to calculate net quantities
  const combinedData = useMemo(() => {
    if (!dataIn || !dataOut) return [];

    const itemMap = new Map();

    // Process incoming items
    dataIn.forEach((item) => {
      if (itemMap.has(item.itemId)) {
        itemMap.get(item.itemId).quantity += item.quantity;
      } else {
        itemMap.set(item.itemId, { ...item });
      }
    });

    // Process outgoing items (subtract quantity)
    dataOut.forEach((item) => {
      if (itemMap.has(item.itemId)) {
        itemMap.get(item.itemId).quantity -= item.quantity;
      } else {
        itemMap.set(item.itemId, {
          ...item,
          quantity: -item.quantity, // Set negative if only outgoing exists
        });
      }
    });

    return Array.from(itemMap.values());
  }, [dataIn, dataOut]);

  const overviewColumns = [
    {
      field: "itemName",
      headerName: "Item",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      sortable: false,
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
        <Link to="generatereport">
          <Button variant="contained" sx={{ marginTop: 2 }}>
            Generate Report
          </Button>
        </Link>
      </Box>

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
          loading={isLoadingIn || isLoadingOut}
          getRowId={(row) => row.itemId}
          rows={combinedData}
          columns={overviewColumns}
          rowCount={combinedData.length}
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
    </Box>
  );
};

export default Overview;
