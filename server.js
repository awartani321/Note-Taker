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

// add note to json
app.post('/api/notes', function (req, res) {
    let rawdata = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(rawdata);
    data.push(req.body);

    fs.writeFileSync(JSON_PATH, JSON.stringify(data));

    res.json(req.body);
});


// delete note from json
app.delete('/api/notes/:id', function (req, res) {
    let rawdata = fs.readFileSync(JSON_PATH);
    const data = JSON.parse(rawdata);

    const idx = req.params.id - 1;
    data.splice(idx, 1);

    fs.writeFileSync(JSON_PATH, JSON.stringify(data));

    res.json(req.body);
});


// set port number
const PORT = process.env.PORT || 3000;

// start express js server
const server = app.listen(PORT);