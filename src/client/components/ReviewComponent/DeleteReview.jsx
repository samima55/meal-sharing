import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const DeleteReview = ({ reviewId, onReviewDeleted,setReviews }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/reviews/${reviewId}`);

      if (response.status === 200) {
        // Call the callback function passed from the parent component
        // to notify that a review has been deleted
        onReviewDeleted();
        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

   useEffect(() => {
    
  }, []);

  return (
    <div>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onReviewDeleted}>Cancel</button>
    </div>
  );
};

export default DeleteReview;
