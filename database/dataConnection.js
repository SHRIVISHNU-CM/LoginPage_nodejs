const mongoose = require('mongoose');

const dbURL = process.env.DBURL

const mongooseConnection = ()=>{
    try{
       mongoose.connect(dbURL).then(()=>{console.log("Database Connected")})
    }catch(e){
        console.log(e.message)
    }
}

module.exports = mongooseConnection