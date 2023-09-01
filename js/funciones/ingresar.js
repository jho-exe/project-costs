// $(document).ready(function() {
//     function actualizarCostoTotal() {
//         let sumaTotal = 0;
        
//         $('.subTotal').each(function() {
//             sumaTotal += Number($(this).val()) || 0;
//         });

//         $('#costoTotal').val(sumaTotal);
//     }

//     $('.subTotal').on('change', function() {
//         actualizarCostoTotal();
//     });

//     // Suponiendo que actualizas el valor de un input llamado totalLogistica en alguna parte de tu código
//     $('#totalLogistica').val(nuevoValor).trigger('change');
// });




$(document).ready(function() {
    // Obtener empresa
    $("#rutEmpresa").blur(function() {
        var rut = $(this).val();

        $.post('../funciones/getEmpresa.php', { rut: rut }, function(data) {
            if (data && data.RazonSocial) {
                $("#nombreEmpresa").val(data.RazonSocial);
            } else {
                $("#nombreEmpresa").val(''); // Limpiar el campo si no se encuentra la empresa
                console.error("Error al obtener el nombre de la empresa.");
            }
        }, "json").fail(function(xhr, status, error) {
            $("#nombreEmpresa").val(''); // Limpiar el campo en caso de error
            console.error("Error al obtener datos de la empresa: ", error);
        });
    });
});

$(document).ready(function() {
    $('#supervisor, #apr, #m1, #m2, #mecanico, #ayudante, #totalTrabajadores, #duracionServicio #totalKilometros, #totalPeajes').on('input', function() {
        if ($(this).val().length > 2) {
            $(this).val($(this).val().slice(0, 2)); // Limitar a dos dígitos
        }
    });
});

$(document).ready(function() {
    $('#supervisor, #apr, #m1, #m2, #mecanico, #ayudante, #totalTrabajadores, #duracionServicio, #totalKilometros, #totalPeajes, #alojamientos, #alimentacion, #varios').on('focus', function() {
        if ($(this).val() === '0') {
            $(this).val('').select(); // Si el valor es 0, seleccionar todo al enfocar
        }
    });
    $('#supervisor, #apr, #m1, #m2, #mecanico, #ayudante, #totalTrabajadores, #duracionServicio, #totalKilometros, #totalPeajes, #alojamientos, #alimentacion, #varios').on('blur', function() {
        if ($(this).val() === '') {
            $(this).val('0');
        }
    });
});


$(document).ready(function() {

    // Inicialización del select2 para todos los selectores de insumo
    $('.select-insumo').select2();

    // Revisar inicialmente el estado de todos los campos de precio
    $('.precio').each(function() {
        toggleCantidad($(this));
    });

    // Observador para el evento change en todos los precios
    $('.precio').change(function() {
        toggleCantidad($(this));
    });

    // Cuando cambie el valor de cualquier selector de insumo usando select2
    $('.select-insumo').on('change', function() {
        var precioInput = $(this).closest('.insumo').find('.precio');

        if (!$(this).val()) {
            precioInput.val(0).trigger('change');
        } else {
            precioInput.val(Math.floor(Math.random() * 11)).trigger('change');
        }
    });

    function toggleCantidad(precioElem) {
        setTimeout(function() {
            var cantidadInput = precioElem.closest('.insumo').find('.cantidad');
            if (precioElem.val() == 0) {
                cantidadInput.prop('disabled', true);
            } else {
                cantidadInput.prop('disabled', false);
            }
        }, 20); // 1000 milisegundos = 1 segundo
    }
    
});

$(document).ready(function() {
    // Asignar un event listener a cada input de tipo number dentro de .input-group
    $('.input-group input[type="number"]').on('input', function() {
        // Obtener el valor del input (cantidad de cargos)
        var cantidad = $(this).val();

        // Determinar el tipo de cargo basado en el 'name' del input
        var tipoCargo = $(this).attr('name');

        // Usar AJAX para obtener el valor de 'costohh' desde la base de datos
        $.ajax({
            url: '../funciones/getCosto.php', // Ruta a tu archivo PHP
            type: 'POST',
            data: {
                cargo: tipoCargo // Enviar el tipo de cargo al servidor
            },
            dataType: 'json', // Esperamos respuesta en formato JSON
            success: function(response) {
                // Validar que response y response.costohh son números
                if (!isNaN(cantidad) && response && !isNaN(response.costohh)) {
                    var valorTotal = response.costohh * cantidad;

                    // Actualizar el campo de tipo number correspondiente
                    $('#'+tipoCargo).siblings('input[type="number"]').val(valorTotal);
                } else {
                    // Puede que quieras establecer esto a 0 o a algún valor de error específico en lugar de texto.
                    $('#'+tipoCargo).siblings('input[type="number"]').val(0);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al obtener costohh:', textStatus, errorThrown);
                $('#'+tipoCargo).siblings('input[type="number"]').val(0); // Asigna 0 o un valor de error específico en caso de error.
            }
        });
    });
});

$(document).ready(function() {
    // Obteniendo referencias a los campos
    const supervisorInput = $('#supervisor');
    const aprInput = $('#apr');
    const m1Input = $('#m1');
    const m2Input = $('#m2');
    const mecanicoInput = $('#mecanico');
    const ayudanteInput = $('#ayudante');
    const totalTrabajadoresInput = $('#totalTrabajadores');
    const duracionServicioInput = $('#duracionServicio');
    const totalHorasInput = $('#totalHoras');

    // Función para calcular total trabajadores
    function calcularTotalTrabajadores() {
        const total = Number(supervisorInput.val()) + 
                      Number(aprInput.val()) + 
                      Number(m1Input.val()) + 
                      Number(m2Input.val()) + 
                      Number(mecanicoInput.val()) + 
                      Number(ayudanteInput.val());
        totalTrabajadoresInput.val(total);
        calcularTotalHoras();  // Aquí se llama a calcularTotalHoras después de actualizar el total de trabajadores
    }

    // Función para calcular total de horas hombre
    function calcularTotalHoras() {
        const totalTrabajadores = Number(totalTrabajadoresInput.val()) || 0;
        const duracionServicio = Number(duracionServicioInput.val()) || 0;
        
        const totalHoras = totalTrabajadores * duracionServicio;
        totalHorasInput.val(totalHoras);
    }

    // Event listeners usando change
    supervisorInput.on('change', calcularTotalTrabajadores);
    aprInput.on('change', calcularTotalTrabajadores);
    m1Input.on('change', calcularTotalTrabajadores);
    m2Input.on('change', calcularTotalTrabajadores);
    mecanicoInput.on('change', calcularTotalTrabajadores);
    ayudanteInput.on('change', calcularTotalTrabajadores);
    duracionServicioInput.on('change', calcularTotalHoras);
});

    
$(document).ready(function() {
    $('input[type="number"]').on('keydown', function(event) {
        const forbiddenKeys = [189, 187, 107, 109]; // incluye códigos de tecla para "-" y "+" en teclado principal y numpad
        if (forbiddenKeys.includes(event.which)) {
            event.preventDefault(); // Evita que se presione la tecla
        }
    }).on('input', function() { // Aún mantiene esta parte en caso de pegar valores con "-" o "+"
        if ($(this).val().includes('-') || $(this).val().includes('+')) {
            $(this).val($(this).val().replace(/[-+]/g, '')); // Elimina cualquier signo "-" o "+"
        }
    });
});

    
$(document).ready(function() {
    const alojamientosInput = $('#alojamientos');
    const alimentacionInput = $('#alimentacion');
    const variosInput = $('#varios');
    const totalLogisticaInput = $('#totalLogistica');

    function actualizarTotalLogistica() {
        const valorAlojamientos = Number(alojamientosInput.val()) || 0;
        const valorAlimentacion = Number(alimentacionInput.val()) || 0;
        const valorVarios = Number(variosInput.val()) || 0;

        const total = (valorAlojamientos + valorAlimentacion + valorVarios);
        totalLogisticaInput.val(total);
        console.log("Actualizado el total:", total); 
    }

    alojamientosInput.on('input', actualizarTotalLogistica);
    alimentacionInput.on('input', actualizarTotalLogistica);
    variosInput.on('input', actualizarTotalLogistica);
});

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
         // Mostrar el popup
         $notification.css('right', '20px');

        // Ocultar el popup después de 3 segundos
        setTimeout(function() {
            $notification.css('bottom', '-100px');
        }, 2500);
    }

    function toggleButtonLoading(button, isLoading, callback = null) {
        if (isLoading) {
            button.addClass('button-loading');
        } else {
            button.removeClass('button-loading');
            if (callback) callback();
        }
    }
    
    
            // Función para calcular el total
    function calcularTotal() {
        let suma = 0;

        // Iteramos sobre cada campo con clase 'valor'
        $(".valor").each(function() {
            let valor = parseFloat($(this).val()); // Convertimos el valor del campo a número
            if (!isNaN(valor)) { // Nos aseguramos que el valor sea un número
                suma += valor;
            }
        });

        // Actualizamos el campo totalManoObra con la suma
        $("#totalManoObra").val(suma);
    }

    $('#calculateButton').on('click', function() {
        const button = $(this);

        toggleButtonLoading(button, true);

        setTimeout(function() {
            calcularTotal(); // Ejecutamos la función calcularTotal cuando termina el spinner
            showNotification("Total de mano de obra calculado!"); // Ejecutamos la función showNotification cuando termina el spinner
            toggleButtonLoading(button, false);
        }, 2000); // Simulamos un retraso de 2 segundos
    });

    function actualizarTotalCombustible() {
        const valorCombustible1 = Number($('#combustible1').val()) || 0;
        const valorCombustible2 = Number($('#combustible2').val()) || 0;
        const valorCombustible3 = Number($('#combustible3').val()) || 0;
        const valorTotalKilometros = Number($('#totalKilometros').val()) || 0;

        const total = (valorCombustible1 + valorCombustible2 + valorCombustible3) * (valorTotalKilometros / 10);
        $('#totalCombustible').val(total);
    }

    function actualizarTotalPeajes() {
        const valorTotalKilometros = Number($('#totalKilometros').val()) || 0;
    
        const totalPeajes = valorTotalKilometros * 54;
        $('#totalPeajes').val(totalPeajes);
    }

    function calcularTotalGeneral() {
        const totalCombustible = Number($('#totalCombustible').val()) || 0;
        const totalPeajes = Number($('#totalPeajes').val()) || 0;
    
        const totalGeneral = totalCombustible + totalPeajes;
    
        // Actualiza el campo totalGastoVehiculo con el total general
        $('#totalGastosVehiculos').val(totalGeneral);
    }        

    $('#actualizarTotalBtn').on('click', function() {
        const button = $(this);

        toggleButtonLoading(button, true);

        setTimeout(function() {
            actualizarTotalCombustible();  // Ahora, se ejecuta la función para calcular el combustible
            actualizarTotalPeajes();
            calcularTotalGeneral();
            showNotification("Gastos vehiculos calculado con éxito!");
            toggleButtonLoading(button, false);
        }, 2000); 
    });

    let bonos = [];

    function obtenerBonos() {
        $.get('../funciones/getBonos.php', function(data) {
            bonos = data;
        });
    }

    function aplicarBono() {
        let bonoSeleccionado = $('#bono').val();
    
        $('.input-group').each(function() {
            let $this = $(this);
            let cantidadTrabajadores = parseFloat($this.find('input:first-child').val());
    
            // Si la cantidad de trabajadores es 0, establece el valor en 0 y continúa con la próxima iteración
            if (cantidadTrabajadores === 0) {
                $this.find('.valor').val(0);
                return true; // equivalente a 'continue' en un bucle normal
            }
    
            let cargoLabel = $this.prev('label').text().replace(':', '').trim();
            let bonoValue = 0;
    
            for (let i = 0; i < bonos.length; i++) {
                if (bonos[i].cargo.toLowerCase() === cargoLabel.toLowerCase()) {
                    bonoValue = parseFloat(bonos[i][bonoSeleccionado]);
                    break;
                }
            }
    
            let originalValue = parseFloat($this.find('.valor').data('original') || $this.find('.valor').val());
    
            $this.find('.valor').data('original', originalValue);
            let totalBonoPorTrabajador = bonoValue * cantidadTrabajadores;
            let nuevoValor = originalValue + totalBonoPorTrabajador;
    
            $this.find('.valor').val(nuevoValor.toFixed(2));
        });
        $("#totalManoObra").val(0); 
        $('#applyBonoButton').prop('disabled', true);
        $('#removeBonoButton').prop('disabled', false);
    
        // Deshabilita todos los campos de "cantidad cargo"
        $('.input-group input:first-child').prop('disabled', true);
    }
    

    function inicializar() {
        obtenerBonos();
        $('#removeBonoButton').prop('disabled', true);
    }

    // Event listener para "applyBonoButton"
    $('#applyBonoButton').on('click', function() {
        const button = $(this);
    
        toggleButtonLoading(button, true);
    
        setTimeout(function() {
            aplicarBono(); // Aplicamos el bono
            showNotification("Bono aplicado con éxito!"); // Mostramos la notificación
            toggleButtonLoading(button, false); // Ocultamos el spinner
        }, 800);
    });

    // Llamada a la función de inicialización
    inicializar();
    
    function removerBono() {
        $('.input-group').each(function() {
            let $this = $(this);
            
            // Establecer todos los campos de valores a 0
            $this.find('.valor').val(0);
            $this.find('.cargo').val(0);
        });
    
        // Establecer el total de mano de obra a 0
        $("#totalManoObra").val(0);
        $("#totalTrabajadores").val(0);
        $("#totalHoras").val(0);
        $('.input-group input:first-child').prop('disabled', false);
        // Deshabilita el botón "remove" y habilita el botón "apply"
        $('#removeBonoButton').prop('disabled', true);
        $('#applyBonoButton').prop('disabled', false);
    }
    

     // Event listener para "removeBonoButton"
    $('#removeBonoButton').on('click', function() {
        const button = $(this);
    
        toggleButtonLoading(button, true);
    
        setTimeout(function() {
            removerBono(); // Llamamos a la función para remover el bono
            showNotification("Bono removido con éxito!");
            toggleButtonLoading(button, false);
        }, 800);
    });

    // Llamada a la función de inicialización
    inicializar();

});

$(document).ready(function() {
    // Obtener vehículos
    $.ajax({
        url: '../funciones/getVehiculos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            for (let selectIndex = 1; selectIndex <= 3; selectIndex++) {
                let $currentSelect = $("#vehiculo" + selectIndex);
                let $currentCombustible = $("#combustible" + selectIndex);
    
                $currentSelect.empty();
                $currentSelect.append($('<option>', {
                    value: 'NO',
                    text: '- Selecciona vehículo -'
                }));
    
                data.forEach(vehiculo => {
                    if (vehiculo.nombre && vehiculo.id) {
                        let option = $("<option>")
                            .text(vehiculo.nombre)
                            .val(vehiculo.id)
                            .data('preciocombustible', vehiculo.preciocombustible);
                        $currentSelect.append(option);
                    }
                });
                

                $currentSelect.on('change', function() {
                    let selectedOption = $(this).find('option:selected');
                    let preciocombustible = selectedOption.data('preciocombustible') || 0;
                    $currentCombustible.val(preciocombustible);
    
                });
    
                $currentSelect.select2({
                    placeholder: "- Selecciona vehículo -",
                    allowClear: true
                });
            }
        },
        error: function(error) {
            console.error("Error al obtener los vehículos.", error);
        }
    });
    

    // Obtener insumos
    $.ajax({
        url: '../funciones/getInsumos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            for (let selectIndex = 1; selectIndex <= 9; selectIndex++) {
                let $currentSelect = $("#insumo" + selectIndex);
                let $currentPrecio = $("#precio" + selectIndex);

                $currentSelect.empty();
                $currentSelect.append($('<option>', {
                    value: 'NO',
                    text: '- Selecciona insumo -'
                }));

                data.forEach(insumo => {
                    if (insumo.nombre && insumo.id) {
                        let option = $("<option>")
                            .text(insumo.nombre)
                            .val(insumo.id)
                            .data('precio', insumo.precio);
                        $currentSelect.append(option);
                    }
                });

                $currentSelect.on('change', function() {
                    let selectedOption = $(this).find('option:selected');
                    let precio = selectedOption.data('precio') || 0;
                    $currentPrecio.val(precio);
                });

                $currentSelect.select2({
                    placeholder: "- Selecciona insumo -",
                    allowClear: true
                });
            }
        },
        error: function(error) {
            console.error("Error al obtener los insumos.", error);
        }
    }); 

    // Agregar el evento 'input' a los campos de cantidad
    $('[id^=cantidad]').on('input', function() {
        calcularTotal();
    });

    // Agregar evento de cambio al campo de selección 'insumo'
    $('[id^=insumo]').on('change', function() {
        let selectedOption = $(this).find('option:selected');
        let optionValue = selectedOption.val();

        if (optionValue === 'NO') {
            limpiarCampos($(this).attr('id').replace('insumo', ''));
        }
    });

    // Agregar evento a la función "remove all items" de Select2
    $('[id^=insumo]').on('select2:unselecting', function(e) {
        let selectedOption = $(this).find('option:selected');
        let optionValue = selectedOption.val();
        let index = $(this).attr('id').replace('insumo', '');

        if (optionValue !== 'NO') {
            limpiarCampos(index);
        }
    });

    // Función para limpiar los campos de cantidad y precio
    function limpiarCampos(index) {
        $('#cantidad' + index).val('');
        $('#precio' + index).val('');
        calcularTotal();
    }

    // Función para calcular el total de gastos en insumos
    function calcularTotal() {
        let total = 0;

        for (let i = 1; i <= 9; i++) {
            let cantidad = parseFloat($('#cantidad' + i).val()) || 0;
            let precio = parseFloat($('#precio' + i).val()) || 0;

            total += cantidad * precio;
        }

        $('#totalGastosInsumos').val(total.toFixed(2));
    }

    // Agregar eventos de cambio a los campos de trabajadores
    $('[id^=supervisor], [id^=apr], [id^=m1], [id^=m2], [id^=mecanico], [id^=ayudante]').on('change', function() {
        calcularTotalTrabajadores();
    });

    // Función para calcular el total de trabajadores
    function calcularTotalTrabajadores() {
        let totalTrabajadores = 0;

        totalTrabajadores += parseFloat($('#supervisor').val()) || 0;
        totalTrabajadores += parseFloat($('#apr').val()) || 0;
        totalTrabajadores += parseFloat($('#m1').val()) || 0;
        totalTrabajadores += parseFloat($('#m2').val()) || 0;
        totalTrabajadores += parseFloat($('#mecanico').val()) || 0;
        totalTrabajadores += parseFloat($('#ayudante').val()) || 0;

        $('#totalTrabajadores').val(totalTrabajadores);
    }
    
    
});

$(document).ready(function() {

    function actualizarCostoTotal() {
        let sumaTotal = 0;
        
        // Recorremos cada input con la clase "subTotal"
        $('.subTotal').each(function() {
            // Sumamos su valor al total, usando "|| 0" por si el valor es NaN
            sumaTotal += Number($(this).val()) || 0;
        });

        // Establecemos el valor calculado en el input "costoTotal"
        $('#costoTotal').val(sumaTotal);
    }

    // Asignamos el evento "change" a todos los inputs con la clase "subTotal"
    $('.subTotal').on('change', function() {
        actualizarCostoTotal();
    });

    // Llamamos a la función inicialmente por si hay valores preestablecidos en los inputs
    actualizarCostoTotal();

});
