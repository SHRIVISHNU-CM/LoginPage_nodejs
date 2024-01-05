const mongoose = require('mongoose');

const dbURL = "mongodb+srv://admin:mj8TZWhLZyt6YF2G@development.ejgwre5.mongodb.net/LoginForm?retryWrites=true&w=majority"

const mongooseConnection = ()=>{
    try{
       mongoose.connect(dbURL).then(()=>{console.log("Database Connected")})
    }catch(e){
        console.log(e.message)
    }
}

module.exports = mongooseConnection