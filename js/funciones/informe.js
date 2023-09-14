$(document).ready(function(){
    $("#btnBuscar").click(function(){
        var numOP = $("#searchOp").val();

        $.ajax({
            type: "POST",
            url: "../funciones/informe/getIngreso.php",
            data: { numOP: numOP },
            dataType: "json",
            success: function(response) {
                if(response.error) {
                    alert(response.error);
                } else {
                    $('#id').text(response.id);
                    $('#numOP').text(response.numOP);
                    $('#fechaInicio').text(response.fechaInicio);
                    $('#fechaTermino').text(response.fechaTermino);
                    $('#numVenta').text(response.numVenta);
                    $('#rutEmpresa').text(response.rutEmpresa);
                    $('#nombreEmpresa').text(response.nombreEmpresa);
                    $('#servicio').text(response.servicio);
                    $('#bono').text(response.bono);
                    $('#supervisor').text(response.supervisor);
                    $('#valorSupervisor').text(response.valorSupervisor);
                    $('#apr').text(response.apr);
                    $('#valorApr').text(response.valorApr);
                    $('#m1').text(response.m1);
                    $('#valorM1').text(response.valorM1);
                    $('#m2').text(response.m2);
                    $('#valorM2').text(response.valorM2);
                    $('#mecanico').text(response.mecanico);
                    $('#valorMecanico').text(response.valorMecanico);
                    $('#ayudante').text(response.ayudante);
                    $('#valorAyudante').text(response.valorAyudante);
                    $('#totalTrabajadores').text(response.totalTrabajadores);
                    $('#totalManoObra').text(response.totalManoObra);
                    $('#tallerTerreno').text(response.tallerTerreno);
                    $('#duracionServicio').text(response.duracionServicio);
                    $('#totalHoras').text(response.totalHoras);
                    $('#vehiculo1').text(response.vehiculo1);
                    $('#combustible1').text(response.combustible1);
                    $('#vehiculo2').text(response.vehiculo2);
                    $('#combustible2').text(response.combustible2);
                    $('#vehiculo3').text(response.vehiculo3);
                    $('#combustible3').text(response.combustible3);
                    $('#totalKilometros').text(response.totalKilometros);
                    $('#totalPeajes').text(response.totalPeajes);
                    $('#totalCombustible').text(response.totalCombustible);
                    $('#totalGastosVehiculos').text(response.totalGastosVehiculos);
                    $('#observaciones').text(response.observaciones);
                    $('#insumo1').text(response.insumo1);
                    $('#precio1').text(response.precio1);
                    $('#cantidad1').text(response.cantidad1);
                    $('#insumo2').text(response.insumo2);
                    $('#precio2').text(response.precio2);
                    $('#cantidad2').text(response.cantidad2);
                    $('#insumo3').text(response.insumo3);
                    $('#precio3').text(response.precio3);
                    $('#cantidad3').text(response.cantidad3);
                    $('#insumo4').text(response.insumo4);
                    $('#precio4').text(response.precio4);
                    $('#cantidad4').text(response.cantidad4);
                    $('#insumo5').text(response.insumo5);
                    $('#precio5').text(response.precio5);
                    $('#cantidad5').text(response.cantidad5);
                    $('#insumo6').text(response.insumo6);
                    $('#precio6').text(response.precio6);
                    $('#cantidad6').text(response.cantidad6);
                    $('#insumo7').text(response.insumo7);
                    $('#precio7').text(response.precio7);
                    $('#cantidad7').text(response.cantidad7);
                    $('#insumo8').text(response.insumo8);
                    $('#precio8').text(response.precio8);
                    $('#cantidad8').text(response.cantidad8);
                    $('#insumo9').text(response.insumo9);
                    $('#precio9').text(response.precio9);
                    $('#cantidad9').text(response.cantidad9);
                    $('#totalGastosInsumos').text(response.totalGastosInsumos);
                    $('#alojamientos').text(response.alojamientos);
                    $('#alimentacion').text(response.alimentacion);
                    $('#varios').text(response.varios);
                    $('#totalLogistica').text(response.totalLogistica);
                    $('#costoTotal').text(response.costoTotal);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error: " + textStatus + " " + errorThrown);
            }
        });
    });

    $("#btnImprimir").click(function() {
        var currentDate = new Date();
        // Obtener la fecha formateada en un formato legible
        var formattedDate = currentDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        // Obtener solo el año actual
        var currentYear = currentDate.getFullYear();
        // Establecer el texto del elemento con id 'fechaInforme' a la fecha formateada
        $('#fechaInforme').text(formattedDate);
        // Establecer el texto del elemento con id 'actual' al año actual
        $('#actual').text(currentYear);
        // Obtener el contenido HTML dentro del elemento con clase 'container'
        var printContents = $(".container").html();
        // Guardar el contenido actual del cuerpo (body)
        var originalContents = document.body.innerHTML;
        // Reemplazar el contenido del cuerpo con el contenido que queremos imprimir
        document.body.innerHTML = printContents;
        // Iniciar la impresión
        window.print();
        // Restaurar el contenido original del cuerpo después de imprimir
        document.body.innerHTML = originalContents;
        location.reload(); // Recarga la página

    });
    
});


