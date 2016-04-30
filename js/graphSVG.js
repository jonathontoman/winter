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
            gridInterval: 5
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

        var max = 100;
        var grid = [];


        for (i = configuration.gridInterval; i < max; i += configuration.gridInterval) {
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
                'v': x1
                    },
            {
                'k': 'y1',
                'v': y1
                    },
            {
                'k': 'x2',
                'v': x2
                    },
            {
                'k': 'y2',
                'v': y2
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


    /*
    Calculate the viewbox attribute for the SVG canvas
    The viewbox that is returned will always be a square
    */
    var viewBox = function (xCoordinates, yCoordinates) {
        /*
        Get max and min values of coordinates
        */
        var maxX = Math.max.apply(null, xCoordinates);
        var maxY = Math.max.apply(null, yCoordinates);
        var minX = Math.min.apply(null, xCoordinates);
        var minY = Math.min.apply(null, yCoordinates);

        // max viewbox Coordinates is largest of maxX and maxY
        var viewBoxMax = (maxX >= maxY) ? maxX : maxY;
        /*
        Get 10% of viewbox max
        */
        var margin = viewBoxMax * 0.1;

        minX = minX - margin;
        minY = minY - margin;
        maxX = viewBoxMax + margin;
        maxY = viewBoxMax + margin;

        return minX + " " + minY + " " + maxX + " " + maxY;
    };

    /* Create a graph node */
    var node = function (x, y) {
        return element('circle', [
            {
                k: 'cx',
                v: x
                },
            {
                k: 'cy',
                v: y
                },
            {
                k: 'class',
                v: 'node'
                }
            ])
    };

    return {
        edge, node, grid, viewBox
    }

}());