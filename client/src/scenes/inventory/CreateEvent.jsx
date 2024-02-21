import React, { useState } from 'react';
import Container from "../../components/Container";

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

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

    <Container class1="additems-wrapper main-content-wrapper-1 py-5">
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      </label>
      <br />
      <label>
        Event ID:
        <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Event</button>
    </form>
    </Container>
  );
};


export default CreateEvent;