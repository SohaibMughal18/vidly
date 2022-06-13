const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50
  },
  isGold:{
    type:Boolean,
    default:false
  },
  phone:{ 
    type: Number,
    required:true,
    minlength:5,
    maxlength:50
  },
  
    });
const Customer = mongoose.model("Customer" , customerSchema);
    
function custvali(cust){
        const schema={
             name : Joi.string().min(5).max(50).required(),
             phone : Joi.number().required(),
             isGold: Joi.boolean()
        }
        return Joi.validate(cust ,schema);
    };

exports.Customer = Customer;
exports.custvali = custvali;
  







