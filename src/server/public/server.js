var express = require('express');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(cors());

app.get('/products', function(request, response) {
    var fileName = path.resolve(__dirname, './data/shop.json');
    fs.readFile(fileName, 'utf8', function(err, data) {
        response.send(data);
    });

    let data = fs.readFileSync(fileName, 'utf8')
    response.send(data)
});

app.listen()