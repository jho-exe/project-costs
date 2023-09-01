$(document).ready(function() {
    $("#buscarOPNV").on("keyup", function(e) {
        // Si la tecla presionada no es 'Enter', simplemente regresar
        if(e.which !== 13) {
            return;
        }
    
        var valorIngresado = $(this).val();
    
        $.post("../funciones/getServicios.php", { buscarOPNV: valorIngresado }, function(response) {
    
            if(response && response.fechaInicio) {
                $('#fechaInicio').val(response.fechaInicio);
                $('#fechaTermino').val(response.fechaTermino);
                $('#numOP').val(response.numOP);
                $('#numVenta').val(response.numVenta);
                $('#rutEmpresa').val(response.rutEmpresa);
                $('#nombreEmpresa').val(response.nombreEmpresa);
                $('#servicio').val(response.servicio);
            } else {
                alert("Error en la respuesta o no se encontró información.");
            }
        }, "json")
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Error en la petición: " + textStatus); 
        });
    });
    
    
    // Aquí va el código anterior...
});
