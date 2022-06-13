const startDeb = require("debug")("app:startup");

function log(res, req , next){
    startDeb("logging ....");
     next();
    
    }
    module.exports = log;