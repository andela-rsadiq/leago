// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
//mongoose.connect('mongodb://localhost/league-dev');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// configuration ===========================================
    
// config files
var db = require('./app/config/db');

// connect to our mongoDB database 
mongoose.connect(db.url); 

// set our port
var port = process.env.PORT || 8080; 

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

//enabling cors requests
app.use(cors());

// routes ==================================================
app.ExpressRouter = express.Router();
app.use('/', app.ExpressRouter);

// configure our routes
require('./app/routes/playerRoute')(app);
require('./app/routes/teamRoute')(app);
require('./app/routes/gamesRoute')(app);
require('./app/routes/leagueRoute')(app);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;