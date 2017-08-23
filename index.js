const express = require('express'); // REQUIRING THE EXPRESS FRAMEWORK
const app = express(); // INITIALIZING THE EXPRESS FRAMEWORK
const router = express.Router(); // INITIALIZING THE EXPRESS SERVER

const mongoose = require('mongoose'); //REQUIRING mongoose FOR mongodb
const config = require('./config/database'); // REQUIRING THE CONFIG FILE WHERE THE DATABASE CONFIGURATION IS IN
const path = require('path');
const authentication = require('./routes/authentication')(router); // REQUIRING PATH TO PASS THE AUTHENTICATION OF USERNAME

const blog = require('./routes/ablog')(router);


//EMAIL AND PASSWORD AND PASSING IN THE ROUTER VALUE
const bodyParser = require('body-parser'); // BODY PARSER USED TO COLLECT USER INPUTS
const cors = require('cors');
const port = process.env.PORT || 8080; // Allows heroku to set port
// connecting to mongodb which is being exported from the database.js file
mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err) => {
  if (err) {
      console.log("Could not connect to database");
  }else {
    console.log("Connected to " +config.db+ " database" );
  }
});

//MIDDLEWARES
app.use(cors({
  origin : 'http://localhost:4200'
}))

app.use(bodyParser.urlencoded({ extended:false }));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); // USED TO SERVE STATIC FILES
app.use('/authentication', authentication);
app.use('/ablog', blog );

// end of MIDDLEWARES

// ROUTES
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// LISTENING TO PORT FOR THE SERVER TO RUN LOCALLY
app.listen(port, () => {
  console.log("Server is running on " +port);
});
