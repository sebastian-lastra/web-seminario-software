
$(function(){

    $('#agregar-producto').click(function(){
    
        $.ajax({
    
            url: 'http://localhost:3000/api/producto',
            
            type: 'POST',
            
            data: {
            
                productoCodigo: $('#productoCodigo').val(),
                
                productoNombre: $('#productoNombre').val(),
                
                productoDescripcion: $('#productoDescripcion').val()
            
            },
            
            error: function (xhr, ajaxOptions, thrownError) {
            
                alert(xhr.status);
                
                alert(thrownError);
                
            },
            
            success: function(result) {
            
                alert(result);
                
            }
            
        });
    
    });

});