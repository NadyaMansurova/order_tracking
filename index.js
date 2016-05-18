var express = require('express');
var app = express(),
    cors = require('cors');
var parseOrdersQuery = require('./parseOrdersQuery');

app.use(cors());
app.use('/frontend/prod', express.static('frontend/prod'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/frontend/prod/index.html');
});

app.get('/backend/orders/', function(req, res) {
    var data = parseOrdersQuery.parseQuery(req, 'GET');
    res.json(data);
});


app.delete('/backend/orders/', function(req, res) {
    var data = parseOrdersQuery.parseQuery(req, 'DELETE');
    res.send(data);
});

var server = app.listen(3000, function () {

});