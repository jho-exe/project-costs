$(document).ready(function() {

    function loadInsumos() {
        $.getJSON("../funciones/insumos/getInsumo.php", function(data) {
            if (data.success) {
                const insumos = data.insumos;
                const tbody = $("#insumosTable tbody");
                tbody.empty();
                insumos.forEach(function(insumo) {
                    tbody.append(`
                        <tr>
                            <td>${insumo.id}</td>
                            <td>${insumo.nombre}</td>
                            <td>${insumo.precio}</td>
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

    loadInsumos();

    $("#insumoForm").submit(function(event) {
        event.preventDefault();
    
        var formData = $(this).serialize();
        var insumoId = $("#insumoId").val(); // Obtener el ID del campo oculto
    
        if (insumoId && insumoId !== "") {
            $.post("../funciones/insumos/updateInsumo.php", formData)
            .done(function(data) {
                if(data && data.success) {
                    
                } else {
                    alert("Insumo actualizado exitosamente!");
                    $("#insumoForm")[0].reset();
                    loadInsumos();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        } else {
            $.post("../funciones/insumos/insertInsumos.php", formData)
            .done(function(data) {
                if(data && data.success) {
                    alert("Insumo registrado exitosamente!");
                    $("#insumoForm")[0].reset();
                    loadInsumos();
                } else {
                    alert(data.message || "Error al registrar el insumo.");
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
    });
    

    $(document).on("click", ".editar", function() {
        var row = $(this).closest('tr');
        var insumoId = row.find('td:first').text();

        $.getJSON("../funciones/insumos/getInsumoById.php", { id: insumoId })
        .done(function(data) {
            if (data.success) {
                var insumo = data.insumo;

                $("#nombre").val(insumo.nombre);
                $("#precio").val(insumo.precio);

                $("#insumoId").val(insumo.id);
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
        $("#insumosTable tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(document).on("click", ".borrar", function() {
        var row = $(this).closest('tr');
        var insumoId = row.find('td:first').text();

        var userConfirmed = confirm("¿Estás seguro de que deseas eliminar este registro?");
        if (userConfirmed) {
            $.post("../funciones/insumos/updateEstadoInsumo.php", { id: insumoId })
            .done(function(data) {
                if (data.success) {
                    
                } else {
                    alert("Insumo eliminado exitosamente!");
                    loadInsumos();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
    });

    $("#exportToExcel").click(function() {
        exportToExcel('insumosTable', 'insumos');
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
