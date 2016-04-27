/*
Graph SVG is a module to assit in creating SVG elements used to draw two dimensional network graphs.
*/
var graphSVG = (function (configuration) {
    
    
    if ( configuration === undefined)
    {
        var configuration  = {};
    }
    
    /*
    Builds elements
    */
    var element = function element(tag, attribs, innerHTML) {
        /* The svg namespace, used to create SVG eleents*/
        var svgNamespace = 'http://www.w3.org/2000/svg';
        var e;
        if (attribs === undefined) {
            attribs = [];
        }
        if (innerHTML === undefined) {
            innerHTML = null;
        }

        e = document.createElementNS(svgNamespace, tag);
        for (attrib in attribs) {
            e.setAttribute(attribs[attrib].k, attribs[attrib].v);
        }
        e.innerHTML = innerHTML;
        return e;
    }

    return {
        /* Create a graph edge */
        edge: function (x1, y1, x2, y2, diff) {
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
        },
        /* Create a graph node */
        node: function (x, y) {
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
        }
    }

}());