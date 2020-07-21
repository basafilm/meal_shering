const express = require("express");
const router = express.Router();
const knex = require("../database");

// Returns all reservations	
router.get("/", async (req, res) => {
    try {
      const reservations = await knex("reservations").select("*");
      res.json(reservations);
    } catch (error) {
      throw error;
    }
  });

// Returns reservations	 by id	
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const reservationsId = await knex('reservations').select('*').where({id});
    const getReservation = reservationsId.map(reserve = reserve.id)
      if (getReservation.length === 0) {
        response.send(`Reservation with the Id: ${id} not exist!`);
      } else {
        response.json(reservationsId);
      }

 } catch (error) {
    throw error;
  }
});

// Adds a new reservations		
  router.post("/", async (req, res) => {
    try {
      const newReservations = {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        phoneNum : req.body.phoneNum,
        emailAdd : req.body.emailAdd,
        meal_Id: req.body.meal_Id,
        number_of_guests: req.body.number_of_guests,
        created_date: req.body.created_date
      }
      await knex('reservations').insert(newReservations)
      res.redirect("/res")
    } catch (error) {
      throw error;
    }
  });

// Updates reservations	 by id	
  router.put("/:id", async (req, res) => {
    const {id} = req.params;
    try {
      const updatReservations = await knex('reservations').where({id})
      .update({
            number_of_guests: req.body.number_of_guests,
            mealId: req.body.mealId,
            created_date: req.body.created_date
          })
      res.json(`${updatReservations} reservation with id: ${id} Updated!`);
    } catch (error) {
      throw error;
    }
  });

// // Deletes reservations by id
  router.delete("/:id", async (request, response) => {
    const { id } =request.params;
    try {
      const reservation = await knex('reservations').where({id})
      const deleteReservations = await knex('reservations').where({id}).delete()
      const getReservation = reservation.map(reserve => reserve.id)
          if (getReservation.length === 0) {
            response.send(`Reservation with the Id: ${id} not exist!`);
          } else {
            response.send(`${deleteReservations} meal with id:${id} deleted`)
          }
    } catch (error) {
      throw error;
    }
  });

module.exports = router;