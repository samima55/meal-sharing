import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './AddReview';
import DeleteReview from './DeleteReview';
import EditReview from './EditReview';
import Footer from "../FooterComponent/Footer";
import {BsStarFill, BsStar} from "react-icons/bs";
import './Review.css';


const MealReview = () => {

    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [mealName, setMealName] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);

    const [editingReviewId, setEditingReviewId] = useState(null);
   const [deletingReviewId, setDeletingReviewId] = useState(null);


    // Fetch meals from the API when the component mounts
    
    const fetchReviews= async () => {
     
      try {
        const mealResponse = await axios.get(`/api/meals/${id}`);
        const mealData = mealResponse.data;
        setMealName(mealData.title);

        const response = await axios.get(`/api/meals/${id}/reviews`);
        const reviewData= await response.data;
       // console.log(reviewData)
       setReviews(reviewData);
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    };


  useEffect(() => {
    // Call the fetchReviews function here
    fetchReviews();
  }, [id]);

  const handleToggleReviewForm = () => {
    setShowReviewForm(prevState => !prevState);
  };

  // Callback function to refresh reviews after adding a new review
  const handleReviewAdded = () => {
    // Fetch reviews again to include the newly added review
    fetchReviews();
    // Close the review form
    setShowReviewForm(false);
  };



    return(
      <>
     
      <div className="container p-5">
      <div className="row">
      <h1 className='meal-title my-3'>{mealName}</h1>
      <div className="col">
      <h2 className='meal-title my-6'> Reviews</h2>
        <ul>
        {reviews.map(review => (
          <li key={review.id} className='card mb-4'>
            <div className=' card-body'>
            <h3>{ review.title}</h3>
            <p> {review.description}</p>
            {/* Display star icons based on the review's star value */}
            <div>
              {[...Array(5)].map((_, index) => (
                 index < review.stars ? <BsStarFill key={index} /> : <BsStar key={index} />
                 ))}
              </div>

            {/* Only show the buttons if editingReviewId is not the current review id  when the form is on*/}
            {editingReviewId !== review.id && (
                                            <>
            <button onClick={() => setEditingReviewId(review.id)} className='btn btn-custom btn-sm mt-2'>Edit Review</button>
            <button onClick={() => setDeletingReviewId(review.id)} className='btn btn-custom-delete btn-sm mt-2'>Delete Review</button>
            </>
                )}

            {editingReviewId === review.id && (
              <EditReview reviewId={review.id} onReviewEdited={() => setEditingReviewId(null)} setReviews={setReviews}/>
            )}
            {deletingReviewId === review.id && (
              <DeleteReview reviewId={review.id} onReviewDeleted={() => setDeletingReviewId(null)} setReviews={setReviews}/>
            )}
            </div>
          </li>
        ))}
      </ul>
      </div>
      <div className="col">
                    <button onClick={handleToggleReviewForm} className="btn btn-custom">{showReviewForm ? 'Cancel Review' : 'Add Review'}</button>
                    {showReviewForm && <AddReview mealId={id} onReviewAdded={handleReviewAdded} />}
                </div>
        </div>
        </div>
        <Footer/>
        </>
    );


}

export default MealReview;