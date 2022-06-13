const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const Joi = require('joi');
const {Course, courvali} = require("../models/course");
const auth =require('../middleware/auth');


  router.get('/', async(req , res)=>{
    const course =  await Course.find();
    res.send(course);
  });
  
  router.get("/:id",auth, async (req, res)=>{
      const cou1 = await Course.findById(req.params.id);
        if (!cou1) return res.status(404).send("The course is not available");
        res.send(cou1);
  });  

  router.post("/", async (req , res)=>{
    const {error} = courvali(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     const rc = courvali(req.body);
     //console.log(rc);
     let cou = new Course({
         name : req.body.name,
         author:req.body.author,
         price:req.body.price,
         tags:req.body.tags
     })
    cou = await cou.save();
    //res.send(cou);
    });
    
    router.put("/:id" ,async (req , res)=>{
        const {error} = courvali(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const cou = await Course.findByIdAndUpdate(req.params.id,{
            $set:{
                name : req.body.name,
                author:req.body.author,
                price:req.body.price,
                tags:req.body.tags
            }
        },{new:true} );
        
        if (!cou) return res.status(404).send("The course is not available");
    
      res.send(cou);
            });
    
    
    router.delete("/:id" , async(req , res)=>{
        
        
        const result =await Course.findByIdAndRemove(req.params.id)
        if (!result) return res.status(404).send("The course is not available")
         res.send(result);    
    
    });

    module.exports = router; 