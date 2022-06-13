const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const {Customer,custvali} =require("../models/customer");
 

  router.get('/', async(req , res)=>{
    const customer =  await Customer.find();
    res.send(customer);
  });
  
  router.get("/:id", async (req, res)=>{
      const cou1 = await Customer.findById(req.params.id);
        if (!cou1) return res.status(404).send("The course is not available");
        res.send(cou1);
  });  

  router.post("/", async (req , res)=>{
    const {error} = custvali(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     const rc = custvali(req.body);
     console.log(rc);
     let cou = new Customer({
         name : req.body.name,
         phone: req.body.phone,
         isGold:req.body.isGold
    
     })
    cou = await cou.save();
    res.send(cou);
    });
    
    router.put("/:id" ,async (req , res)=>{
        const {error} = custvali(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const cou = await Customer.findByIdAndUpdate(req.params.id,{
            $set:{
              name : req.body.name,
              phone:req.body.phone,
              isGold:req.body.isGold
            }
        },{new:true} );
        
        if (!cou) return res.status(404).send("The course is not available");
    
      res.send(cou);
            });
    
    
    router.delete("/:id" , async(req , res)=>{
        
        
        const result =await Customer.findByIdAndRemove(req.params.id)
        if (!result) return res.status(404).send("The course is not available")
         res.send(result);    
    
    });
       
    
    
    module.exports = router; 




 