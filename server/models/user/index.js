const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    "email": { type: String, index: { unique: true } },
    "name": {},
    "password": {},
    "createTime": {}
})
module.exports = mongoose.model('user', UserSchema);