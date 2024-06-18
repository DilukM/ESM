import React, { useState } from "react";
import { Box, useTheme, Tabs, Tab } from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom"; 
import EventsTab from "./EventsTab";
import EventCreateModal from "./EventCreateModal";
import SponsorTab from "./SponsorTab";
import AddSponsorModal from "./AddSponsorModal";
import LocationTab from "./LocationTab";
import GoogleMap from "components/GoogleMap";

const TreePlantation = () => {
  const theme = useTheme();
  // const navigate = useNavigate(); 
  const [isHoveredEvent, setIsHoveredEvent] = useState(false);
  const [isHoveredLocation, setIsHoveredLocation] = useState(false);
  const [isHoveredReport, setIsHoveredReport] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
            backgroundColor: theme.palette.secondary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.secondary[400],
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.secondary[400],
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.secondary[400],
          },
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="standard"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="Create Program Tab"
        >
          <Tab label="Map" />
          <Tab label="Location" />
          <Tab label="Events" />
          <Tab label="Sponsors Details" />
        </Tabs>

        {/* Render tab content based on active tab */}
        {activeTab === 0 && <Box >
          <GoogleMap />
        </Box>}
        {activeTab === 1 && <LocationTab />}
        {activeTab === 2 && <EventsTab handleOpenModal={handleOpenModal} />}
        {activeTab === 3 && <SponsorTab handleOpenModal={handleOpenModal}/>}
        
        
        {/* {activeTab === 2 && <VolunteerDonorRegistrationTab handleOpenModal={handleOpenModal}/>} */}
        

        {/* Modal */}
        <EventCreateModal openModal={openModal} closeModal={handleCloseModal} />
        <AddSponsorModal openModal={openModal} closeModal={handleCloseModal} />
        

        {/* <VolunteerDonorRegistrationModal open={openModal} handleClose={handleCloseModal}/> */}
      </Box>
    </Box>
  );
};

export default TreePlantation;
