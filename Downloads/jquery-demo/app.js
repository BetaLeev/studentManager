var express = require('express'),
    path = require('path');
    

var app = express();
var http = require('http').Server(app);
var virtualPath = process.env.virtualPath || "";
app.use(virtualPath, express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;
var server = http.listen(port);


module.exports = app;