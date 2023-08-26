import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReservationForm from "../ReservationComponent/ReservationForm";
import "./MealDetail.css"; 


const MealDetail = () => {
  const { id } = useParams();
  const [mealDetail, setMealDetail] = useState(null);
  const [hasAvailableReservations, setHasAvailableReservations] = useState(false);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/meals/${id}`);
        const meal = await response.json();
        setMealDetail(meal);
        console.log(meal);
        setHasAvailableReservations(meal.max_reservations > 0);
      } catch (error) {
        console.log("Error fetching meal detail:", error);
      }
    };

    fetchMealDetail();
  }, [id]);



  return (
    <div className="container">
      <h2>Meal Detail </h2>
      
      {mealDetail ? (
        <div className="meal-detail">
          <h3 className="meal-title">{mealDetail.title}  </h3>
          <p className="meal-description">{mealDetail.description}</p>
          <p className="meal-price">Price: {mealDetail.price} DKK</p>
          <p className="meal-price">Location: {mealDetail.location} </p>
          <p className="meal-price">Max reservation :{mealDetail.max_reservations} </p>

          {hasAvailableReservations ?  (
            <div className="reservation-form">
              <ReservationForm meal_id={mealDetail.id}  />
            </div>
          
          ) : (
            <p>No available reservations for this meal.</p>
          )}
         

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MealDetail;
