const express = require('express');
const router = express.Router();
const knex = require('../database');

// GET all reviews ->>/api/reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await knex("review").select();
        res.json(reviews);
      } catch (error) {
        throw error;
      }

});


// GET reviews for a specific meal->>/api/meals/:meal_id/reviews
//http://localhost:5000/api/reviews/meals/1/reviews
router.get('/meals/:meal_id/reviews', async (req, res) => {
    try {
        const mealId = req.params.meal_id;
        const reviews = await knex("review").where("meal_id", mealId).select();
        res.json(reviews);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
  });



  // adding a review to the meal 
router.post('/', async (req, res) =>{
  const { error, value } = validateReview(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Extract review data from the request body
    const { title, description, meal_id, stars } = req.body;
    // Insert the new review into the database
    const [reviewId] = await knex("review").insert({
      title,
      description,
      meal_id,
      stars,
      created_date: new Date().toISOString().split("T")[0], // Set the current date as the created_date
    });
    // Fetch the newly created review from the database
    const review = await knex("review").where("id", reviewId).first();
    // Send the response with the newly created review
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }

});




///api/reviews/:id	GET	Returns a review by id.
router.get('/:id', async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await knex("review").where("id", reviewId).first();
    
        if (!review) {
          return res.status(404).json({ error: "Review not found" });
        }
    
        res.json(review);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
});


///api/reviews/:id	PUT	Updates the review by id.

router.put('/:id', async (req, res) => {
    const reviewId = req.params.id;
  const { title, description, stars, created_date } = req.body;

  const { error, value } = validateReview(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const updatedRows = await knex("review").where("id", reviewId).update({
      title,
      description,
      stars,
      created_date,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Fetch the updated review from the database
    const updatedReview = await knex("review").where("id", reviewId).first();

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});



///api/reviews/:id	DELETE	Deletes the review by id
router.put('/:id', async (req, res) => {
    try {
        const reviewId = req.params.id;
    
        // Delete the review from the database
        const deletedRows = await knex("review").where("id", reviewId).del();
    
        if (deletedRows === 0) {
          return res.status(404).json({ error: "Review not found" });
        }
    
        res.json({ message: "Review deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
});




  module.exports = router;