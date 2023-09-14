$(document).ready(function() {

    function loadVehicles() {
        $.getJSON("../funciones/vehiculos/getVehiculos.php", function(data) {
            if (data.success) {
                const vehiculos = data.vehiculos;
                const tbody = $("#vehiculosTable tbody");
                tbody.empty();
                vehiculos.forEach(function(vehiculo) {
                    tbody.append(`
                        <tr>
                            <td>${vehiculo.id}</td>
                            <td>${vehiculo.nombre}</td>
                            <td>${vehiculo.descripcion}</td>
                            <td>${vehiculo.preciocombustible}</td>
                            <td>${vehiculo.fecha_modificacion}</td> <!-- Nueva columna -->
                            <td>
                                <button class="editar">Editar</button>
                                <button class="borrar">Borrar</button>
                            </td>
                        </tr>
                    `);
                });
            } else {
                alert(data.message);
            }
        });
    }

    loadVehicles();


    $("#vehiculoForm").submit(function(event) {
        event.preventDefault();
    
        var formData = $(this).serialize();
        var vehiculoId = $("#vehiculoId").val(); // Obtener el ID del campo oculto

        if (vehiculoId && vehiculoId !== "") {
            $.post("../funciones/vehiculos/updateVehiculo.php", formData)
            .done(function(data) {
                if(data.success) {
                    
                } else {
                    alert("Vehículo actualizado exitosamente!");
                    $("#vehiculoForm")[0].reset();
                    loadVehicles();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        } else {
            $.post("../funciones/vehiculos/insertVehiculos.php", formData)
            .done(function(data) {
                if(data.success) {
                    alert("Vehículo registrado exitosamente!");
                    $("#vehiculoForm")[0].reset();
                    loadVehicles();
                } else {
                    alert(data.message);
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
        
    });

    $(document).on("click", ".editar", function() {
        var row = $(this).closest('tr');
        var vehiculoId = row.find('td:first').text(); // ID del vehículo en la primera celda de la fila
    
        $.getJSON("../funciones/vehiculos/getVehiculoById.php", { id: vehiculoId })
        .done(function(data) {
            if (data.success) {
                var vehiculo = data.vehiculo;
    
                // Llenar el formulario con los datos del vehículo
                $("#nombre").val(vehiculo.nombre);
                $("#descripcion").val(vehiculo.descripcion);
                $("#preciocombustible").val(vehiculo.preciocombustible);
                
                // Actualiza el campo oculto con el ID del vehículo
                $("#vehiculoId").val(vehiculo.id);

                // Mueve el foco al campo #RUT y desplaza la página hasta esa posición
                $("#nombre").focus();
                
                var nombrePosition = $("#nombre")[0].getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({top: nombrePosition, behavior: 'smooth'});
            } else {
                alert(data.message);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Error al comunicarse con el servidor: " + errorThrown);
        });
    });
    
    $("#searchInput").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#vehiculosTable tbody tr").each(function() {
            $(this).text().toLowerCase().indexOf(value) !== -1 ? $(this).show() : $(this).hide();
        });
    });
    
    $(document).on("click", ".borrar", function() {
        var row = $(this).closest('tr');
        var vehiculoId = row.find('td:first').text(); 
    
        var userConfirmed = confirm("¿Estás seguro de que deseas eliminar este registro?");
        if (userConfirmed) {
            $.post("../funciones/vehiculos/updateEstadoVehiculo.php", { id: vehiculoId })
            .done(function(data) {
                if (data.success) {
                    
                } else {
                    alert("Vehículo eliminado exitosamente!");
                    $("#vehiculoForm")[0].reset();
                    loadVehicles();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
    });
    
    
    
    
    $("#exportToExcel").click(function() {
        exportToExcel('vehiculosTable', 'vehiculos');
    });    
    
});

function exportToExcel(tableId, name) {
    let table = document.getElementById(tableId);
    let clonedTable = table.cloneNode(true);

    // Elimina la primera y última columna de cada fila en la tabla clonada
    let rows = clonedTable.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].deleteCell(-1); // Elimina la última celda
        rows[i].deleteCell(0);  // Elimina la primera celda
    }

    // Crea un nuevo libro de trabajo y hoja
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(clonedTable);

    // Añade la hoja al libro de trabajo y exporta a un archivo .xlsx
    XLSX.utils.book_append_sheet(wb, ws, name);
    XLSX.writeFile(wb, name + '.xlsx');
}
