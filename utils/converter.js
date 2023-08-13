const fs = require("fs");
const csvToJson = require('csvtojson');
// const { parse } = require("csv-parse");
const converter = async () => {
    const array = await csvToJson({headers: ["studentId", "gender", "nationality", "placeofBirth", "stageId", "gradeId", "sectionId", "topic", "semester", "relation", "raisedHands", "visitedResource", "announcementViews", "discussion", "parentAnsweringSurvey", "parentschoolSatisfaction", "studentAbsenceDays", "studentMarks", "classId"]}).fromFile("Student-original.csv");
    return array;
};
module.exports = { converter };
