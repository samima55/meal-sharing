import React from 'react';
import { useParams } from "react-router-dom";

 import "../MealListComponent/MealsList.css";
 import { GrNotes } from "react-icons/gr";
 import  {RiDeleteBin2Fill} from "react-icons/ri"
 import {AiFillStar} from "react-icons/ai"
 import { Link } from 'react-router-dom';
 const Meal = ({ meal }) => {
 
  return (
   
    <div className='meal-item'>
      <h2>{meal.title}</h2>
      <p className='description'>
        {meal.description} 
      </p>
       <p className='prince'>
       {meal.price} DKK
       </p>
       <h2> 
        {/* Use Link component to navigate to the reservations page */}
        <Link to={`/meals/${meal.id}/reservations`}><GrNotes /></Link>
         <RiDeleteBin2Fill/>
         <Link to={`/meals/${meal.id}/reviews`}>  <AiFillStar/> </Link>
         
          </h2>
    </div>
    
  );
};

export default Meal;