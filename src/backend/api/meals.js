const express = require("express");
const router = express.Router();
const knex = require("../database");

// GET api/meals/ query parameters 

router.get("/", async (req, res) => {
  try {
    const {
      maxPrice,
      availableReservations,
      title,
      createdAfter,
      limit } = req.query
let meals = await knex('meals')
    if (maxPrice) {
      // Get meals that has a price smaller than maxPrice
      const getMaxPrice = parseInt(maxPrice)
      meals = await knex('meals')
      .select('*')
      .where('price', '<', getMaxPrice)
    }

    if(availableReservations) {
          // Get meals that still has available reservations ?
          
        meals = await knex('meals').select(knex.raw('meals.id, meals.title,meals.max_reservations, COALESCE(SUM(reservations.number_of_guests))'))
          .leftJoin(knex.raw('reservations ON reservations.meal_Id = meals.id'))
          .where(knex.raw('max_reservations > reservations.number_of_guests'))
          .groupBy('reservations.id')
        }

       if(title) {
            // Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
            meals = await knex('meals')
            .select('*')
            .where('title', 'like' , `%${title.trim()}%`)
       } 

       if(createdAfter) {
       //Get meals that has been created after the date
          const afterDate = new Date(createdAfter)
            meals = await knex('meals')
            .select('*')
            .where('created_date', '>' ,afterDate)
          } 

          if (limit) {
              // Only specific number of meals
            const getLimit = parseInt(limit)
              meals = await knex('meals')
              .select('*')
              .limit(getLimit)
            } 
            res.send(meals)
  } catch (error) {
    throw error;
  }
});

// Returns all meals	
    // router.get("/", async (request, response) => {
    //   try {
    //     const meals = await knex("meal").select("*");
    //     response.json(meals);
    //   } catch (error) {
    //     throw error;
    //   }
    // });

    // Returns meal by id	
    router.get("/:id", async (request, response) => {
      const { id } = request.params;
      try {
       const meal=  await knex('meals').select('*').where({id});
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

