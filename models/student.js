const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    studentId : {
        type : String,
        required : true,
        unique: true
    },
    gender : {
        type : String,
        required : true
    },
    nationality : {
        type : String,
        required : true
    },
    placeofBirth : {
        type : String,
        required : true
    },
    stageId : {
        type : String,
        required : true
    },
    gradeId : {
        type : String,
        required : true
    },
    sectionId : {
        type : String,
        required : true
    },
    topic : {
        type : String,
        required : true
    },
    semester : {
        type : String,
        required : true
    },
    relation : {
        type : String,
        required : true
    },
    raisedHands : {
        type : String,
        required : true
    },
    visitedResource : {
        type : String,
        required : true
    },
    announcementViews : {
        type : String,
        required : true
    },
    discussion : {
        type : String,
        required : true
    },
    parentAnsweringSurvey : {
        type : String,
        required : true
    },
    parentschoolSatisfaction : {
        type : String,
        required : true
    },
    studentAbsenceDays : {
        type : String,
        required : true
    },
    studentMarks : {
        type : String,
        required : true
    },
    classId : {
        type : String,
        required : true
    },
})
module.exports = mongoose.model('student', StudentSchema);