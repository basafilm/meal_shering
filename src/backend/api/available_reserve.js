const express = require("express");
const router = express.Router();
const knex = require("../database");
const { sum, unionAll, from } = require("../database");
console.log("domething")

router.get("/", async (req, res) => {
  const courentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
    let leftReservation = await knex('meals').select(knex.raw('DISTINCT meals.id,meals.hostName, meals.title, meals.description AS mealDescrip, meals.location, meals.when, meals.max_reservations, meals.price, SUM(DISTINCT reservations.number_of_guests)  AS totalOfGuests, AVG(reviews.stars) AS totalStars ,GROUP_CONCAT(DISTINCT reviews.description) AS revDescrip'))
    .leftJoin(knex.raw('reservations ON reservations.meal_Id = meals.id'))
    .leftJoin(knex.raw('reviews ON reviews.meal_Id = meals.id'))
    .where(knex.raw('meals.when >?',courentDate))
    .whereNull(knex.raw('reservations.number_of_guests >= meals.max_reservations'))
    .orWhereNotNull(knex.raw('reservations.number_of_guests >= meals.max_reservations'))
    .groupBy('meals.id')
    .orderBy('meals.id' , 'desc')
    
            res.send(leftReservation)

} catch (error) {
     throw error;
  }
})

module.exports = router;