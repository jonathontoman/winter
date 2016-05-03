/*
Start building a basic RESTful HTTP server using Express
*/
var XMLPath = "../xml/larosiere.xml";
var express = require('express');
var app = express();

function loadXMLDoc(filePath) {
    var fs = require('fs');
    var xml2js = require('xml2js');
    var json;
    try {
        var fileData = fs.readFileSync(filePath, 'ascii');
        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result.osm
        });
        return json;
    } catch (ex) {
        console.log(ex)
    }
    return json;
};

/*
The route of our API 
*/
app.get('/api', function (req, res) {
    res.send('REST API for Project Winter. Returns JSON data for Ski Areas');
});

/*
The area lists 
*/
app.get('/api/area', function (req, res) {
    console.log('Received request for all areas')
    res.send('[{"id":"1", "description": "graph1"},{"id":"1", "description": "graph1"}]');
});

/*
The data for a specific aea
*/
app.get('/api/area/:id', function (req, res) {
    console.log('Received request for area with id: ' + req.params.id)
    res.send(loadXMLDoc(XMLPath));
});


app.listen(3001);
console.log('Listening on port 3001...');