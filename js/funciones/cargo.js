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

