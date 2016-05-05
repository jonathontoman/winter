var XMLPath = "../xml/larosiere.xml";
require('./datastructure')();
console.log(JSON.stringify(loadXMLDoc(XMLPath)));

/*
Load XML Doc and produce objects representing the network graph.
*/
function loadXMLDoc(filePath) {
    var fs = require('fs');
    var xml2js = require('xml2js');

    var nodes = [];
    var edges = [];
    var graph = new Graph(nodes, edges, 'The La Rosiere Piste Area');


    try {
        var fileData = fs.readFileSync(filePath, 'ascii');
        var parser = new xml2js.Parser();

        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {

            for (data in result.osm.node) {
                nodes.push(new Node(result.osm.node[data].$.lat, result.osm.node[data].$.lon, 0, [], [], 'A Node'));
            }
        });

    } catch (ex) {
        console.log(ex)
    }
    return graph;
};