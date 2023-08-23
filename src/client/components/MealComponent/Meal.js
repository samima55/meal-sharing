import React from 'react';
 import "../MealListComponent/MealsList.css";
const Meal = ({ meal }) => {
  return (
    <li className='meal-item'>
      <h3>{meal.title}</h3>
      <p className='description'>
        {meal.description} 
      </p>
       <p className='prince'>
       {meal.price} DKK
       </p>
    </li>
  );
};

export default Meal;