// import mongoose module
const mongoose = require("mongoose");

const courseSchema= mongoose.Schema({
    courseName: String,
    duration: String,
    price: Number,
    description: String,
    avatar: String,
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
        
});

// create Model name "Course"
const course= mongoose.model("Course", courseSchema);

// make course exportable
module.exports= course;