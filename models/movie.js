const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');
const {genreSchema} = require("./genre")

const moviesSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
      trim:true,
      minlength:2,
      maxlength:50
  },
  genre:{
      type:genreSchema,
      required:true
  },
  RIstock:{
      type:Number,
      required:true,
      min:0,
      max:255
  },
  DRrate:{
      type:Number,
      required:true,
      min:0,
      max:255
  },

    });
    const Movie = mongoose.model("Movie" , moviesSchema);
    
    function movvali(mov){
        const schema={
             title : Joi.string().min(5).required(),
             genreId : Joi.objectId().required(),
             RIstock : Joi.number().min(0).required(),
             DRrate  : Joi.number().min(0).required()
        }
        return Joi.validate(mov ,schema);
    }

    exports.Movie = Movie;
    exports.movvali = movvali; 