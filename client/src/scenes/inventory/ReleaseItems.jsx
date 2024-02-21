

import React, { useState } from 'react';
import Container from "../../components/Container";

import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import Header from "components/Header";


import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
  } from "@mui/material";
  
  import FlexBetween from 'components/FlexBetween';


const ReleaseItems = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    itemName: '',
    itemId: '',
    eventId: '',
    itemQuantity: '',
    date: '',
  });

  const theme = useTheme();

import React, { useState } from "react";
import Container from "../../components/Container";

const ReleaseItems = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    itemName: "",
    itemId: "",
    eventId: "",
    itemQuantity: "",
    date: "",
  });


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission (e.g., sending data to a server)

    console.log('Form submitted:', formData);
    // Clear the form after submission
    setFormData({
      itemName: '',
      itemId: '',
      eventId: '',
      itemQuantity: '',
      date: '',

    console.log("Form submitted:", formData);
    // Clear the form after submission
    setFormData({
      itemName: "",
      itemId: "",
      eventId: "",
      itemQuantity: "",
      date: "",

    });
  };

  return (

    <FlexBetween>
    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
    <Header
        title="Release Item"
        
      />
    <form onSubmit={handleSubmit}>
    <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Item Name:
            <InputBase sx={{width:500}} placeholder="Item Name" type="text" name="itemName" value={formData.itemName} onChange={handleInputChange} />
            </label>
    </FlexBetween>
      
      <br />
      <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Item ID:
            <InputBase sx={{width:500}} placeholder="Item ID" type="text" name="itemId" value={formData.itemId} onChange={handleInputChange} />
            </label>
    </FlexBetween>
      
      <br />
    <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Event ID:
            <InputBase sx={{width:500}} placeholder="Event ID" type="text" name="eventId" value={formData.eventId} onChange={handleInputChange} />
            </label>
    </FlexBetween>
      
      <br />
      <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Item Quantity:
            <InputBase sx={{width:500}} placeholder="Item Quantity"  type="number"
          name="itemQuantity"
          value={formData.itemQuantity}
          onChange={handleInputChange} />
            </label>
    </FlexBetween>
      
      <br />
      <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Date:
            <InputBase sx={{width:500}} placeholder="Date" type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </label>
    </FlexBetween>
      
      <br />
      <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Release  
      </Button>
    </form>
    </Container>
    </FlexBetween>

    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Item ID:
          <input
            type="text"
            name="itemId"
            value={formData.itemId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Event ID:
          <input
            type="text"
            name="eventId"
            value={formData.eventId}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Item Quantity:
          <input
            type="number"
            name="itemQuantity"
            value={formData.itemQuantity}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Release</button>
      </form>
    </Container>

  );
};

export default ReleaseItems;
