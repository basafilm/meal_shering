const express = require("express");
const router = express.Router();
const knex = require("../database");

// Returns all reviews
router.get("/", async (req, res) => {
    try {
      const reviews = await knex("reviews").select("*")
      .orderBy('id','desc').limit('1')
      res.json(reviews);
    } catch (error) {
      throw error;
    }
  });
  // Returns reviews by id	
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const reviewsId = await knex('reviews').select('*').where({id});
      const getRev =reviewsId.map(rev=>rev.id)
        if ( getRev.length === 0) {
          res.send(`Review with the Id: ${id} not exist!`);
        } else {
          res.json(reviewsId);
        }

    } catch (error) {
      throw error;
    }
  });
// Adds a new reviews		
  router.post("/", async (req, res) => {
    try {
      const newReviews = {
        description: req.body.description,
        stars: req.body.stars,
        meal_Id: req.body.meal_Id,
        created_date: req.body.created_date
      }
      await knex('reviews').insert(newReviews)
      console.log(`You gav us feedback and ${req.body.stars} Stars`)
      res.redirect('/res');
    } catch (error) {
      throw error;
    }
  });

// Updates reviews by id	
  router.put("/:id", async (req, res) => {
    const {id}= req.params
    try {
      const updatReviews = await knex('reviews').where({id})
      .update({
            description: req.body.description,
            stars: req.body.stars,
            created_date: req.body.created_date,
            meal_Id: req.body.meal_Id,

          })
      res.json(`${updatReviews} review with id ${id} Updated `);
    } catch (error) {
      throw error;
    }
  });

// // Deletes reviews by id
  router.delete("/:id", async (request, response) => {
    const { id } =request.params;
    try {
      const reviews = await knex('reviews').where({id})
      const deletedReviews = await knex('reviews').where({id}).delete()
      const getRev =reviews.map(rev=>rev.id)
        if (getRev.length === 0) {
            response.send(`Review with the Id: ${id} not exist!`);
        } else {
          response.send(`${deletedReviews} meal with id:${id} deleted`)
        }
      
    } catch (error) {
      throw error;
    }
  });



module.exports = router;