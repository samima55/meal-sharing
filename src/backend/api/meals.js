const express = require("express");
const router = express.Router();
const knex = require("../database");

// getting all the meals 
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// adding a new meal to the database 
router.post("/", async (request, response) => {
  try {
    const { title, description, location, when, max_reservations, price } =
      request.body;
    //insert to database
    await knex("meal").insert({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
      created_date: new Date(),
    });
    response.status(201).json({ success: true });
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});


// getting meal by the id 

router.get("/:id", async (request, response) => {
  try {
    const mealId = request.params.id;
    const meal = await knex("meal").where("id", mealId).first();
    if (!meal) {
      return response.status(404).json({ error: "meal not found" });
    }
    response.json(meal);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});


// updatig meal by the given id 

router.put("/:id", async (request, response) => {
  const mealId = request.params.id;
  const { title, description, location, when, max_reservations, price } =
    request.body;

  try {
    // Update the meal in the database using Knex
    await knex("meal").where("id", mealId).update({
      title,
      description,
      location,
      when,
      max_reservations,
      price,
    });

    response.sendStatus(204); // Successful update, no content
  } catch (error) {
    response.sendStatus(500); // Internal server error
  }
});


// deleting meal by given id 
router.delete("/:id", async (request, response) => {
  const mealId = request.params.id;
  try {
    // checking whether mealis exits
    const mealExists = await knex("meal").where("id", mealId).first();
    if (!mealExists) {
      return response.status(404).send("Meal not found.Please provide a valid id");
    }
    // delete the meal in the database using Knex
    await knex("meal").where("id", mealId).del();
    response.sendStatus(200);
  } catch (error) {
    response.sendStatus(500); // Internal server error
  }
});







module.exports = router;
