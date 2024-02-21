import React, { useState } from "react";
import Container from "../../components/Container";

import { InputBase, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const AddItems = () => {
  const [itemName, setItemName] = useState("");
  const [itemId, setItemId] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [date, setDate] = useState("");
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle the form submission logic (e.g., send data to server)
    console.log("Submitted:", { itemName, itemId, itemQuantity, date });
  };

  return (
    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Item ID:
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Item Quantity:
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <FlexBetween
        backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
      >
        <InputBase sx={{ width: 50 }} placeholder="Search..." />
      </FlexBetween>
    </Container>
  );
};

export default AddItems;
