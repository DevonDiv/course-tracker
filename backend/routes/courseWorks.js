const express = require("express");

const CourseWork = require("../models/courseWork");
const checkAuth = require("../middleware/check-auth");
const courseWork = require("../models/courseWork");

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
  })
  .catch(error => {
    res.status(500).json({
      message: "Adding Course Work Failed!"
    })
  });
});

router.get("", checkAuth, (req, res, next) => {
  CourseWork.find({ creator: req.userData.userId })
  .then(documents => {
    res.status(200).json({
      message: "Course Work fetched successfully!",
      courseWork: documents
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching Course Work Failed!"
    });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  CourseWork.findById(req.params.id).then(courseWork => {
    if (courseWork) {
      console.log(courseWork);
      res.status(200).json(courseWork);
    } else {
      res.status(404).json({ message: "Course Work not found!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: `Fetching ${courseWork.name} Failed!`
    });
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
  .catch(error => {
    res.status(500).json({
      message: "Update Failed!"
    });
  })
});

router.delete("/:id", checkAuth, (req, res, next) => {
  CourseWork.deleteMany({ _id: { $in: req.params.id  } })
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "Course Work deleted!" });
  })
  .catch(error => {
    res.status(500).json({
      message: "Deleting Course Work Failed!"
    });
  });
});

module.exports = router;
