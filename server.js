var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// logging
app.use(morgan('dev'));

// database
mongoose.connect(config.database);

// static files
app.use(express.static(__dirname + '/public'));


// ROUTES
//===========================
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


// frontend
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/app/views/index.html'));
});


//server
app.listen(config.port);
console.log('app runing on port ' + config.port);