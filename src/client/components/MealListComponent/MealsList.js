import React, { useState, useEffect } from "react";
import {BsSortDownAlt, BsSortUpAlt} from "react-icons/bs";
import "./MealsList.css";
import Meal from "../MealComponent/Meal";
import Footer from "../FooterComponent/Footer"
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
        const response = await fetch("/api/meals");
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
        ? mealA.when_date.localeCompare(mealB.when_date)
        : mealB.when_date.localeCompare(mealA.when_date);
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
    <div className="form-outline mb-4">
    <input
      type="text"
       className="form-control text-center"
       placeholder="Search meals..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div className="d-flex align-items-center">
    <div className="col-2"></div>
  <div className="col-6">
        
        <select  className="form-select form-select-md btn-select "
          id="sort"
          value={sortKey}
          onChange={(e) => {
            setSortKey(e.target.value);
            // Reset sorting direction when changing the sort key
            setSortDir("asc");
          }}
        >
          <option value="time" >Time</option>
          <option value="max_reservations">Max Reservations</option>
          <option value="price">Price</option>
        </select>
        </div>
        <div className="col-2  d-flex justify-content-end">
        <button  onClick={toggleSortDirection} className=" btn btn-sort  btn-lg">
          {sortDir === "asc" ? <BsSortUpAlt/> : <BsSortDownAlt/>}
        </button>
      </div>
      </div>
    <div className="d-flex justify-content-center align-items-center ">
    <div className="text-center">
    <ul className="row row-cols-1 row-cols-md-2 g-6 pt-5 ">
    {sortedMeals
    .filter((meal) =>
    meal.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
    .map((meal) => (
    <li key={meal.id} className="col py-5 pb-2 meal-card">
      <Link to={`/meals/${meal.id}`}>
    <Meal meal={meal} key={meal.id} showAdditionalInfo={!!match} />
    </Link>
        </li>
    ))}
  </ul>
  </div>
  </div>
    <Footer/>
  </>
  );
};

export default MealsList;
