import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FrontPage.css";
import Meal from "../MealComponent/Meal";
const FrontPage = () => {

  const [mealsList, setMealsList] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/meals");
        const meals = await response.json();
        setMealsList(meals);
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);



  return (
    <div className="d-flex justify-content-center align-items-center ">
    <div className="text-center">
      <h1 className="pt-5"> wlcm to Meal Sharing App</h1>
      <ul className="row row-cols-1 row-cols-md-2 g-4">
      {mealsList
          .slice(0, 2) // Display only the first two meals
          .map((meal) => (
            <li key={meal.id} className="col pt-3 pb-2">
                <Meal meal={meal} key={meal.id} />
            </li>
          ))}
        </ul>
      <Link to="/meals" className="btn btn-custom btn-lg mt-3">
         see meals
       </Link>
     
    </div>
    </div>
  );
};

export default FrontPage;
