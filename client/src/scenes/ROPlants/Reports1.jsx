import React, { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

export default function Reports1() {
  // Sample data for the DataGrid
  const rows = [
    { id: 1, ProjectName: ' RO plantation 2020', date: '2024-02-21', Locations:'Dabulla',  Category: 'Big_Project ' },
    { id: 2, ProjectName: ' RO plantation 2021', date: '2024-02-22', Locations:'Ampara',  Category: 'Small_Project' },
    { id: 3, ProjectName: ' RO plantation 2022', date: '2024-02-23', Locations:'Anuradhapura', Category: 'Big_Project' },
  ];

  // Define columns for the DataGrid
  const columns = [
    { field: 'ProjectName', headerName: 'Project Name', width: 300 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'Locations', headerName: 'Locations', width: 150 },
    //{ field: 'Amountoftrees', headerName: 'Amount of Trees', width: 150 },
    { field: 'Category', headerName: 'Category', width: 150 },
  ];

  // State for filter values
  const [filterValues, setFilterValues] = useState({
   // startDate: '',
    Created_Date: '',
    Locations: '',
    Category: ''
  });

  // Handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    let formattedValue = value;

    // Check if the name is startDate or endDate and format the value accordingly
    if ( name === 'Created_Date') {
      formattedValue = value; // No need to format for now
    }

    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: formattedValue 
    }));
  };

  // Filtered rows based on filter values
  const filteredRows = rows.filter(row => {
    //const startDate = new Date(filterValues.startDate);
    const Created_Date = new Date(filterValues.Created_Date);
    const rowDate = new Date(row.date);
    
    return (
      //(filterValues.startDate === '' || rowDate >= startDate) &&
      (filterValues.Created_Date === '' || rowDate <= Created_Date) &&
      (filterValues.Locations === '' || row.Locations.includes(filterValues.Locations)) &&
      (filterValues.Category === '' || row.Category.includes(filterValues.Category))
    );
  });

  return (
    <Box m="1.5rem 2.5rem" position="relative">
      <Header title="Ro_Plants" subtitle="Located Ro_plants" />
      <Grid container spacing={2} mt={2} mb={2}> 
      {/* <Grid item xs={3}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="startDate"
            value={filterValues.startDate}
            onChange={handleFilterChange}
            InputLabelProps={{
                shrink: true,
              }}
              sx={{ mr: 1 }}
          />
        </Grid> */}
        
        <Grid item xs={3}>
          <TextField
            fullWidth
            type="Date"
            label="Created_Date"
            name="Created_Date"
            value={filterValues.Created_Date}
            onChange={handleFilterChange}
            InputLabelProps={{
                shrink: true,
              }}
              sx={{ mr: 1 }}
          />
        </Grid>
         <Grid item xs={3}>
          <TextField
            fullWidth
            name="Locations"
            label="Locations"
            value={filterValues.Locations}
            onChange={handleFilterChange}
          />
            </Grid> 
        
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="Category"
              value={filterValues.Category}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Big_Project">Big_Project</MenuItem>
              <MenuItem value="Small_Project">Small_Project</MenuItem>
              
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          components={{
            header: {
              cell: () => (
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#333333', padding: '10px' }} />
              ),
            },
          }}
        />
      </div>
    </Box>
  );
}
