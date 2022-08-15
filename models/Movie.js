const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;
const CounterModel = require('./CounterModel.js');
const user = require('./User');


const Movie = mongoose.Schema({

    name: {type: String, required: true, unique: true}, 
    id: {type: Number, required: true},
    showtimes: [{type: Date}],
    duration_in_minutes: {type: Number, required: true},
    pictures:[{type: Image, required: true}],
    desciption: {type: String},
    addedby: {type: ObjectID, ref: 'user', required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model('Movie', Movie);