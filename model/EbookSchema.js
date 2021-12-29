const mongoose = require('mongoose');

var Ebooks = mongoose.Schema({
    
    name: { type: String },
    author: { type: String },
    page: { type: Number },
    ratings: { type: Number },
    volume: { type: Number },
    ISBN: { type: Number },
    price: { type: Number }
});

module.exports = mongoose.model('ebooks',Ebooks)