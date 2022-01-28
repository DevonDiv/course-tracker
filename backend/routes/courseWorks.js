const express = require("express");

const CourseWork = require("../models/courseWork");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const courseWork = new CourseWork({
    course: req.body.course,
    name: req.body.name,
    type: req.body.type,
    date: req.body.date,
    time: req.body.time,
    creator: req.userData.userId
  });
  courseWork.save().then(createdCourseWork => {
    res.status(201).json({
      message: 'Course Work added successfully',
      courseWorkId: createdCourseWork._id
    });
  });
});

router.get("", checkAuth, (req, res, next) => {
  CourseWork.find({ creator: req.userData.userId })
  .then(documents => {
    res.status(200).json({
      message: "Course Work fetched successfully!",
      courseWork: documents
    });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  CourseWork.findById(req.params.id).then(courseWork => {
    if (courseWork) {
      res.status(200).json(courseWork);
    } else {
      res.status(404).json({ message: "Course Work not found!" });
    }
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  const courseWork = new CourseWork({
    _id: req.body.id,
    course: req.body.course,
    name: req.body.name,
    type: req.body.type,
    date: req.body.date,
    time: req.body.time,
    creator: req.userData.userId
  });
  CourseWork.updateOne({ _id: req.params.id }, courseWork)
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  })
});

router.delete("/:id", checkAuth, (req, res, next) => {
  CourseWork.deleteMany({ _id: { $in: req.params.id  } })
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "Course Work deleted!" });
  });
});

module.exports = router;
