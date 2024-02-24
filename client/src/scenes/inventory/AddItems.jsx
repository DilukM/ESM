
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

const AddItems = () => {
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [date, setDate] = useState('');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Handle the form submission logic (e.g., send data to server)
    console.log('Submitted:', { itemName, itemId, itemQuantity, date });
  };

  return (
    <FlexBetween>
    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
      <Header
        title="Add Item"
        
      />

    <form onSubmit={handleSubmit}>
      <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <label>Item Name:
            <InputBase sx={{width:500}} placeholder="Item Name" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
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
            <InputBase sx={{width:500}} placeholder="Item ID" type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} />
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
            <InputBase sx={{width:500}} placeholder="Item Quantity" type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
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
            <InputBase sx={{width:500}} placeholder="Date:" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </FlexBetween>

      
      <br />

      <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Add
      </Button>
    
    </form>
    
    </Container>
    </FlexBetween>
  );
};

export default AddItems;
