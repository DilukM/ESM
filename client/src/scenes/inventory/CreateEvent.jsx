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

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    console.log('Event submitted:', { eventName, eventId, location, date });
    // Reset the form fields after submission
    setEventName('');
    setEventId('');
    setLocation('');
    setDate('');
  };

  return (
    <FlexBetween>
    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
    <Header
        title="Create Event"
        
      />
    <form onSubmit={handleSubmit}>
    <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Event Name:
            <InputBase sx={{width:500}} placeholder="Event Name" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
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
            <InputBase sx={{width:500}} placeholder="Event ID" type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} />
            </label>
    </FlexBetween>
      
      <br />
      <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Location:
            <InputBase sx={{width:500}} placeholder="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
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
            <InputBase sx={{width:500}} placeholder="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
    </FlexBetween>
      
      <br />
      <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Create 
      </Button>
    </form>
    </Container>
    </FlexBetween>
  );
};


export default CreateEvent;