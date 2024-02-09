const mongoose = require("mongoose");

const noteEvaluationSchema= mongoose.Schema({
    note: Number,
    evaluation: String,
    idStudent: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    idCourse: {type: mongoose.Schema.Types.ObjectId, ref: "Course"}
});

const noteEvaluation= mongoose.model("NoteEvaluation", noteEvaluationSchema);

module.exports= noteEvaluation;