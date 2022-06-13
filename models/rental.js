const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('Joi-objectid')(Joi);

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type: String,
                required:true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            } 
        }),
        require:true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:50

            },
            DRrate:{
                type: Number,
                required:true,
                minlength:5,
                maxlength:50
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rantalFee:{
        type:Number,
        min:0
    }


})); 
function renvali(ren){
    const schema={
         customerId : Joi.objectId().required(),
         movieId : Joi.objectId().required(),
      
    }
    return Joi.validate(ren ,schema);
}
exports.Rental = Rental;
exports.renvali = renvali; 