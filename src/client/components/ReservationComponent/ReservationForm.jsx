import React, { useState } from "react";
import axios from 'axios';
const ReservationForm = ({ meal_id }) => {
  const [contact_name, setName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [contact_email, setEmail] = useState("");
  const [number_of_guests, setNumberOfGuests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
        
     try {
      const response = await axios.post("http://localhost:3000/api/reservations", {
        number_of_guests,
         meal_id,
        created_date: new Date(),
        contact_number,
        contact_name,
        contact_email,
      });

      if (response.status === 201) {
        // Reservation successfully created
        console.log("Reservation created successfully!");
      } else {
        // Handle error
        console.log("Error creating reservation");
      }
    } catch (error) {
      // Handle error
      console.log("Error creating reservation:", error);
    }
  };
  return (
    <>
      <h2 className="meal-title">reservation</h2>
    <form onSubmit={handleSubmit}>
    <label>Name:</label>
      <input type="text" value={contact_name} onChange={(e) => setName(e.target.value)} required/>

      <label>Phone Number:</label>
      <input type="text" value={contact_number} onChange={(e) => setContactNumber(e.target.value)}  required/>

      <label>Email:</label>
      <input type="email" value={contact_email} onChange={(e) => setEmail(e.target.value)}  required/>

      <label>Number of Guests:</label>
      <input type="number" value={number_of_guests} onChange={(e) => setNumberOfGuests(e.target.value)} placeholder="Number of guests" required
      />
      <button  className="btn btn-custom" type="submit">Make Reservation</button>
    </form>
    </>
  );
};

export default ReservationForm;
