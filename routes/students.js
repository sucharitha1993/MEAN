var Students = require('./../models/students.js');

module.exports = function (app) {
    //to add a Student to DB (C - CREATE)
    app.post('/addStudent', function (req, res) {
        /* Adding Student with request payload method */
        var student = new Students(req.body);
        student.save(function (err, results) {
            if (err) {
                console.log(err);
                res.send(`not able to add student ${err.errmsg}`);
            } else {
                //console.log('added student with id : ' + results._id)
                res.send(results);
            }
        });
    });

    // to load all the Students from DB (R - Read)
    app.get('/loadStudents', function (req, res) {
        // console.log('loaded Students api Working!');
        Students.find({}, function (err, result) {
            if (err) {
                res.send(`not able to fetch students ${err.errmsg}`);
            } else {
                //console.log('fetched Students : ' + result)
                res.send(result);
            }
        });
    });

    //to fetch particular student record (R - Read)
    app.get('/getStudentDetails/:id', function (req, res) {
        var id = req.params.id;
        console.log(`fetching student details with id ${id}`);
        Students.find({ id: `${id}` }, function (err, result) {
            if (err) {
                res.send(`not able to fetch student with ${id} - ${err.errmsg}`);
            } else {
                //console.log('fetched Student with id : ' + result)
                res.send(result);
            }
        });
    });

    //to update particular student record (U - Update)
    app.put('/updateStudent', function (req, res) {
        var id = req.body.id;
        Students.update({ id: id }, { $set: { name: req.body.name, standarad: req.body.standarad, fees: req.body.fees } }, function (err, result) {
            if (err) {
                console.log(err);
                res.send(`not able to update student with ${id} - ${err.errmsg}`);
            }
            res.send(result);
        });
    });

    //to delete particular student record (D - Delete)
    app.delete('/deleteStudent/:id', function (req, res) {
        var id = req.params.id;
        Students.remove({ id: id }, function (err, result) {
            if (err) res.send(`not able to delete student with ${id} - ${err.errmsg}`);
            res.send(result);
        });
    });
}