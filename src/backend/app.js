const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("./database");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);



// Route to get future meals sorted by specific ID
app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex
      .select()
      .from("meal")
      .where("when_date", "<", knex.fn.now());

    if (!meals.length) {
      return res.status(404).json({ error: "No meal found" });
    }
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" }); // Corrected response format
  }
});


// Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex
      .select()
      .from("meal")
      .where("when_date", "<", knex.fn.now())
      .orderBy("id");

    if (!meals) {
      // If no meal is found, return a 404 status code
      return res.status(404).json({ error: "No meal found" });
    }
    res.status(200).json(meals[0]);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});

// Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id");
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});

//Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id")
      .first();
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});
//Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id", "desc")
      .limit(1);
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});

// get some meals 
app.get("/", async (req, res) => {
  try {
    const meal = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id", "asc")
      .limit(3);
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});







// Route to get future meals sorted by ID
app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex
      .select()
      .from("meal")
      .where("when", ">", knex.fn.now());
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

// Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex
      .select()
      .from("meal")
      .where("when", "<", knex.fn.now())
      .orderBy("id");
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json(" Server Error");
  }
});


// Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id");
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});


//Respond with the first meal 
app.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id","asc")
      .limit(1)
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json("404 error");
  }
});


//Respond with the last meal
app.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex
      .select("title", "description")
      .from("meal")
      .orderBy("id", "desc")
      .limit(1);
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json("500. Internal Server Error");
  }
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
