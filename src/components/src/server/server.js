var express = require('express');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(cors());

app.get('/products', function(request, response) {
    var fileName = path.resolve(__dirname, './data/shop.json');
    response.sendFile(fileName, {})
});

app.get('/dtitles', function(request, response) {
    var fileName = path.resolve(__dirname, './data/dashTitles.json');
    response.sendFile(fileName, {})
});

app.listen(3001)