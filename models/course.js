const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50
  },
  author:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50
  },
  price:{
      type:String,
      required:true
  },

  isPublished: Boolean,

  date: {type: Date , default: Date.now},
  tags: {
    type: Array,
    validate:{
      isAsync:true,
      validator:function(v , callback){
        setTimeout(()=>{
          callback(v && v.length>0 );
          
        },3000)
      },
      message:'A course should atleast one tag.'
    }
    
  },
    });
    const Course = mongoose.model("Course" , courseSchema);
    
    function courvali(cou){
        const schema={
             name : Joi.string().min(2).required(),
             author : Joi.string().min(2).required(),
             price : Joi.string().min(2).required(),
             tags  : Joi.array().min(2).required()
        }
        return Joi.validate(cou ,schema);
    }

    exports.Course = Course;
    exports.courvali = courvali;




    