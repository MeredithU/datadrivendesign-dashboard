'use strict';

const express = require('express');
const fs = require('fs');
const port = 8888;


const app = express();

app.get('/', function (req, res) {
    fs.readFile(`${__dirname}/src/html/index.html`, function (err, contents) {
        res.write(contents.toString());
        res.end();
    })
});

app.get('/app', function (req, res) {
    fs.readFile(`${__dirname}/src/html/app.html`, function (err, contents) {
        res.write(contents.toString());
        res.end();
    })
});

app.use('/public', express.static(__dirname + '/public'));


app.listen(port);
console.log(`App running on port ${port}`);