const path = require('path');

var express = require('express');
var app = express();

app.use(express.json());
app.use(express.static('public'))

// set routing for html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// set port number
const PORT = process.env.PORT || 3000;

// start express js server
const server = app.listen(PORT);