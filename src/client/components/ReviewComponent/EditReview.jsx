import React, { useState } from 'react';
import axios from 'axios';
import "./Review.css";
const EditReview = ({ reviewId, onReviewEdited , setReviews}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStars, setNewStars] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/reviews/${reviewId}`, {
        title: newTitle,
        description: newDescription,
        stars: newStars,
        //created_date: new Date(),
      });

      if (response.status === 200) {
        // Call the callback function passed from the parent component
        // to notify that a review has been edited
        onReviewEdited();
        setReviews((prevReviews) =>
        prevReviews.map((prevReview) =>
          prevReview.id === reviewId
            ? {
                ...prevReview,
                title: newTitle,
                description: newDescription,
                stars: newStars,
              }
            : prevReview
        )
      );
      }

      // Reset form inputs
      setNewTitle('');
      setNewDescription('');
      setNewStars('');
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };


  const handleCancel = () => {
    // Reset form inputs and cancel the editing process
    setNewTitle('');
    setNewDescription('');
    setNewStars('');
    onReviewEdited(); // Notify parent component that editing has been canceled
  };

  return (
    <div className='col'>
      <h2 className='meal-title'>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Title:
          <input type="text" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} className='d-block' />
        </label>
        <br />
        <label>
          New Description:
          <textarea
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
           className='d-block'
          />
        </label>
        <br />
        <label>
          New Stars:
          <input type="number" value={newStars} onChange={(event) => setNewStars(event.target.value)} className='d-block'/>
        </label>
        <br />
        <button type="submit" className='btn btn-sm btn-custom'>Save Changes</button>
        <button type="button" onClick={handleCancel} className='btn btn-sm btn-custom-delete'>Cancel</button>
        
      </form>
    </div>
  );
};

export default EditReview;
