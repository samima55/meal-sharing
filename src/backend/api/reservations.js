const express = require("express");
const router = express.Router();
const knex = require("../database");

// /api/reservations	GET	Returns all reservations
router.get("/", async (req, res) => {
  try {
    const reservation = await knex("reservation");
    if (!reservation) {
      return res.status(404).json({ error: "no reserbvatoions yet" });
    }
    res.json(reservation);
  } catch (error) {
    res.sendStatus(500);
  }
});


// /api/reservations	POST	Adds a new reservation to the database
router.post("/", async (req, res) => {
    const {
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;
    try {
      const newReservation = await knex("reservation").insert({
        number_of_guests,
        meal_id,
        created_date: new Date(),
        contact_phonenumber,
        contact_name,
        contact_email,
      });
      res.status(201).json(newReservation);
    } catch (error) {
      res.sendStatus(500); // Internal server error
    }
  });
  

  // /api/reservations/:id	GET	Returns a reservation by id
router.get("/:id", async (req, res) => {
    const reservationId = req.params.id;
    try {
      const reservation = await knex("reservation").where("id", reservationId);
      if (!reservation) {
        return response.status(404).json({ error: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      res.sendStatus(500);
    }
  });
  // /api/reservations/:id	PUT	Updates the reservation by id
  router.put("/:id", async (req, res) => {
    const reservationId = req.params.id;
    const {
      number_of_guests,
      meal_id,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;
    try {
      const reservationExists = await knex("reservation")
        .where("id", reservationId)
        .first();
      if (!reservationExists) {
        return res
          .status(404)
          .send("Reservation not found.Please provide a valid id");
      }
      await knex("reservation").where("id", reservationId).update({
        number_of_guests,
        meal_id,
        contact_phonenumber,
        contact_name,
        contact_email,
      });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });
  
  // /api/reservations/:id	DELETE	Deletes the reservation by id
  
  router.delete("/:id", async (req, res) => {
    const reservationId = req.params.id;
    try {
      // checking whether mealis exits
      const reservationExists = await knex("meal")
        .where("id", reservationId)
        .first();
      if (!reservationExists) {
        return res
          .status(404)
          .send("Reservation not found.Please provide a valid id");
      }
      // delete the meal in the database using Knex
      await knex("reservation").where("id", reservationId).del();
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500); // Internal server error
    }
  });
  
  module.exports = router;