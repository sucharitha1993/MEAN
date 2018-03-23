const express = require('express');
const routes = express.Router();
routes.get('/getFaculty', function (req, res) {
    res.send('faculty api works!');
    console.log('faculty api works!');
});
module.exports = routes;