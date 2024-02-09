// import mongoose module
const mongoose = require("mongoose");
// import mongoose unique validator
const uniqueValidator= require ("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    address: String,
    speciality: String,
    profession: String,
    childTel: Number,
    tel: { type: Number, unique: true },
    password: String,
    avatar: String,
    cvPdf: String,
    role: String,
    status: String
    
});

// userSchema va utilisé le plagin uniqueValidator
userSchema.plugin(uniqueValidator);

// create Model name "User"
const user= mongoose.model("User", userSchema);

// make user exportable
module.exports= user;