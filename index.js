const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "hi"});
});


// listen for requests
var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});