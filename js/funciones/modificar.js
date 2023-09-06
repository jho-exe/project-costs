$(document).ready(function() {
    $('.searchOP').on('click', function() {
        var numOP = $('input[placeholder="Ingresar número de OP"]').val();
        if (numOP) {
            $.getJSON("../funciones/modificar/getIngresoMod.php", { numOP: numOP }, function(response) {
                if (response.data) {
                    $('#numOP').val(response.data.numOP);
                    $('#fechaInicio').val(response.data.fechaInicio);
                    $('#fechaTermino').val(response.data.fechaTermino);
                    $('#numVenta').val(response.data.numVenta);
                    $('#rutEmpresa').val(response.data.rutEmpresa);
                    $('#nombreEmpresa').val(response.data.nombreEmpresa);
                    $('#servicio').val(response.data.servicio);
                    
                    // Validación para el campo 'bono'
                    var bonoValue = response.data.bono;
                    if(!bonoValue) {
                        bonoValue = "No_bono";
                    }
                    $('#bono').val(bonoValue); 

                    // Continuar con los demás campos...
                } else {
                    console.error(response.error);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
            });
        } else {
            console.error("Por favor, ingresa un número de OP.");
        }
    });
});
