// import mongoose module
const mongoose = require("mongoose");

const courseEnrollmentSchema = mongoose.Schema({
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course"}
});


// create Model name "User"
const courseEnrollment= mongoose.model("CourseEnrollment", courseEnrollmentSchema);

// make user exportable
module.exports= courseEnrollment;