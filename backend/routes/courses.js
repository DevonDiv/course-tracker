const express = require("express");

const Course = require("../models/course");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const course = new Course({
    courseName: req.body.courseName,
    profName: req.body.profName,
    profEmail: req.body.profEmail ? req.body.profEmail : 'N/A',
    creator: req.userData.userId
  });
  course.save().then(createdCourse => {
    res.status(201).json({
      message: 'Course added successfully',
      courseId: createdCourse._id
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Adding a Course Failed!"
    })
  });
});

router.get("", checkAuth, (req, res, next) => {
  Course.find({ creator: req.userData.userId })
  .then(documents => {
    res.status(200).json({
      message: "Courses fetched successfully!",
      courses: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Courses Failed!"
    });
  });
});

router.patch("/:id", checkAuth, (req, res, next) => {
  const course = new Course({
    _id: req.body.id,
    courseName: req.body.courseName,
    profName: req.body.profName,
    profEmail: req.body.profEmail,
    creator: req.userData.userId
  });
  Course.updateOne({ _id: req.params.id }, course)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  })
  .catch(error => {
    res.status(500).json({
      message: "Update Failed!"
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Course.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "Course deleted!" });
  })
  .catch(error => {
    res.status(500).json({
      message: "Deleting Course Failed!"
    });
  });
});

module.exports = router;
