const path = require('path');
const fs = require('fs');

const JSON_PATH = "./db/db.json";

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

// api for getting note list
app.get('/api/notes', function (req, res) {
    let rawdata = fs.readFileSync(JSON_PATH);
    let data = JSON.parse(rawdata);
    data = data.map((row, idx) => {
        row.id = idx + 1;
        return row;
    })

    res.json(data);
});

// set port number
const PORT = process.env.PORT || 3000;

// start express js server
const server = app.listen(PORT);