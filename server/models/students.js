var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: { type: String, required: true },
    standarad: { type: Number, required: true },
    fees: { type: Number, required: true },
    date_of_joining: { type: Date, required: true },
    img: { type: Array}
});

module.exports = mongoose.model('Students', StudentSchema);