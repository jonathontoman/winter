window.addEventListener('load', function () {
    $.ajax({
        method:'GET',
        url: 'data/nodes.json',
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (xhr,ajaxOptions,error){            
            console.log(ajaxOptions);
            console.log(error);
        }
    });
});