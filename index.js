// For environmental variables.
require('dotenv').config();


// For database instance.
const mongoose = require('mongoose');

// For app singleton instance.
const {app} = require('./app.js');

//Database connection parameters.
const databaseParameters = { useNewUrlParser: true, useUnifiedTopology: true };
var conn = mongoose.connect(process.env.DB_URL, databaseParameters)
.then(console.log('Successfully Connected to The Database'));


app.get('/trialEndpoint', async (req, res) => {
    const value = 12;
    return res.status(200).json({value});
});


 var listener = app.listen(process.env.PORT, function(){
    console.log('Listening on port ' + listener.address().port); 
});





