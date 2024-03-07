import React from 'react';
import { Box,useTheme } from '@mui/material';
import Button from 'components/Button';
import Header from 'components/Header';


const Location = () => {
    const theme = useTheme();
  return (
    <Box  m="1.5rem 2.5rem">
        <Header title="Tree Plantation" subtitle="Manage tree plantations" />
        <Box
         mt="40px"
         height="75vh"
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
         }}>
            <Box><h1>Locations</h1></Box>
            <Button label="Create Event" /> 
            
        </Box>
        
    </Box>
    
  );
};

export default Location;