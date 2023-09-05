
const  validateReview = require('../datavalidation');
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
//http://localhost:5000/api/reviews/meals/1/reviews -> route 
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
  
  const {
    title,
    description,
    meal_id, // Rename for clarity
    stars,
    created_date: isoCreatedDate,
  } = req.body;
  const isoDate = new Date(isoCreatedDate);

  const mysqlFormattedDate = isoDate.toISOString().slice(0, 10);


  try {
    // Insert the new review into the database
    
    const newReview = await knex("review").insert({
      title,
      description,
      meal_id,
      stars,
      created_date: mysqlFormattedDate
      //new Date().toISOString().split("T")[0], // Set the current date as the created_date
    });
    // Fetch the newly created review from the database
    //const review = await knex("review").where("id", reviewId).first();
    // Send the response with the newly created review
    res.status(201).json(newReview);
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
  //const { title, description, stars, created_date } = req.body;
  const {
    title,
    description,
    stars,
    //created_date: isoCreatedDate,
  } = req.body;
  //const isoDate = new Date(isoCreatedDate);

  //const mysqlFormattedDate = isoDate.toISOString().slice(0, 10);
 
  try {
    const updatedRows = await knex("review").where("id", reviewId).update({
      title,
      description,
      stars,
      //created_date: mysqlFormattedDate
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
router.delete('/:id', async (req, res) => {
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