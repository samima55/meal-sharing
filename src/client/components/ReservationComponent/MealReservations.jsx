import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  {RiDeleteBin2Fill} from "react-icons/ri"

const MealReservations = () => {

    const { id } = useParams();
    const [reservations, setReservations] = useState([]);
    const [mealName, setMealName] = useState('');
      
    // Fetch meals from the API when the component mounts
    useEffect(() => {
    const fetchReservations = async () => {
      try {
        const mealResponse = await axios.get(`http://localhost:3000/api/meals/${id}`);
        const mealData = mealResponse.data;
        setMealName(mealData.title);

        const response = await axios.get(`http://localhost:3000/api/meals/${id}/reservations`);
        const reservationsData= await response.data;
       // console.log(reservationsData)
        setReservations(reservationsData);
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    };

    fetchReservations();
  }, [id]);


  const handleDeleteReservation = async (reservationId) => {
    try {
        // Delete the reservation
        console.log(handleDeleteReservation);
        await axios.delete(`http://localhost:3000/api/reservations/${reservationId}`);
         
        // Update the reservations list
        setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
    } catch (error) {
        console.log("Error deleting reservation:", error);
    }
};


    return(
        <div>
             <h2>{mealName}</h2>
          <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <p>{ reservation.contact_name}</p>
            <button onClick={() => handleDeleteReservation(reservation.id)}> <RiDeleteBin2Fill/></button>
          </li>
        ))}
      </ul>
        </div>
    )


}

export default MealReservations;