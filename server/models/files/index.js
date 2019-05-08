const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FileSchema = new Schema({
    "racial": {},
    "origin": {},
    "address": {},
    "name": {},

})

// 档案模型


module.exports = mongoose.model('file', FileSchema);