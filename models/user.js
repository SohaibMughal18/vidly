const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');

const config = require("config");
const jwt=  require('jsonwebtoken');
const userSchema = new mongoose.Schema({
      
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type: String,
        required:true,
        minlength:5,
        maxlength:100, 
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:5,
        maxlength:1024,
       },
       isAdmin: Boolean

 });
      userSchema.methods.generateAuthToken= function(){
       const token =jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
        return token; 
      }

 const User  =  mongoose.model('User', userSchema);

 function usvali(us){
    const schema={
         name : Joi.string().min(5).max(50).required(),
         email : Joi.string().min(5).max(255).required(),
         password : Joi.string().min(5).max(255).required(),
        
    }
    return Joi.validate(us ,schema);
}


exports.User= User; 
exports.usvali= usvali;




