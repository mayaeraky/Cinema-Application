const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;
//const CounterModel = require('./CounterModel.js');


const User = mongoose.Schema({
    // Personal Information.
    name: {type: String, required: true}, // Noone can change that.
    type: {type: String, enum: ['Admin', 'Moderator'], required: true},
    salary: {type: Number, default: 0}, // only admins can change that.
    email: {type: String, unique: true, required: true},
    gender: {type: String, enum: ['Male', 'Female']},
    

    // login information
    username: {type: String, required: true, unique: true}, // No staff can change that.
    password: {type: String, required: true},
},);

module.exports = mongoose.model('User', User);