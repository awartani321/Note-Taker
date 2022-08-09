
var express = require('express');
var app = express();

app.use(express.json());
app.use(express.static('public'))

// set port number
const PORT = process.env.PORT || 3000;

// start express js server
const server = app.listen(PORT);