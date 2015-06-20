var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


var placeSchema = mongoose.Schema({
    username: {type: String, index: true},
    state: {type: String}, //['free', 'busy', 'just_reserved']
    lastUpdated: { type: Date, default: Date.now },
    location: {
      type: { type: String },
      coordinates: { type: [Number], index: '2dsphere' } //longitude first
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Place', placeSchema);