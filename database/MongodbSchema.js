const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter user name"]
    },
    password:{
        type:String,
        required:[true,'Please enter your Password']
    },
    email:{
        type:String,
        required:[true,"Please Enter Email "]
    }
})

module.exports = mongoose.model('UserData',dataSchema)