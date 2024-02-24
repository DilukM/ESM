import React, { useState } from "react";
import { Box, useTheme, Tab, Tabs } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; 




export default function EventsReg() {
  const theme = useTheme();
  const navigate = useNavigate(); 
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleMouseEnterBtn = () => {
    setIsHoveredBtn(true);
    // Reset tab value to 0 when mouse enters button
    setTabValue(0);
  };

  const handleMouseLeaveBtn = () => {
    setIsHoveredBtn(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  

  


  

  return (
    <Box m="1.5rem 2.5rem" position="relative">
      <Header title="Tree Plantation" subtitle="Manage tree plantations" />
      
      
    </Box>
  );
}
