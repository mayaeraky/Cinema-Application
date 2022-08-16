const cors = require('cors');
 
  
// Routes Imports
const user = require('./routes/UserRoutes')
const admin = require('./routes/AdminRoutes')
const publicUsers = require('./routes/publicUserRoutes')




const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token");
  res.header("Access-Control-Expose-Headers", "auth-token");
  next();
})

require("dotenv").config();


app.use(cors())
app.use('/user',user)
app.use('/Admin',admin)
app.use('/',publicUsers)


// Exporting the app.
module.exports.app = app;