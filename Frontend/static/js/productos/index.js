alert("XD")
function EliminarProducto(id){
				
    $.ajax({

        url: 'http://localhost:3000/api/producto/' + id,
        
        type: 'DELETE',
        
        error: function (xhr, ajaxOptions, thrownError) {
        
            alert(xhr.status);
            
            alert(thrownError);
            
        },
        
        success: function(result) {
        
            alert(result);
            
            Refrescar();
            
        }
        
    });

}

function Refrescar() {
    
        $('#listado-productos').html('');
        
        $('#listado-productos').append('<tr><td>C&oacute;digo</td><td>Nombre</td><td>Descripci&oacute;n</td><td>Acciones</td></tr>');
    
        $.ajax({
            
            url: 'http://localhost:3000/api/producto',
            
            type: 'GET',
            
            error: function (xhr, ajaxOptions, thrownError) {
            
                alert(xhr.status);
                
                alert(thrownError);
                
            },
            
            success: function(result) {
            
                if (result.length) {
                
                    for(i = 0;i < result.length; i++) {
                    
                        $('#listado-productos').append('<tr><td>' + result[i].productoCodigo + '</td><td>' + 
                                                                    result[i].productoNombre + '</td><td>' + 
                                                                    result[i].productoDescripcion + '</td><td>' + 
                                                                    '<a href="modificarProducto.html?_id=' + result[i]._id + '">Modificar</a> | <a class="eliminar" href="javascript:EliminarProducto(\'' + result[i]._id + '\');">Eliminar</a></td></tr>');
                    
                    }
                
                }
                else {
                
                    $('#listado-productos').append('<tr><td colspan="4">No se encontraron productos.</td></tr>');
                
                }
                
            }
        });
    
    }

$(function(){

    Refrescar();

});