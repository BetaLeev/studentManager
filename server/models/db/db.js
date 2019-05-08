const mongoose = require('mongoose');
const host = 'mongodb://127.0.0.1/'
const dbname = 'studentDb'
let db = mongoose.connect(host + dbname, {
    useCreateIndex: true,
    useNewUrlParser: true
})
const con = mongoose.connection;
con.on('error', console.error.bind(console, 'error'));
con.once('open', function() {
    console.log('db ok!');
});
module.exports = db;