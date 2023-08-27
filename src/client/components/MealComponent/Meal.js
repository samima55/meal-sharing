import React from 'react';
import { useParams } from "react-router-dom";

 import "../MealListComponent/MealsList.css";
 import { GrNotes } from "react-icons/gr";
 import  {RiDeleteBin2Fill} from "react-icons/ri"
 import {AiFillStar} from "react-icons/ai"
 import { Link } from 'react-router-dom';
 const Meal = ({ meal }) => {
 
  return (
   
    <div className='card'>
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top" alt="Hollywood Sign on The Hill"/>
      <div className='card-body'>
      <h2 className='card-title'>{meal.title}</h2>
      <p className='card-text'>
        {meal.description} 
      </p>
       <p className=''>
       {meal.price} DKK
       </p>
       <h2> 
        {/* Use Link component to navigate to the reservations page */}
        <Link to={`/meals/${meal.id}/reservations`}><GrNotes /></Link>
         <RiDeleteBin2Fill/>
         <Link to={`/meals/${meal.id}/reviews`}>  <AiFillStar/> </Link>
          </h2>
          </div>
    </div>
    
  );
};

export default Meal;