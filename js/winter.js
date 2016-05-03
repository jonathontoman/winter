function Graph(nodes, edges, description) {
    this.description = description;
    this.nodes = nodes;
    this.edges = edges;
}

/*
Represents a node in the graph
*/
function Node() {
    /*
    x coordinate of the node
    */
    var x;
    /* y coordinatoe of the node */
    var y;
    /* z coordinator of the node */
    var z;
    /* edges inbound on this node */
    var inboundEdges = {};
    /* edges outbound on this node */
    var inboundEdges = {};
    /* descripton of the node */
    var description;
}

/*
Represents an edge in the graph
*/
function Edge(id, origin, terminus, weight, description) {

    /* Unique id of this edge */
    this.id = id;
    /* origin of this edge */
    this.origin = origin;
    /* terminus of this edge */
    this.terminus = terminus;
    /* The weight assigned to this edge */
    this.weight = weight;
    /* description of the edge */
    this.description = description;

}


/*
Display the graph nodes in SVG.
*/
function displayNodes(data, networkGraph) {

    var xCoords = [];
    var yCoords = [];

    for (e in data.edges) {
        networkGraph.appendChild(graphSVG.edge(data.edges[e].x1, data.edges[e].y1, data.edges[e].x2, data.edges[e].y2, data.edges[e].diff));
    }
    for (n in data.nodes) {
        networkGraph.appendChild(graphSVG.node(data.nodes[n].x, data.nodes[n].y));
        xCoords.push(data.nodes[n].x)
        yCoords.push(data.nodes[n].y)
    }

    networkGraph.setAttribute('viewBox', graphSVG.viewBox(xCoords, yCoords))
}

window.addEventListener('load', function () {
    /* load node data via ajax */
    $.ajax({
        method: 'GET',
        url: 'data/nodes.json',
        dataType: "json",
        success: function (data) {
            var networkGraph = document.getElementById('networkGraph');
            var gridLines = graphSVG.grid();
            for (gl in gridLines) {
                networkGraph.appendChild(gridLines[gl]);
            }
            displayNodes(data, networkGraph);
        },
        error: function (xhr, ajaxOptions, error) {
            console.log(ajaxOptions);
            console.log(error);
        }
    });
});