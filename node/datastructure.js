module.exports = function () {
    /*
    Represents a network graph
    */
    this.Graph = function (nodes, edges, description) {
        this.description = description;
        this.nodes = nodes;
        this.edges = edges;
        this.minX;
        this.minY;
    };

    /*
    Represents a node in the graph
    */
    this.Node = function (x, y, z, inboundEdges, outboundEdges, description) {
        /*
        x coordinate of the node
        */
        this.x = x;
        /* y coordinatoe of the node */
        this.y = y;
        /* z coordinator of the node */
        this.z = z;
        /* edges inbound on this node */
        this.inboundEdges = inboundEdges;
        /* edges outbound on this node */
        this.inboundEdges = outboundEdges;
        /* descripton of the node */
        this.description = description;
    };

    /*
    Represents an edge in the graph
    */
    this.Edge = function (id, origin, terminus, weight, description) {

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

    };

    this.log = function () {
        console.log("hello");
    }

}