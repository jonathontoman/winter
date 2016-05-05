/*
Start building a basic RESTful HTTP server using Express
*/
var express = require('express');
var app = express();

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