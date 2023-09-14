$(document).ready(function() {

    function showNotification(message, type = 'success') {
        // Crear el popup si no existe
        if (!$('.notification-popup').length) {
            $('body').append('<div class="notification-popup"></div>');
        }

        const $notification = $('.notification-popup');

        // Configurar el mensaje y el tipo (si es error)
        $notification.text(message);
        if (type === 'error') {
            $notification.addClass('error');
        } else {
            $notification.removeClass('error');
        }

        // Mostrar el popup
        $notification.css('bottom', '30px');
        $notification.css('right', '20px');

        // Ocultar el popup después de 3 segundos
        setTimeout(function() {
            $notification.css('bottom', '-100px');
        }, 3000);
    }

    window.onload = function() {
        var url = new URL(window.location.href);
        var message = url.searchParams.get('message');
        if (message === 'Datos importados con éxito') {
            showNotification(message);

            // Eliminar el mensaje de la URL para evitar que se muestre nuevamente al recargar
            url.searchParams.delete('message');
            window.history.replaceState(null, null, url.toString());
        }
    };

    function loadEmpresas() {
        $.getJSON("../funciones/empresa/getEmpresa.php", function(data) {
            if (data.success) {
                const empresas = data.empresas;
                const tbody = $("#empresasTable tbody");
                tbody.empty();
                empresas.forEach(function(empresa) {
                    tbody.append(`
                        <tr>
                            <td>${empresa.id}</td>
                            <td>${empresa.RUT}</td>
                            <td>${empresa.RazonSocial}</td>
                            <td>${empresa.Direccion}</td>
                            <td>${empresa.Telefonos}</td>
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

    loadEmpresas();

    $("#empresaForm").submit(function(event) {
        event.preventDefault();
    
        var formData = $(this).serialize();
        var empresaId = $("#empresaId").val(); 

        if (empresaId && empresaId !== "") {
            $.post("../funciones/empresa/updateEmpresa.php", formData)
            .done(function(data) {
                if(data && data.success) {
                   
                } else {
                    alert("Empresa actualizada exitosamente!");
                    $("#empresaForm")[0].reset();
                    loadEmpresas();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        } else {
            $.post("../funciones/empresa/insertEmpresa.php", formData)
            .done(function(data) {
                if(data && data.success) {
                    alert("Empresa registrada exitosamente!");
                    $("#empresaForm")[0].reset();
                    loadEmpresas();
                } else {
                    alert(data.message || "Error al registrar la empresa.");
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
    });

    $(document).on("click", ".editar", function() {
        var row = $(this).closest('tr');
        var empresaId = row.find('td:first').text();

        $.getJSON("../funciones/empresa/getEmpresaById.php", { id: empresaId })
        .done(function(data) {
            if (data.success) {
                var empresa = data.empresa;

                $("#RUT").val(empresa.RUT);
                $("#RazonSocial").val(empresa.RazonSocial);
                $("#Direccion").val(empresa.Direccion);
                $("#Telefonos").val(empresa.Telefonos);

                $("#empresaId").val(empresa.id);

                // Mueve el foco al campo #RUT y desplaza la página hasta esa posición
                $("#RUT").focus();
                
                var rutPosition = $("#RUT")[0].getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({top: rutPosition, behavior: 'smooth'});
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
        $("#empresasTable tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(document).on("click", ".borrar", function() {
        var row = $(this).closest('tr');
        var empresaId = row.find('td:first').text();

        var userConfirmed = confirm("¿Estás seguro de que deseas eliminar este registro?");
        if (userConfirmed) {
            $.post("../funciones/empresa/updateEstadoEmpresa.php", { id: empresaId })
            .done(function(data) {
                if (data.success) {
                    
                } else {
                    alert("Empresa eliminada exitosamente!");
                    loadEmpresas();
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        }
    });

    $("#exportToExcel").click(function() {
        exportToExcel('empresasTable', 'empresas');
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

document.addEventListener('DOMContentLoaded', function () {
    const popupButton = document.getElementById('popupButton');
    const popupContainer = document.querySelector('.popup-container');
    const cancelButton = document.getElementById('cancelButton');
    
    if (popupButton) {
        popupButton.addEventListener('click', function () {
            popupContainer.style.display = 'flex';
        });
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function () {
            popupContainer.style.display = 'none';
        });
    }
});

