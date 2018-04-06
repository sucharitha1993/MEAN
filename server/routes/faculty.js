var Faculty = require('./../models/faculty.js');
const express = require('express');
const routes = express.Router();

//to add a Faculty to DB (C - CREATE)
routes.post('/addFaculty', function (req, res) {
    /* Adding Faculty with request payload method */
    var faculty = new Faculty(req.body);
    faculty.save(function (err, results) {
        if (err) {
            console.log(err);
            res.send(`not able to add faculty ${err.errmsg}`);
        } else {
            //console.log('added faculty with id : ' + results._id)
            res.send(results);
        }
    });
});

// to load Faculty from DB (R - Read)
routes.get('/getFaculty', function (req, res) {
    // console.log('loaded Faculty api Working!');
    Faculty.find({}, function (err, result) {
        if (err) {
            res.send(`not able to fetch Faculty ${err.errmsg}`);
        } else {
            //console.log('fetched Faculty : ' + result)
            res.send(result);
        }
    });
});

//to fetch particular faculty record (R - Read)
routes.get('/getFacultyDetails/:id', function (req, res) {
    var id = req.params.id;
    console.log(`fetching faculty details with id ${id}`);
    Faculty.find({ id: `${id}` }, function (err, result) {
        if (err) {
            res.send(`not able to fetch faculty with ${id} - ${err.errmsg}`);
        } else {
            //console.log('fetched Faculty with id : ' + result)
            res.send(result);
        }
    });
});

//to update particular faculty record (U - Update)
routes.put('/updateFaculty', function (req, res) {
    var id = req.body.id;
    Faculty.update({ id: id }, { $set: { name: req.body.name, teaching_standarad: req.body.teaching_standarad, subjects: req.body.subjects, salary: req.body.salary, date_of_joining: req.body.date_of_joining, img: req.body.img } }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(`not able to update faculty with ${id} - ${err.errmsg}`);
        }
        res.send(result);
    });
});

//to delete particular faculty record (D - Delete)
routes.delete('/deleteFaculty/:id', function (req, res) {
    var id = req.params.id;
    Faculty.remove({ id: id }, function (err, result) {
        if (err) res.send(`not able to delete faculty with ${id} - ${err.errmsg}`);
        res.send(result);
    });
});

module.exports = routes;