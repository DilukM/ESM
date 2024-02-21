
import React, { useState } from 'react';
import Container from "../../components/Container";

const ReleaseItems = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    itemName: '',
    itemId: '',
    eventId: '',
    itemQuantity: '',
    date: '',
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
    });
  };

  return (
    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" name="itemName" value={formData.itemName} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Item ID:
        <input type="text" name="itemId" value={formData.itemId} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Event ID:
        <input type="text" name="eventId" value={formData.eventId} onChange={handleInputChange} />
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
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Release</button>
    </form>
    </Container>
  );
};

export default ReleaseItems;
