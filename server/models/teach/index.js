// 增加课程安排
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TeachSchema = new Schema({
    "number": { type: Number },
    "course": { type: String },
    "date": {},
    "teacher": {},
    "count": {},
})
module.exports = mongoose.model('Teach', TeachSchema);