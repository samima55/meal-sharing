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
        const mealResponse = await axios.get(`/api/meals/${id}`);
        const mealData = mealResponse.data;
        setMealName(mealData.title);

        const response = await axios.get(`/api/meals/${id}/reservations`);
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
        await axios.delete(`/api/reservations/${reservationId}`);
         
        // Update the reservations list
        setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
    } catch (error) {
        console.log("Error deleting reservation:", error);
    }
};


    return(
        <div className='text-center'>
          
          <h1 className='meal-title my-4 '>Reservations</h1>
             <h2 className='meal-title'>{mealName}</h2>
             <div className="row">
          <div className='col-md-4'></div>
          <ul className='col-md-4 mt-6'>
        {reservations.map(reservation => (
          <li key={reservation.id} className='card mb-4'>
            <div className='card-body'>
            <p> <strong className='meal-title'>Name:</strong>{ reservation.contact_name}</p>
            <p> <strong className='meal-title'>email:</strong>  { reservation.contact_email}</p>
            <p>  <strong className='meal-title'>Number:</strong> { reservation.contact_number}</p>
            <button onClick={() => handleDeleteReservation(reservation.id)} className='btn btn-custom-delete btn-md'> <RiDeleteBin2Fill/></button>
          </div>
          </li>
        ))}
      </ul>
      <div className='col-md-4'></div>
      </div>
      </div>
        
    )


}

export default MealReservations;