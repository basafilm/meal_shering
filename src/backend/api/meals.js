const express = require("express");
const router = express.Router();
const knex = require("../database");

    // Returns meal by id	
    router.get("/:id", async (request, response) => {
      const { id } = request.params;
      try {
       let meal = await knex('meals').select(knex.raw('DISTINCT meals.id, meals.title, meals.description, meals.location, meals.when, meals.max_reservations, meals.price, meals.created_date, SUM(reservations.number_of_guests)  AS totalOfGuests'))
        .leftJoin(knex.raw('reservations ON reservations.meal_Id = meals.id'))
        .where(knex.raw('meals.id =?',id))
        .groupBy('meals.id')
       const getMeal =meal.map(m=>m.id)
       // to find out if Id exist 
          if(getMeal.length===0){
            response.send(`Meal with the Id: ${id} not exist!`);
          } else {
            response.json(meal)
          }
      } catch (error) {
        throw error;
      }
    });

// Adds a new meal	
    router.post("/", async (req, response) => {
      try {
        const newMeals = {
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          when: req.body.when,
          max_reservations: req.body.max_reservations,
          price: req.body.price,
          created_date: req.body.created_date
        }
        await knex('meals').insert(newMeals)
        response.redirect("/res")
      } catch (error) {
        throw error;
      }
    });


// Updates the meal by id	
    router.put("/:id", async (req, res) => {
      const {id}= req.params;
      try {
        const updatMeal = await knex('meals').where({id})
        .update({
              title: req.body.title,
              description: req.body.description,
              location: req.body.location,
              when: req.body.when,
              max_reservations: req.body.max_reservations,
              price: req.body.price,
              created_date: req.body  .created_date

            })
        res.json(`${updatMeal} meal with id : ${id} updated!`);
      } catch (error) {
        throw error;
      }
    });

 // Deletes the meal by id
    router.delete("/:id", async (request, response) => {
    const { id } =request.params;
      try {
        const meal=  await knex('meals').select('*').where({id});
        const deletedMeal=  await knex('meals').select('*').where({id}).delete();
        const getMeal =meal.map(m=>m.id)
        // to find out if Id exist 
           if(getMeal.length===0){
             response.send(`Meal with the Id: ${id} not exist!`);
           } else {
             response.send(`${deletedMeal} meal with id:${id} deleted`)
           }
        
      } catch (error) {
        throw error;
      }
    })

module.exports = router;

