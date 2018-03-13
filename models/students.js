var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: { type: String, required: true },
    standarad: { type: Number, required: true },
    fees: { type: Number, required: true }
});

module.exports = mongoose.model('Students', StudentSchema);