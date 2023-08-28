import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReservationForm from "../ReservationComponent/ReservationForm";
import "./MealDetail.css";
import Footer from "../FooterComponent/Footer"

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
        setHasAvailableReservations(meal.max_reservations > 0);
      } catch (error) {
        console.log("Error fetching meal detail:", error);
      }
    };

    fetchMealDetail();
  }, [id]);

  return (
    <>
    <div className="container px-4 container-meal-detail">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              {mealDetail ? (
                <div className="meal-detail">
                  <h3 className="meal-title card-title">{mealDetail.title}</h3>
                  <p className="mb-2">{mealDetail.description}</p>
                  <p className=" mb-2 ">{mealDetail.price} DKK</p>
                  <p className="mb-2">Location: {mealDetail.location}</p>
                  <p className="mb-2">Max reservations: {mealDetail.max_reservations}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <Link to="/" className="btn btn-custom mt-3">
          Back to Home
        </Link>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              {hasAvailableReservations ? (
                <div className="reservation-form">
                  <ReservationForm meal_id={mealDetail} />
                </div>
              ) : (
                <p>No available reservations for this meal.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default MealDetail;
