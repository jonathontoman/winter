window.addEventListener('load', function () {
    /* load node data via ajax */
    $.ajax({
        method: 'GET',
        url: 'data/nodes.json',
        dataType: "json",
        success: function (data) {
            displayNodes(data);

            $('#body').append('<h2>adasdasdasdsa<h2/>')
        },
        error: function (xhr, ajaxOptions, error) {
            console.log(ajaxOptions);
            console.log(error);
        }
    });
});

function displayNodes(data) {

    var nodes = data.nodes;
    console.log(nodes);
    var length = nodes.length;

    // create new html elements 
    for (var i = 0; i < length; i++) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', nodes[i].x + '0%');
        circle.setAttribute('cy', nodes[i].y+ '0%');
        circle.setAttribute('class', 'node');
        document.getElementById('networkGraph').appendChild(circle);
        console.log(nodes[i].x + "," + nodes[i].y);
    }

}