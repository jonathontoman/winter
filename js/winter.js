/*
Display the graph nodes in SVG.
*/
function displayNodes(data) {
    // create new html elements 
    var networkGraph = document.getElementById('networkGraph');

    for (e in data.edges) {
        networkGraph.appendChild(graphSVG.edge(data.edges[e].x1, data.edges[e].y1, data.edges[e].x2, data.edges[e].y2, data.edges[e].diff));
    }
    for (n in data.nodes) {
        networkGraph.appendChild(graphSVG.node(data.nodes[n].x, data.nodes[n].y));
    }
}

window.addEventListener('load', function () {
    /* load node data via ajax */
    $.ajax({
        method: 'GET',
        url: 'data/nodes.json',
        dataType: "json",
        success: function (data) {
            displayNodes(data);
        },
        error: function (xhr, ajaxOptions, error) {
            console.log(ajaxOptions);
            console.log(error);
        }
    });
});