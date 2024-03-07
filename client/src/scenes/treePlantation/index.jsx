import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom"; 
import GoogleMap from "components/GoogleMap"; 

const TreePlantation = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 
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

  // const handleEventButtonClick = () => {
  //   navigate.push('./Events');
  // };

  const buttonStyleEvent = {
    margin: "10px",
    backgroundColor: isHoveredEvent ? "grey" : theme.palette.secondary[400],
    position: "relative",
    color: "white",
    border: "none",
    padding: "5px 10px", 
    borderRadius: "5px" 
  };

  const buttonStyleLocation = {
    margin: "10px",
    backgroundColor: isHoveredLocation ? "grey" : theme.palette.secondary[400],
    color: "white",
    border: "none",
    padding: "5px 10px", 
    borderRadius: "5px"
  };

  const buttonStyleReport = {
    margin: "10px",
    backgroundColor: isHoveredReport ? "grey" : theme.palette.secondary[400],
    color: "white",
    border: "none",
    padding: "5px 10px", 
    borderRadius: "5px"
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
            onClick={() => navigate('/Events')} 
          >
            Events
          </button>
          <button
            style={buttonStyleLocation}
            onMouseEnter={handleMouseEnterLocation}
            onMouseLeave={handleMouseLeaveLocation}
            onClick={() => navigate('/Location')}
          >
            Locations
          </button>
          <button
            style={buttonStyleReport}
            onMouseEnter={handleMouseEnterReport}
            onMouseLeave={handleMouseLeaveReport}
            onClick={() => navigate('/Reports')} 
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
