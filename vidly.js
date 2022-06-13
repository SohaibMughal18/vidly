require('express-async-errors');
const error =require('./middleware/error');
const mongoose = require('mongoose');
const startDeb = require("debug")("app:startup");
const dbDeb = require("debug")("app:db");
const config = require("config");
const morgan = require('morgan');
const helmet =require('helmet');
const Joi = require('joi');
 Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app  = express();
const genres= require("./routes/genres.js");
const customers= require("./routes/customers.js");
const courses= require("./routes/courses.js");
const movies = require("./routes/movies.js");
const rentals = require("./routes/rentals.js");
const home = require("./routes/home.js");
const users = require("./routes/users.js");
const auth = require('./routes/auth');
 

const logger = require('./middleware/logger.js');
const auths = require("./middleware/auth.js");


mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connected to MongoDB'))
.catch(err => console.error("Could not connect", err));

 

app.use(express.urlencoded({extended:true}));
app.use(express.static('Public'));
app.use(express.json());   
app.use("/api/genres" , genres); 
app.use("/",home);
app.use("/api/courses" ,courses);
app.use("/api/customers" , customers);
app.use("/api/movies" , movies);
app.use("/api/rentals" , rentals);
app.use("/api/users" , users);
app.use("/api/auth", auth);    

app.use(error);

app.set("view engine", 'pug');
app.set("views","./view");

app.use(logger); 

//configuration

if(!config.get('jwtPrivateKey')) {
    startDeb('FATAL ERROR :jwtPrivateKey is not defined.');
process.exit(1);
}

startDeb(`Application name: ${config.get("name")}`);
if (app.get('env') !== "dev" ){
 startDeb(`Mail Server: ${config.get("mail.host")}`);
}
startDeb(`Mail password: ${process.env.vidly_password}`);
startDeb(`Mail password: ${config.get("mail.password")}`);


if (app.get('env') === "prod"){
    app.use(morgan('tiny')); 
    startDeb("Morgan Enabled....");
}
//DB work 
dbDeb("Connected to database");

const port = process.env.Port || 3000;
app.listen(port, ()=> console.log(`listening on port :${port}`));