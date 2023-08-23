import React, { useState, useEffect } from "react";
import "./MealsList.css";
import Meal from "../MealComponent/Meal";

const MealsList = () => {
  // State to hold the list of meals
  const [mealsList, setMealsList] = useState([]);

  // Fetch meals from the API when the component mounts
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
    <ul className="mealslist">
    {mealsList.map((meal) => (
    <Meal meal={meal} key={meal.id} />
    ))}
  </ul>
  );
};

export default MealsList;
