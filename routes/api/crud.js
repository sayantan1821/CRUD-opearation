const express = require("express");
const Student = require("../../models/student");
const { check, validationResult } = require("express-validator");
const { converter } = require("../../utils/converter");
const router = express.Router();

const isObjectEmpty = (objectName) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};
router.post("/load", async (req, res) => {
  console.log("get request");
  const csvData = await converter();
  try {
    const result = await Student.insertMany(csvData);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/add",
  check("studentId", "studentId is required").notEmpty(),
  check("nationality", "nationality is required").notEmpty(),
  check("gender", "gender is required").notEmpty(),
  check("placeofBirth", "placeofBirth is required").notEmpty(),
  check("stageId", "stageId is required").notEmpty(),
  check("gradeId", "gradeId is required").notEmpty(),
  check("topic", "topic is required").notEmpty(),
  check("semester", "semester is required").notEmpty(),
  check("relation", "relation is required").notEmpty(),
  check("raisedHands", "raisedHands is required").notEmpty(),
  check("visitedResource", "visitedResource is required").notEmpty(),
  check("announcementViews", "announcementViews is required").notEmpty(),
  check("discussion", "discussion is required").notEmpty(),
  check("parentAnsweringSurvey", "parentAnsweringSurvey is required").notEmpty(),
  check("parentschoolSatisfaction", "parentschoolSatisfaction is required").notEmpty(),
  check("studentAbsenceDays", "studentAbsenceDays is required").notEmpty(),
  check("studentMarks", "studentMarks is required").notEmpty(),
  check("classId", "classId is required").notEmpty(),
  check("sectionId", "sectionId is required").notEmpty(),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let student = await Student.findOne({ studentId: req.body.studentId });

      if (student) {
        return res.status(400).json({
          errors: [{ msg: "student already exists with same student ID" }],
        });
      }
      const doc = req.body;
      const result = await Student.create(doc);
      console.log(result);
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/update",
  check("studentId", "studentId is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const filter = { studentId: req.body.studentId };
      const updateDoc = {
        $set: req.body,
      };
      const result = await Student.updateOne(filter, updateDoc);
      let student = await Student.findOne({ studentId: req.body.studentId });
      if (student == null) {
        return res.status(404).json({
          errors: [{ msg: "student does not exist" }],
        });
      } else res.json(student);
      console.log(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/delete", async (req, res) => {
  if (isObjectEmpty(req.body)) {
    return res.status(404).json({
      errors: [{ msg: "No Student Found" }],
    });
  }
  try {
    const query = req.body;
    const result = await Student.deleteMany(query);
    console.log(result);
    if (result.deletedCount === 0) {
      return res.status(404).json({
        errors: [{ msg: "No Student Found" }],
      });
    } else {
      return res.json(result);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/get", async (req, res) => {
  try {
    let studentData = await Student.find();
    res.json(studentData)
  }catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})
module.exports = router;
