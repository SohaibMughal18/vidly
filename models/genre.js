const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    author:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    price:{
        type:String,
        required:true,
        //trim:true
     
    },
    tags: {
     type: Array,
     validate:{
       isAsync:true,
       validator:function (v , callback){
         setTimeout(()=>{
           callback ( v && v.length>0 );
           
         },3000)
       },
       message:'A course should atleast one tag.'
     }
 },
    isPublished: Boolean,
  
    date: {type: Date , default: Date.now},
 });
 const Genre =  mongoose.model('Genre', genreSchema);

 function genvali(gen){
    const schema={
         name : Joi.string().min(2).required(),
         author : Joi.string().min(2).required(),
         price : Joi.string().min(2).required(),
         tags  : Joi.array().min(1).required()
    }
    return Joi.validate(gen ,schema);
}

exports.genreSchema= genreSchema;
exports.Genre= Genre; 
exports.genvali= genvali;




