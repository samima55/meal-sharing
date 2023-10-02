import React, { useState } from 'react';
import axios from 'axios';
import "./Review.css";
const AddReview = ({ mealId, onReviewAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stars, setStars] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/reviews`, {
        title,
        description,
        meal_id: mealId,
        stars,
        created_date: new Date(),
      });
      
      if (response.status === 201) {

        // Call the callback function passed from the parent component
        // to notify that a new review has been added
        onReviewAdded();
        alert('review addded');
      }

      // Reset form inputs
      setTitle('');
      setDescription('');
      setStars('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className='col '>
    <h2 className='meal-title'> newReview</h2>
    <form onSubmit={handleSubmit}>
      <label className='form-label'>
        Title:
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} className='d-block' />
      </label>
      <br />
      <label className='form-label'>
        Description:
        <textarea value={description} onChange={event => setDescription(event.target.value)} className='d-block'/>
      </label>
      <br />
      <label className='form-label'>
        Stars:
        <input type="number" value={stars} onChange={event => setStars(event.target.value)} className='d-block'/>
      </label>
      <br />
      <button type="submit" className='btn btn-custom d-block'>Submit Review</button>
    </form>
  </div>
  );
};

export default AddReview;
