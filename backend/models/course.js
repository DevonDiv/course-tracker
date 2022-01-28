const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  courseName: { type: String, required: true },
  profName : { type: String, required: true },
  profEmail : { type: String, required: false },
  creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Course', courseSchema);
