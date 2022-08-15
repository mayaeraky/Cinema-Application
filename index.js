// const express = require('express');
// const bodyParser = require('body-parser');

// // create express app
// const app = express();

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse requests of content-type - application/json
// app.use(bodyParser.json())

// // define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "hi"});
// });


// // listen for requests
// var listener = app.listen(3000, function(){
//     console.log('Listening on port ' + listener.address().port); //Listening on port 8888
// });



// For environmental variables.
require('dotenv').config();


// For database instance.
const mongoose = require('mongoose');

// For app singleton instance.
const {app} = require('./app.js');

//Database connection parameters.
const databaseParameters = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.DB_URL, databaseParameters)
.then(console.log('Successfully Connected to The Database'));


app.get('/trialEndpoint', async (req, res) => {
    const value = 12;
    return res.status(200).json({value});
});


 var listener = app.listen(process.env.PORT, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
