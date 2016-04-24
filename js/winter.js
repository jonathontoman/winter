/*
Namespace for project winter
*/
var winterNS = {
    SVG: 'http://www.w3.org/2000/svg',
    HTML: 'http://www.w3.org/1999/xhtml'
};

/*
Build an element
*/
function element(tag, namespace, attribs, innerHTML) {

    var element;
    if (namespace === undefined) {
        tag = winterNS.HTML;
    }
    if (attribs === undefined) {
        attribs = [];
    }
    if (innerHTML === undefined) {
        innerHTML = null;
    }

    element = document.createElementNS(namespace, tag);
    for (attrib in attribs) {
        element.setAttribute(attribs[attrib].key, attribs[attrib].value);
    }
    element.innerHTML = innerHTML;
    return element;
}

/*
 Build a graph edge
 */
function edge(x1, y1, x2, y2, diff) {
    return element('line', winterNS.SVG, [{
            'key': 'x1',
            'value': x1 + '0%'
    }, {
            'key': 'y1',
            'value': y1 + '0%'
    }, {
            'key': 'x2',
            'value': x2 + '0%'
    }, {
            'key': 'y2',
            'value': y2 + '0%'
    }, {
            'key': 'class',
            'value': 'edge'
    },
        {
            'key': 'data-difficulty',
            'value': diff
        }])
}

/*
 Build a graph node.
*/
function node(x, y) {
    return element('circle', winterNS.SVG, [{
        key: 'cx',
        value: x + '0%'
        }, {
        key: 'cy',
        value: y + '0%'
        }, {
        key: 'class',
        value: 'node'
        }])
}

/*
Display the graph nodes in SVG.
*/
function displayNodes(data) {
    // create new html elements 
    var networkGraph = document.getElementById('networkGraph');

    for (e in data.edges) {
        networkGraph.appendChild(edge(data.edges[e].x1, data.edges[e].y1, data.edges[e].x2, data.edges[e].y2, data.edges[e].diff));
    }
    for (n in data.nodes) {
        networkGraph.appendChild(node(data.nodes[n].x, data.nodes[n].y));
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