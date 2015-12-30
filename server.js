'use strict';

const express = require('express');
const fs = require('fs');
const port = 8000;
const mustache = require('mustache')

const apporigin = process.env.DASHBOARD_ABTEST_APP_ORIGIN;

const app = express();

function loadHeader () {
    return new Promise(function (resolve, rej) {
        fs.readFile(`${__dirname}/src/partial/_header.html`, function (err, contents) {
            resolve(contents.toString());
        })
    });
};

function loadFooter () {
    return new Promise(function (resolve, rej) {
        fs.readFile(`${__dirname}/src/partial/_footer.html`, function (err, contents) {
            resolve(contents.toString());
        })
    });
};

function loadDocument (path) {
    return loadHeader()
        .then(function (header) {

            return loadFooter()
                .then(function (footer) {
                    return new Promise(function (res, rej) {
                        fs.readFile(path, function (err, contents) {
                            var html = mustache.render(contents.toString(), {
                                apporigin: apporigin,
                                header: header,
                                footer: footer
                            });
                            res(html);
                        })
                    });
                });
        });
}

function renderDocument (path, res) {
    loadDocument(path).then(function (contents) {
        res.write(contents);
        res.end();
    });
}

app.get('/', function (req, res) {
    renderDocument(`${__dirname}/src/html/index.html`, res);
});

app.get('/login', function (req, res) {
    renderDocument(`${__dirname}/src/html/login.html`, res);
});

app.get('/register', function (req, res) {
    renderDocument(`${__dirname}/src/html/register.html`, res);
});

app.get('/pricing', function (req, res) {
    renderDocument(`${__dirname}/src/html/pricing.html`, res);
});

app.get('/documentation', function (req, res) {
    renderDocument(`${__dirname}/src/html/documentation.html`, res);
});

app.get('/_', function (req, res) {
    fs.readFile(`${__dirname}/src/html/app.html`, function (err, contents) {
        res.write(contents.toString());
        res.end();
    })
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/styles', express.static(__dirname + '/src/css'));


app.listen(port);
console.log(`App running on port ${port}`);
