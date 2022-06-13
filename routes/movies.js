const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const Joi = require('joi');
const {Movie, movvali} = require("../models/movie");
const {Genre} = require("../models/genre");


  router.get('/', async(req , res)=>{
    const movie =  await Movie.find();
    res.send(movie);
  });
  
  router.get("/:id", async (req, res)=>{
      const mov1 = await Movie.findById(req.params.id);
        if (!mov1) return res.status(404).send("The course is not available");
        res.send(mov1);
  });  

  router.post("/", async (req , res)=>{
    const {error} = movvali(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    
    const mov = new Movie({
         title : req.body.title,
       // genre:genre,   // for getting total properties
        genre :{
         _id:genre._id,
         name:genre.name,
         author:genre.author,
         price:genre.price   
         },
         RIstock :req.body.RIstock,
         DRrate: req.body.DRrate
     }) 
    await mov.save();
    res.send(mov);
    });
    
    router.put("/:id" ,async (req , res)=>{
        const {error} = movvali(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send('Invalid genre');
    

        const mov = await Movie.findByIdAndUpdate(req.params.id,{
            $set:{
               title : req.body.title,
         genre :{
                     _id:genre._id,
                    name:genre.name 
                },
         RIstock :req.body.RIstock,
         DRrate:req.body.DRrate
            }
        },{new:true} );
        
        if (!mov) return res.status(404).send("The course is not available");
    
      res.send(mov);
            });
    
    
    router.delete("/:id" , async(req , res)=>{
        
        
        const result =await Movie.findByIdAndRemove(req.params.id)
        if (!result) return res.status(404).send("The course is not available")
         res.send(result);    
    
    });

    module.exports = router; 