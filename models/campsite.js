const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const campsiteSchema = new Schema({
    name: {
        type: String, 
        requires: true, 
        unique: true
    }, 
    description: {
        type: String, 
        requires: true
    }
}, {
    timestamps: true, 
});

const Campsite = mongoose.model('Campsite', campsiteSchema); 

module.exports = Campsite;