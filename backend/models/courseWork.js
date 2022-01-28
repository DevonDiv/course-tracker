const mongoose = require('mongoose');

const courseWorkSchema = mongoose.Schema({
  course: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('CourseWork', courseWorkSchema);
