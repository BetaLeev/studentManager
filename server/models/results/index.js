const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 成绩模型
const ResultSchema = new Schema({
    "number": {},
    "name": {},
    "sex": {},
    "term": {},
    "clas": {},
    "c": { type: Number },
    "java": { type: Number },
    "struct": { type: Number },
    "pc": { type: Number },
    "test": { type: Number },
    "math1": { type: Number },
    "math2": { type: Number },
    "tag": {}
})

module.exports = mongoose.model('Result', ResultSchema);