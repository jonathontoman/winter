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
            /* veritcal lines */
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
            /* horizontal lines */
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
        Starting x and y coordinates are the smallest x and y coordinates
        */
        var startX = Math.min.apply(null, xCoordinates);
        var startY = Math.min.apply(null, yCoordinates);

        // max viewbox Coordinates is whichever of the x or y coordinatoes has the greatest range
        var xRange = Math.max.apply(null, xCoordinates) - startX;
        var yRange = Math.max.apply(null, yCoordinates) - startY;

        /*
        The viewbox will cover the the area defined by the largest of the x and y range
        */
        var chosenRange;
        if (xRange >= yRange) {
            chosenRange = xRange;
            /*
            x range is larger, y range needs to be centered, decrease the y start point
            */
            startY -= (xRange - yRange) / 2;
        } else {
            chosenRange = yRange;
            /*
            y range is larger, x range needs to be centered, decrease the x start point
            */
            startX -= (yRange - xRange) / 2;
        }

        /*
        Get 10% of range for the margin around the nodes.
        */
        var margin = chosenRange * 0.1
        chosenRange += (2 * margin);
        startX -= margin;
        startY -= margin;

        return startX + " " + startY + " " + chosenRange + " " + chosenRange;
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