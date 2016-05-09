var XMLPath = "../xml/larosiere.xml";
require('./datastructure')();
var graph = loadXMLDoc(XMLPath);
console.log(JSON.stringify(graph));

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
                nodes.push(new Node(result.osm.node[data].$.lon, result.osm.node[data].$.lat, 0, [], [], 'A Node'));

                if (graph.minX == null || graph.minX > result.osm.node[data].$.lon) {
                    graph.minX = result.osm.node[data].$.lon;
                }
                if (graph.minY == null || graph.minY > result.osm.node[data].$.lat) {
                    graph.minY = result.osm.node[data].$.lat;
                }
                if (graph.maxX == null || graph.maxX < result.osm.node[data].$.lon) {
                    graph.maxX = result.osm.node[data].$.lon;
                }
                if (graph.maxY == null || graph.maxY < result.osm.node[data].$.lat) {
                    graph.maxY = result.osm.node[data].$.lat;
                }
            }
        });

    } catch (ex) {
        console.log(ex)
    }
    return graph;
};