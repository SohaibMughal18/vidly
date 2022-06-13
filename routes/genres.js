const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const Joi = require('joi');
const {Genre , genvali} = require("../models/genre.js");
const auth =require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMware= require('../middleware/async.js'); 


router.get('/', async(req , res )=> {
  
  const genres =  await Genre.find();
  res.send(genres);
 
});
  
router.get("/:id", asyncMware  (async (req, res)=>{
    const gen1 = await Genre.findById(req.params.id);
      if (!gen1) return res.status(404).send("The course is not available");
      res.send(gen1);
}));

router.post("/",auth,  async (req , res)=>{


const {error} = genvali(req.body);
if (error) return res.status(400).send(error.details[0].message);
 const rc = genvali(req.body);
 console.log(rc);
 const gen = new Genre({
     name : req.body.name,
     author:req.body.author,
     price:req.body.price

 })
 await gen.save();
res.send(gen); 
});

router.put("/:id" ,auth,async (req , res)=>{
    const {error} = genvali(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const gen = await Genre.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            author:req.body.author,
            price:req.body.price
        }
    },{new:true} );
    
    if (!gen) return res.status(404).send("The course is not available");

  res.send(gen);
        });


router.delete("/:id" ,[auth , admin] , async(req , res)=>{
    
    
    const result =await Genre.findByIdAndRemove(req.params.id)
    if (!result) return res.status(404).send("The course is not available")
     res.send(result);    

});
   


module.exports = router;  