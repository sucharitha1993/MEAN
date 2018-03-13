//including mongoose 
var mongoose = require('mongoose');

//including express 
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

/*This is to set the http headers*/
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname + '/dist')));
app.use(cors());
//opening a connection
mongoose.connect('mongodb://sucharitha:charitha1993@ds225608.mlab.com:25608/mock-students');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error:'));
db.once('open', function () {
    // we're connected!
});
require('./routes/students.js')(app);

app.get('/', function (req, res) {
    console.log('Express Working!');
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '9000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
console.log('Server File Executed Successfully');