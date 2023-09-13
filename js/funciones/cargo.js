$(document).ready(function() {

    function loadCargos() {
        $.getJSON("../funciones/cargo/getCargo.php", function(data) {
            if (data.success) {
                const cargos = data.cargos;
                const tbody = $("#cargosTable tbody");
                tbody.empty();
                cargos.forEach(function(cargo) {
                    tbody.append(`
                        <tr>
                            <td>${cargo.id}</td>
                            <td>${cargo.cargo}</td>
                            <td>${cargo.sueldo}</td>
                            <td>${cargo.costohh}</td>
                            <td>${cargo.cargo_largo}</td>
                            <td>${cargo.B_T_Dia}</td>
                            <td>${cargo.B_T_Noche}</td>
                            <td>${cargo.B_sab_dom_festivo}</td>
                            <td>${cargo.B_Emergen}</td>
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

    loadCargos();

    $("#searchInput").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#cargosTable tbody tr").each(function() {
            $(this).text().toLowerCase().indexOf(value) !== -1 ? $(this).show() : $(this).hide();
        });
    });

    $(document).on("click", ".editar", function() {
        var row = $(this).closest('tr');
        var cargoId = row.find('td:first').text(); // ID del vehículo en la primera celda de la fila
    
        $.getJSON("../funciones/cargo/getCargoById.php", { id: cargoId })
        .done(function(data) {
            if (data.success) {
                var cargo = data.cargo;
    
                // Llenar el formulario con los datos del vehículo
                $("#cargo").val(cargo.cargo);
                $("#sueldo").val(cargo.sueldo);
                $("#costohh").val(cargo.costohh);
                $("#cargo_largo").val(cargo.cargo_largo);
                $("#B_T_Dia").val(cargo.B_T_Dia);
                $("#B_T_Noche").val(cargo.B_T_Noche);
                $("#B_sab_dom_festivo").val(cargo.B_sab_dom_festivo);
                $("#B_Emergen").val(cargo.B_Emergen);
                
                // Actualiza el campo oculto con el ID del cargo
                $("#cargoId").val(cargo.id);
            } else {
                alert(data.message);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Error al comunicarse con el servidor: " + errorThrown);
        });
    });

    $('#cargoForm').on('submit', function(e){
        e.preventDefault();
        
        var cargoValue = $("[name='cargo']").val();
    
        if (cargoValue === "") {
            alert("El campo cargo está vacío, por favor llénalo antes de enviar.");
            return;
        }
    
        var formData = $(this).serialize();
    
        $.ajax({
            url: '../funciones/cargo/updateCargo.php', // Asegúrate de reemplazar con la ruta correcta a tu archivo PHP
            type: 'POST',
            data: formData,
            success: function(response) {
                try {
                    var responseData = JSON.parse(response);
                    if(responseData.success) {
                        alert("Cargo actualizado exitosamente!");
                        $("#cargoForm")[0].reset();
                        loadCargos();
                    } else {
                        alert("Error: " + responseData.message);
                    }
                } catch (e) {
                    alert("Error en la respuesta del servidor.");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error en la solicitud AJAX: " + textStatus);
            }
        });
    });
    

    $(document).on("click", ".borrar", function() {
        var row = $(this).closest('tr');
        var cargoId = row.find('td:first').text();
    
        // Preguntar al usuario si realmente quiere eliminar el registro
        var userConfirmed = confirm("¿Estás seguro de que deseas eliminar este registro?");
        if (userConfirmed) {
            $.post("../funciones/cargo/updateEstadoCargo.php", { id: cargoId })
            .done(function(data) {
                if (data.success) {
                    // Acciones después de borrar un cargo
                    
                } else {
                    alert("Cargo eliminado exitosamente!");
                    $("#cargoForm")[0].reset();
                    loadCargos();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
    });
    

    $("#exportToExcel").click(function() {
        exportToExcel('cargosTable', 'cargos');
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

