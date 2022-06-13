const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const Joi = require('joi');
const {User} = require("../models/user");
const config = require("config");
const jwt=  require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require("bcrypt");

router.post('/', async(req , res)=>{
    const {error} = auvali(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user= await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send("Invalid Email or password");
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid Email or password");
    
    const token =user.generateAuthToken(); 
    
     res.send(token);
    });

    function auvali(user){
        const schema={
             email : Joi.string().min(5).max(255).required(),
             password : Joi.string().min(5).max(255).required(),
            
        }
        return Joi.validate(user ,schema);
    }
      // info Expert Principle
  


module.exports = router; 