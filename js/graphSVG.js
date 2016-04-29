/*
Graph SVG is a module to assit in creating SVG elements used to draw two dimensional network graphs.
*/
var graphSVG = (function (configuration) {

    var constants = {
        svgNamespace: 'http://www.w3.org/2000/svg',
        svgLine: 'line',
        svgCircle: 'circle',
        gridLineClass: 'grid-line'
    };


    if (configuration === undefined) {
        var configuration = {
            gridInterval: 10
        };
    }

    /*
    Builds elements
    */
    var element = function (tag, attribs, innerHTML) {

        var e;
        if (attribs === undefined) {
            attribs = [];
        }
        if (innerHTML === undefined) {
            innerHTML = null;
        }

        e = document.createElementNS(constants.svgNamespace, tag);
        for (attrib in attribs) {
            e.setAttribute(attribs[attrib].k, attribs[attrib].v);
        }
        e.innerHTML = innerHTML;
        return e;
    };

    /* Create a grid  to fill */
    var grid = function () {
        var i = 10;
        var increment = 10;
        var max = 100;
        var grid = [];


        for (i; i < max; i += increment) {
            /* vertical lines */
            grid.push(element(constants.svgLine, [{
                'k': 'x1',
                'v': i + '%'
                    }, {
                'k': 'x2',
                'v': i + '%'
                    }, {
                'k': 'y1',
                'v': '0%'
                    }, {
                'k': 'y2',
                'v': '100%'
                    }, {
                'k': 'class',
                'v': constants.gridLineClass
                    }]));
            /* vertical lines */
            grid.push(element(constants.svgLine, [{
                'k': 'y1',
                'v': i + '%'
                    }, {
                'k': 'y2',
                'v': i + '%'
                    }, {
                'k': 'x1',
                'v': '0%'
                    }, {
                'k': 'x2',
                'v': '100%'
                    }, {
                'k': 'class',
                'v': constants.gridLineClass
                    }]));
        }

        return grid;

    }


    /* Create a graph edge */
    var edge = function (x1, y1, x2, y2, diff) {
        return element('line', [
            {
                'k': 'x1',
                'v': x1 + '0%'
                    },
            {
                'k': 'y1',
                'v': y1 + '0%'
                    },
            {
                'k': 'x2',
                'v': x2 + '0%'
                    },
            {
                'k': 'y2',
                'v': y2 + '0%'
                    },
            {
                'k': 'class',
                'v': 'edge'
                    },
            {
                'k': 'data-difficulty',
                'v': diff
                    }
                ])
    };
    /* Create a graph node */
    var node = function (x, y) {
        return element('circle', [
            {
                k: 'cx',
                v: x + '0%'
                },
            {
                k: 'cy',
                v: y + '0%'
                },
            {
                k: 'class',
                v: 'node'
                }
            ])
    };

    return {
        edge, node, grid
    }

}());