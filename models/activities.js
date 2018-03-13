var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: { type: String, required: true },
    description: { type: String, required: true },
    spentAmount: { type: String, required: true },
    startDate: { type: Number, required: true, },
    endDate: { type: Number, required: true, }
})
module.exports = mongoose.model('Activities', ActivitySchema);