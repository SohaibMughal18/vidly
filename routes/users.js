const mongoose = require("mongoose");
const express = require('express');
const router  = express.Router();
const Joi = require('joi');
const {User , usvali} = require("../models/user");

const _ = require('lodash');
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");


router.get('/me',auth, async(req , res)=>{
  
  const user = await User.findById(req.user._id).select('-password');
res.send(user);  
}); 
router.get('/', auth, async(req , res)=>{
  
  const user = await User.find().select('password');
res.send(user);  
}); 


router.post('/', async(req , res)=>{
    const {error} = usvali(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user= await User.findOne({email:req.body.email});
    if (user) return res.status(400).send("User Already Rejistered");

    const rc = usvali(req.body);
     console.log(rc);
     
    //   user = new User({
    //      name : req.body.name,
    //      email:req.body.email,
    //      password:req.body.password
    
    //  })
    user = new User(_.pick(req.body,['name','email','password']));
      // hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt );

    await user.save();
    
    //const token =jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    //  res.send({
        //     name : req.body.name,
        //     email:req.body.email
        // });
        
        res.header('x-auth-token', token).send( _.pick(user, ['_id','name', 'email']));
    });


   


module.exports = router; 