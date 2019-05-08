const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ExamSchema = new Schema({
    "time": {},
    "course": {},
    "open": { type: Boolean },
    "place": {},
})

// 考试安排模型


module.exports = mongoose.model('exam', ExamSchema);