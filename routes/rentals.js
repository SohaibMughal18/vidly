const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const Joi = require('joi');
const {Rental, renvali} = require("../models/rental");
const {Movie} = require("../models/movie");
const {Customer} = require("../models/customer");
const Fawn = require('fawn');

Fawn.init('mongodb://localhost/vidly');

router.get('/', async(req , res)=>{
    const rentals =  await Rental.find().sort('-dateOut');
    res.send(rentals);
  });
  
  router.get("/:id", async (req, res)=>{
      const ren1 = await Rental.findById(req.params.id);
        if (!ren1) return res.status(404).send("The course is not available");
        res.send(ren1);
  });

 router.post("/", async (req , res)=>{
    const {error} = renvali(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');
    
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie');
  
    if (movie.RIstock===0) return res.status(400).send("movie not in stock   "); 
    let rental = new Rental({
         customer: {
             _id:customer._id,
             name:customer.name,
             phone:customer.phone
         },
         movie:{
             _id:movie._id,
             title:movie.title,
             DRrate:movie.DRrate
         }
   
     })
    try{  
         new Fawn.Task()
           .save("rentals" , rental )
           .update('movies', {_id:movie._id},{
            $inc:{RIstock:-1}   
            })
            .run();

     // rental = await rental.save(); 
    // movie.RIStock--;
    // movie.save
         res.send(rental);
    }
    catch(ex) {
        res.status(500).send('Something failed');
    }   
});

router.put("/:id" ,async (req , res)=>{
    const {error} = renvali(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');
    
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie');


    const ren = await Rental.findByIdAndUpdate(req.params.id,{
        $set:{
            customer: {
                _id:customer._id,
                name:customer.name,
                phone:customer.phone
            },
            movie:{
                _id:movie._id,
                title:movie.title,
                DRrate:movie.DRrate
            }
        }
    },{new:true} );
    
    if (!ren) return res.status(404).send("The course is not available");

  res.send(ren);
        });

        router.delete("/:id" , async(req , res)=>{
        
        
            const result =await Rental.findByIdAndRemove(req.params.id)
            if (!result) return res.status(404).send("The course is not available")
             res.send(result);    
        
        });  

    module.exports = router; 