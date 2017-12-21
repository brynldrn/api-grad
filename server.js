var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000
    mongoose = require('mongoose'),
    Student = require('./api/models/studentModel'),
    User = require('./api/models/UserModel'),
    bodyParser = require('body-parser');

// Mongoose Instance
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gradingdb', {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    if (req.method === "OPTIONS")
        res.sendStatus(200);
    else
        next();
});

var studentRoutes = require('./api/routes/studentRoutes');
var userRoutes = require('./api/routes/userRoutes');

studentRoutes(app);
userRoutes(app);

app.use(function (request, response, next) {
    response.status(404).send({ url: request.originalUrl + ' not found.' });
});



app.listen(port);

console.log('Running Grading Sytem API on port ' + port);