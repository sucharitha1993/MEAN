var mongoose = require('mongoose');

var FacultySchema = new mongoose.Schema({
    id: { type: Number, required: true, index: { unique: true } },
    name: { type: String, required: true },
    teaching_standarad: { type: String, required: true },
    subjects: { type: String, required: true },
    salary: { type: String, required: true },
    date_of_joining: { type: Date, required: true },
    img: { type: Array}
})

module.exports = mongoose.model('Faculty', FacultySchema);