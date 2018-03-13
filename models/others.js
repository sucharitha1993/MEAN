var mongoose = require('mongoose');

var OtherSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: String, required: true },
    description: { type: String, required: true }
})
module.exports = mongoose.model('Others', OtherSchema);