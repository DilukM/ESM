import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";

import GoogleMap from "components/GoogleMap"; // Import your GoogleMap component here

const TreePlantation = () => {
  const theme = useTheme();
  const [isHoveredEvent, setIsHoveredEvent] = useState(false);
  const [isHoveredLocation, setIsHoveredLocation] = useState(false);
  const [isHoveredReport, setIsHoveredReport] = useState(false);

  const handleMouseEnterEvent = () => {
    setIsHoveredEvent(true);
  };

  const handleMouseLeaveEvent = () => {
    setIsHoveredEvent(false);
  };

  const handleMouseEnterLocation = () => {
    setIsHoveredLocation(true);
  };

  const handleMouseLeaveLocation = () => {
    setIsHoveredLocation(false);
  };

  const handleMouseEnterReport = () => {
    setIsHoveredReport(true);
  };

  const handleMouseLeaveReport = () => {
    setIsHoveredReport(false);
  };

  const buttonStyleEvent = {
    margin: "10px",
    backgroundColor: isHoveredEvent ? theme.palette.secondary[500] : theme.palette.secondary[200],
  };

  const buttonStyleLocation = {
    margin: "10px",
    backgroundColor: isHoveredLocation ? theme.palette.secondary[500] : theme.palette.secondary[200],
  };

  const buttonStyleReport = {
    margin: "10px",
    backgroundColor: isHoveredReport ? theme.palette.secondary[500] : theme.palette.secondary[200],
  };

  return (
    <Box m="1.5rem 2.5rem">
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
        }}
      >
        <Box display="flex">
          <button
            style={buttonStyleEvent}
            onMouseEnter={handleMouseEnterEvent}
            onMouseLeave={handleMouseLeaveEvent}
          >
            Events
          </button>
          <button
            style={buttonStyleLocation}
            onMouseEnter={handleMouseEnterLocation}
            onMouseLeave={handleMouseLeaveLocation}
          >
            Locations
          </button>
          <button
            style={buttonStyleReport}
            onMouseEnter={handleMouseEnterReport}
            onMouseLeave={handleMouseLeaveReport}
          >
            Reports
          </button>
        </Box>
        <Box mt={3}>
          <GoogleMap />
        </Box>
      </Box>
    </Box>
  );
};

export default TreePlantation;
