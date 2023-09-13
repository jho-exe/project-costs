$(document).ready(function(){
    // function loadIngresoGrilla() {
    //     $.getJSON("../funciones/informe/getIngresoTotal.php", function(data) {
    //         if (data.success) {
    //             const ingresos = data.data;
    //             const tbody = $("#ingresosTable tbody");
    //             tbody.empty();
    //             ingresos.forEach(function(ingreso) {
    //                 tbody.append(`
    //                     <tr>
    //                         <td>${ingreso.id}</td>
    //                         <td>${ingreso.numOP}</td>
    //                         <td>${ingreso.fechaInicio}</td>
    //                         <td>${ingreso.fechaTermino}</td>
    //                         <td>${ingreso.numVenta}</td>
    //                         <td>${ingreso.rutEmpresa}</td>
    //                         <td>${ingreso.nombreEmpresa}</td>
    //                         <td>${ingreso.servicio}</td>
    //                         <td>${ingreso.bono}</td>
    //                         <td>${ingreso.supervisor}</td>
    //                         <td>${ingreso.valorSupervisor}</td>
    //                         <td>${ingreso.apr}</td>
    //                         <td>${ingreso.valorApr}</td>
    //                         <td>${ingreso.m1}</td>
    //                         <td>${ingreso.valorM1}</td>
    //                         <td>${ingreso.m2}</td>
    //                         <td>${ingreso.valorM2}</td>
    //                         <td>${ingreso.mecanico}</td>
    //                         <td>${ingreso.valorMecanico}</td>
    //                         <td>${ingreso.ayudante}</td>
    //                         <td>${ingreso.valorAyudante}</td>
    //                         <td>${ingreso.totalTrabajadores}</td>
    //                         <td>${ingreso.totalManoObra}</td>
    //                         <td>${ingreso.tallerTerreno}</td>
    //                         <td>${ingreso.duracionServicio}</td>
    //                         <td>${ingreso.totalHoras}</td>
    //                         <td>${ingreso.vehiculo1}</td>
    //                         <td>${ingreso.combustible1}</td>
    //                         <td>${ingreso.vehiculo2}</td>
    //                         <td>${ingreso.combustible2}</td>
    //                         <td>${ingreso.vehiculo3}</td>
    //                         <td>${ingreso.combustible3}</td>
    //                         <td>${ingreso.totalKilometros}</td>
    //                         <td>${ingreso.totalPeajes}</td>
    //                         <td>${ingreso.totalCombustible}</td>
    //                         <td>${ingreso.totalGastosVehiculos}</td>
    //                         <td>${ingreso.observaciones}</td>
    //                         <td>${ingreso.insumo1}</td>
    //                         <td>${ingreso.precio1}</td>
    //                         <td>${ingreso.cantidad1}</td>
    //                         <td>${ingreso.insumo2}</td>
    //                         <td>${ingreso.precio2}</td>
    //                         <td>${ingreso.cantidad2}</td>
    //                         <td>${ingreso.insumo3}</td>
    //                         <td>${ingreso.precio3}</td>
    //                         <td>${ingreso.cantidad3}</td>
    //                         <td>${ingreso.insumo4}</td>
    //                         <td>${ingreso.precio4}</td>
    //                         <td>${ingreso.cantidad4}</td>
    //                         <td>${ingreso.insumo5}</td>
    //                         <td>${ingreso.precio5}</td>
    //                         <td>${ingreso.cantidad5}</td>
    //                         <td>${ingreso.insumo6}</td>
    //                         <td>${ingreso.precio6}</td>
    //                         <td>${ingreso.cantidad6}</td>
    //                         <td>${ingreso.insumo7}</td>
    //                         <td>${ingreso.precio7}</td>
    //                         <td>${ingreso.cantidad7}</td>
    //                         <td>${ingreso.insumo8}</td>
    //                         <td>${ingreso.precio8}</td>
    //                         <td>${ingreso.cantidad8}</td>
    //                         <td>${ingreso.insumo9}</td>
    //                         <td>${ingreso.precio9}</td>
    //                         <td>${ingreso.cantidad9}</td>
    //                         <td>${ingreso.totalGastosInsumos}</td>
    //                         <td>${ingreso.alojamientos}</td>
    //                         <td>${ingreso.alimentacion}</td>
    //                         <td>${ingreso.varios}</td>
    //                         <td>${ingreso.totalLogistica}</td>
    //                         <td>${ingreso.fecha_modificacion}</td>
    //                         <td>${ingreso.fecha_eliminacion}</td>
    //                         <td>${ingreso.costoTotal}</td>
    //                     </tr>
    //                 `);
    //             });
    //         } else {
    //             alert(data.message);
    //         }
    //     });
    // }

    // loadIngresoGrilla();

    $(document).ready(function() {
        function getIngresoGrilla() {
            $.getJSON("../funciones/informe/getIngresoTotal.php", function(response) {
                if (response.data) {
                    var items = [];
                    $.each(response.data, function(key, val) {
                        items.push("<tr>");
                        items.push("<td>" + val.id + "</td>");
                        items.push("<td>" + val.numOP + "</td>");
                        items.push("<td>" + val.fechaInicio + "</td>");
                        items.push("<td>" + val.fechaTermino + "</td>");
                        items.push("<td>" + val.numVenta + "</td>");
                        items.push("<td>" + val.rutEmpresa + "</td>");
                        items.push("<td>" + val.nombreEmpresa + "</td>");
                        items.push("<td>" + val.servicio + "</td>");
                        items.push("<td>" + val.bono + "</td>");
                        items.push("<td>" + val.supervisor + "</td>");
                        items.push("<td>" + val.valorSupervisor + "</td>");
                        items.push("<td>" + val.apr + "</td>");
                        items.push("<td>" + val.valorApr + "</td>");
                        items.push("<td>" + val.m1 + "</td>");
                        items.push("<td>" + val.valorM1 + "</td>");
                        items.push("<td>" + val.m2 + "</td>");
                        items.push("<td>" + val.valorM2 + "</td>");
                        items.push("<td>" + val.mecanico + "</td>");
                        items.push("<td>" + val.valorMecanico + "</td>");
                        items.push("<td>" + val.ayudante + "</td>");
                        items.push("<td>" + val.valorAyudante + "</td>");
                        items.push("<td>" + val.totalTrabajadores + "</td>");
                        items.push("<td>" + val.totalManoObra + "</td>");
                        items.push("<td>" + val.tallerTerreno + "</td>");
                        items.push("<td>" + val.duracionServicio + "</td>");
                        items.push("<td>" + val.totalHoras + "</td>");
                        items.push("<td>" + val.vehiculo1 + "</td>");
                        items.push("<td>" + val.combustible1 + "</td>");
                        items.push("<td>" + val.vehiculo2 + "</td>");
                        items.push("<td>" + val.combustible2 + "</td>");
                        items.push("<td>" + val.vehiculo3 + "</td>");
                        items.push("<td>" + val.combustible3 + "</td>");
                        items.push("<td>" + val.totalKilometros + "</td>");
                        items.push("<td>" + val.totalPeajes + "</td>");
                        items.push("<td>" + val.totalCombustible + "</td>");
                        items.push("<td>" + val.totalGastosVehiculos + "</td>");
                        items.push("<td>" + val.observaciones + "</td>");
                        items.push("<td>" + val.insumo1 + "</td>");
                        items.push("<td>" + val.precio1 + "</td>");
                        items.push("<td>" + val.cantidad1 + "</td>");
                        items.push("<td>" + val.insumo2 + "</td>");
                        items.push("<td>" + val.precio2 + "</td>");
                        items.push("<td>" + val.cantidad2 + "</td>");
                        items.push("<td>" + val.insumo3 + "</td>");
                        items.push("<td>" + val.precio3 + "</td>");
                        items.push("<td>" + val.cantidad3 + "</td>");
                        items.push("<td>" + val.insumo4 + "</td>");
                        items.push("<td>" + val.precio4 + "</td>");
                        items.push("<td>" + val.cantidad4 + "</td>");
                        items.push("<td>" + val.insumo5 + "</td>");
                        items.push("<td>" + val.precio5 + "</td>");
                        items.push("<td>" + val.cantidad5 + "</td>");
                        items.push("<td>" + val.insumo6 + "</td>");
                        items.push("<td>" + val.precio6 + "</td>");
                        items.push("<td>" + val.cantidad6 + "</td>");
                        items.push("<td>" + val.insumo7 + "</td>");
                        items.push("<td>" + val.precio7 + "</td>");
                        items.push("<td>" + val.cantidad7 + "</td>");
                        items.push("<td>" + val.insumo8 + "</td>");
                        items.push("<td>" + val.precio8 + "</td>");
                        items.push("<td>" + val.cantidad8 + "</td>");
                        items.push("<td>" + val.insumo9 + "</td>");
                        items.push("<td>" + val.precio9 + "</td>");
                        items.push("<td>" + val.cantidad9 + "</td>");
                        items.push("<td>" + val.totalGastosInsumos + "</td>");
                        items.push("<td>" + val.alojamientos + "</td>");
                        items.push("<td>" + val.alimentacion + "</td>");
                        items.push("<td>" + val.varios + "</td>");
                        items.push("<td>" + val.totalLogistica + "</td>");
                        items.push("<td>" + val.fecha_modificacion + "</td>");
                        items.push("<td>" + val.fecha_eliminacion + "</td>");
                        items.push("<td>" + val.costoTotal + "</td>");
                        items.push("<td>" + val.estado + "</td>");
                        items.push("</tr>");
                    });
                    
                    $("#ingresosTable tbody").html(items.join(""));
                } else {
                    console.error(response.error);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
            });
        }
    
        getIngresoGrilla();
    });

    $("#searchInput").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#ingresosTable tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#exportToExcel").click(function() {
        exportToExcel('ingresosTable', 'ingresos');
    });   

    $('#exportarHistorico').on('click', function() {
        window.location.href = '../exportar_excel.php'; // Reemplaza con la ruta real de tu script PHP
    });
    
    
});

function exportToExcel(tableId, name) {
    let table = document.getElementById(tableId);
    let clonedTable = table.cloneNode(true);

    let rows = clonedTable.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].deleteCell(-1); 
        rows[i].deleteCell(0);  
    }

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(clonedTable);

    XLSX.utils.book_append_sheet(wb, ws, name);
    XLSX.writeFile(wb, name + '.xlsx');
}
