'use strict';

const rx = require('rx');
const express = require('express');
const fs = require('fs');
const port = 8000;
const mustache = require('mustache');
const request = require('request');
const queryLoadPartial = require('./src/js/queries/file/loadPartial');
const _ = require('lodash');

const apporigin = process.env.DASHBOARD_ABTEST_APP_ORIGIN;

const registerController = require('./src/js/controller/register');
const appController = require('./src/js/controller/app');
const homeController = require('./src/js/controller/home');
const loginController = require('./src/js/controller/login');

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

function loadHead () {
    return new Promise(function (resolve, rej) {
        fs.readFile(`${__dirname}/src/partial/_head.html`, function (err, contents) {
            resolve(contents.toString());
        })
    });
}

function loadDocument (path) {
    return loadHeader()
        .then(function (header) {

            return loadFooter()
                .then(function (footer) {
                    return loadHead()
                        .then(function (head) {
                            return new Promise(function (res, rej) {
                                fs.readFile(path, function (err, contents) {
                                    var html = mustache.render(contents.toString(), {
                                        apporigin: apporigin,
                                        header: header,
                                        footer: footer,
                                        head: head
                                    });
                                    res(html);
                                })
                            });
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

function loadContents (controllerStream) {
    return controllerStream.flatMapLatest((props) => {
            const layoutStream = queryLoadPartial('layout/default.html');
            const headerStream = queryLoadPartial('_header.html');
            const headStream = queryLoadPartial('_head.html');
            const footerStream = queryLoadPartial('_footer.html');
            const bodyStream = queryLoadPartial('_body.html');

            return rx.Observable.combineLatest(
                    layoutStream,
                    headerStream,
                    headStream,
                    footerStream,
                    bodyStream,
                    function (layout, site_header, head, footer, body) {
                        return mustache.render(layout, {
                            head: mustache.render(head, props.header),
                            footer: mustache.render(footer, props.footer),
                            body: mustache.render(body, _.extend(props.body, {
                                site_header: mustache.render(site_header, props.site_header)
                            }))
                        });
                    }
                );
        })
}

app.get('/login', function (req, res) {
    loadContents(
        loginController(req, res)
    ).subscribe((contents) => {
        res.write(contents);
        res.end();
    });
});

app.get('/', function (req, res) {
    loadContents(
        homeController(req, res)
    ).subscribe((contents) => {
        res.write(contents);
        res.end();
    });
});

app.get('/register', function (req, res) {
    loadContents(
        registerController(req, res)
    ).subscribe((contents) => {
        res.write(contents);
        res.end();
    });
});

app.get('/documentation', function (req, res) {
    renderDocument(`${__dirname}/src/html/documentation.html`, res);
});

app.get('/_', function (req, res) {
    loadContents(
        appController(req, res)
    ).subscribe((contents) => {
        res.write(contents);
        res.end();
    });
});

app.use('/public', express.static(__dirname + '/public'));
app.use('/styles', express.static(__dirname + '/src/css'));


app.listen(port);
console.log(`App running on port ${port}`);
