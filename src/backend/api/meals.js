const express = require("express");
const router = express.Router();
const knex = require("../database");
const validateRequestBody = (req, res, next) => {
  const { title } = req.body;
  if(!title) {
    return res.status(400).json({ error: 'Title is required'})
  }
  next();
};


// getting all the meals on meal table 
router.get("/", async (request, response) => {
 
    // knex syntax for selecting things. Look up the documentation for knex for further info
      /* const titles = await knex("meal").select("title");
    response.json(titles);
    */

    try {
      const { maxPrice, availableReservations, title, dateAfter, dateBefore, limit, sortKey, sortDir } = request.query;
  
      const query = knex('meal').select('*');
    

      //api/meals?maxPrice=90

      if (maxPrice) {
        query.where('price', '<=', maxPrice);
      }

      //api/meals?availableReservations=tru

      if (availableReservations === 'true') {
        query.where('max_reservations', '>', knex.raw('COALESCE((SELECT SUM(quantity) FROM reservations WHERE reservations.meal_id = meals.id), 0)'));
      } else if (availableReservations === 'false') {
        query.where('max_reservations', '<=', knex.raw('COALESCE((SELECT SUM(quantity) FROM reservations WHERE reservations.meal_id = meals.id), 0)'));
      }
      //api/meals?title=Indian%20platter

      if (title) {
        query.where('title', 'ilike', `%${title}%`);
      }
       //api/meals?dateAfter=2022-10-01
      if (dateAfter) {
        query.where('when_date', '>', dateAfter);
      }
       //api/meals?dateBefore=2022-08-08
      if (dateBefore) {
        query.where('when_date', '<', dateBefore);
      }
       //api/meals?limit=7
       if (limit) {
        query.limit(limit);
      }

     //api/meals?sortKey=price
    // api/meals?sortKey=price&sortDir=desc
      if (sortKey) {
        const validSortKeys = ['when_date', 'max_reservations', 'price'];
        if (validSortKeys.includes(sortKey)) {
          const order = sortDir === 'desc' ? 'desc' : 'asc';
          query.orderBy(sortKey, order);
        }
      }
     
  
      const meals = await query;
  
  
      response.json(meals);
    } catch (error) {
      response.status(500).json({ error: 'An error occurred while retrieving meals' });


    }
  });


// adding a new meal to the database 
router.post("/", async (request, response) => {
  try {
    const { title, description, location, when_date, max_reservations, price } =
      request.body;
    //insert to database
    await knex("meal").insert({
      title,
      description,
      location,
      when_date,
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
  const { title, description, location, when_date, max_reservations, price } =
    request.body;

  try {
    // Update the meal in the database using Knex
    await knex("meal").where("id", mealId).update({
      title,
      description,
      location,
      when_date,
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

//getting reservation for the specific meals 
router.get("/:id/reservations", async (req, res) => {
  try {
    const mealId = parseInt(req.params.id);
    const mealReservations = await knex('reservation')
      .select('reservation.*', 'meal.title', 'meal.description', 'meal.location', 'meal.when_date', 'meal.max_reservations', 'meal.price')
      .innerJoin('meal', 'reservation.meal_id', 'meal.id')
      .where('reservation.meal_id', mealId )
    res.json(mealReservations);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//getting reviews for the specific meals 
router.get("/:id/reviews", async (req, res) => {
  try {
    const mealId = parseInt(req.params.id);
    const mealReviews = await knex('review')
      .select('review.*', 'meal.title as meal_title', 'meal.description as meal_description', 'meal.max_reservations', 'meal.price')
      .innerJoin('meal', 'review.meal_id', 'meal.id')
      .where('review.meal_id', mealId )
    res.json(mealReviews);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
