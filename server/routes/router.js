
var students = require('./students.js');
var faculty = require('./faculty.js');
module.exports = function (app) {
    app.use('/api/students', students);
    app.use('/api/faculty', faculty);
}
