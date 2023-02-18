
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    pass:{type:String},
    age:{type:Number}

})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}