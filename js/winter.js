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

function displayNodes(data)
{
    
/*    var nodes = data.nodes;
    console.log(nodes);
    
    var length = nodes.length;    
    for (var i = 0; i < length ; i++)
    {
        $('#graph').append('<circle cx="10%" cy="20%" r="2%" stroke="black" stroke-width="3" fill="red"/>');
        console.log('display nodes method');
    }*/
    
}