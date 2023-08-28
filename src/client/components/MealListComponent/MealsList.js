import React, { useState, useEffect } from "react";
import "./MealsList.css";
import Meal from "../MealComponent/Meal";
import { Link } from "react-router-dom";
const MealsList = ( {match}) => {
  console.log(match);
  // State to hold the list of meals
  const [mealsList, setMealsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState('time'); // Default sorting key
  const [sortDir, setSortDir] = useState('asc'); // Default sorting dire

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

  const toggleSortDirection = () => {
    setSortDir((prevSortDir) => (prevSortDir === "asc" ? "desc" : "asc"));
  };

  const sortedMeals = mealsList.slice().sort((mealA, mealB) => {
    if (sortKey === "time") {
     
      return sortDir === "asc"
        ? mealA.when.localeCompare(mealB.when)
        : mealB.when.localeCompare(mealA.when);
    } else if (sortKey === "max_reservations") {
      console.log("Sorting by max reservations");
      return sortDir === "asc"
        ? mealA.max_reservations - mealB.max_reservations
        : mealB.max_reservations - mealA.max_reservations;
    } else if (sortKey === "price") {
     
      return sortDir === "asc"
        ? mealA.price - mealB.price
        : mealB.price - mealA.price;
    }
    return 0;
  });
  



  return (
    <>
    <div className="search-bar">
    <input
      type="text"
      placeholder="Search meals..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortKey}
          onChange={(e) => {
            setSortKey(e.target.value);
            // Reset sorting direction when changing the sort key
            setSortDir("asc");
          }}
        >
          <option value="time">Time</option>
          <option value="max_reservations">Max Reservations</option>
          <option value="price">Price</option>
        </select>
        <button onClick={toggleSortDirection}>
          {sortDir === "asc" ? "⬆️" : "⬇️"}
        </button>
      </div>
    <ul className="mealslist">
    {sortedMeals
    .filter((meal) =>
    meal.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
    .map((meal) => (
    <li key={meal.id} className="meal-item">
      <Link to={`/meals/${meal.id}`}>
    <Meal meal={meal} key={meal.id} showAdditionalInfo={!!match} />
    </Link>
        </li>
    ))}
  </ul>
  </>
  );
};

export default MealsList;
