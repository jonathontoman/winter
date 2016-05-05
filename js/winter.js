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
        url: 'data/larosiere.json',
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