import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './AddReview';
import DeleteReview from './DeleteReview';
import EditReview from './EditReview';




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
        const mealResponse = await axios.get(`http://localhost:3000/api/meals/${id}`);
        const mealData = mealResponse.data;
        setMealName(mealData.title);

        const response = await axios.get(`http://localhost:3000/api/meals/${id}/reviews`);
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
        <div>
             <h1>{mealName}</h1>
             <button onClick={handleToggleReviewForm}>Add Review</button>
             {showReviewForm && <AddReview mealId={id} onReviewAdded={handleReviewAdded} />}
          <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h2>{ review.title}</h2>
            <p> {review.description}</p>
            <button onClick={() => setEditingReviewId(review.id)}>Edit Review</button>
            <button onClick={() => setDeletingReviewId(review.id)}>Delete Review</button>
            {editingReviewId === review.id && (
              <EditReview reviewId={review.id} onReviewEdited={() => setEditingReviewId(null)} setReviews={setReviews}/>
            )}
            {deletingReviewId === review.id && (
              <DeleteReview reviewId={review.id} onReviewDeleted={() => setDeletingReviewId(null)} setReviews={setReviews}/>
            )}
          </li>
        ))}
      </ul>
        </div>
    )


}

export default MealReview;