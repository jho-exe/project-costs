function cargarVehiculos() {
    $.getJSON("../funciones/modificar/getVehiculos.php", function(response) {
        if (response.data) {
            var vehiculos = response.data.vehiculos;
            
            vehiculos.forEach(function(vehiculo) {
                var option = new Option(vehiculo.nombre, vehiculo.nombre); // Cambiado vehiculo.id por vehiculo.nombre
                $('#vehiculo1').append(option);
                $('#vehiculo2').append(option.clone());
                $('#vehiculo3').append(option.clone());
            });

        } else {
            console.error(response.error);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
    });
}

function cargarInsumos() {
    $.getJSON("../funciones/modificar/getInsumos.php", function(response) {
        if (response.data) {
            var insumos = response.data.insumos;

            insumos.forEach(function(insumo) {
                    var option = new Option(insumo.nombre, insumo.nombre);
                    $('#insumo1').append(option);
                    $('#insumo2').append(option.clone());
                    $('#insumo3').append(option.clone());
                    $('#insumo4').append(option.clone());
                    $('#insumo5').append(option.clone());
                    $('#insumo6').append(option.clone());
                    $('#insumo7').append(option.clone());
                    $('#insumo8').append(option.clone());
                    $('#insumo9').append(option.clone());
            });
        } else {
            console.error(response.error);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
    });
}



$(document).ready(function() {
    $("#debugg").click(function() {
        const campos = [
            'id', 'numOP', 'fechaInicio', 'fechaTermino', 'numVenta', 'rutEmpresa', 'nombreEmpresa',
            'servicio', 'bono', 'supervisor', 'valorSupervisor', 'apr', 'valorApr', 'm1', 'valorM1',
            'm2', 'valorM2', 'mecanico', 'valorMecanico', 'ayudante', 'valorAyudante', 'totalTrabajadores',
            'totalManoObra', 'tallerTerreno', 'duracionServicio', 'totalHoras', 'vehiculo1', 'combustible1',
            'vehiculo2', 'combustible2', 'vehiculo3', 'combustible3', 'totalKilometros', 'totalPeajes',
            'totalCombustible', 'totalGastosVehiculos', 'observaciones', 'insumo1', 'precio1', 'cantidad1', 'insumo2', 'precio2',
            'cantidad2', 'insumo3', 'precio3', 'cantidad3', 'insumo4', 'precio4', 'cantidad4', 'insumo5', 'precio5',
            'cantidad5', 'insumo6', 'precio6', 'cantidad6', 'insumo7', 'precio7', 'cantidad7', 'insumo8', 'precio8',
            'cantidad8', 'insumo9', 'precio9', 'cantidad9', 'totalGastosInsumos', 'alojamientos', 'alimentacion',
            'varios', 'totalLogistica','fecha_modificacion', 'fecha_eliminacion', 'costoTotal'
        ];
    
        campos.forEach(campo => {
            console.log(`${campo}: `, $("#" + campo).val());
        });
    });
    
    cargarVehiculos();
    cargarInsumos();
    $('.searchOP').on('click', function() {
        var numOP = $('input[placeholder="Ingresar número de OP"]').val();
        if (numOP) {
            $.getJSON("../funciones/modificar/getIngresoMod.php", { numOP: numOP }, function(response) {
                if (response.data) {
                    $('#modificarId').val(response.data.id);
                    $('#numOP').val(response.data.numOP);
                    $('#fechaInicio').val(response.data.fechaInicio);
                    $('#fechaTermino').val(response.data.fechaTermino);
                    $('#numVenta').val(response.data.numVenta);
                    $('#rutEmpresa').val(response.data.rutEmpresa);
                    $('#nombreEmpresa').val(response.data.nombreEmpresa);
                    $('#servicio').val(response.data.servicio);
                    
                    // Validación para el campo 'bono'
                    var bonoValue = response.data.bono;
                    if (!bonoValue) {
                        bonoValue = "No_bono";
                        $('#applyBonoButton').prop('disabled', true);
                        $('#removeBonoButton').prop('disabled', true);
                    } else {
                        $('#applyBonoButton').prop('disabled', true);
                        // Si el bonoValue es distinto de "No_bono", deshabilitar el botón #removeBonoButton
                        $('#removeBonoButton').prop('disabled', false);
                    }
                    $('#bono').val(bonoValue); 
                    $('#supervisor').val(response.data.supervisor);
                    $('#valorSupervisor').val(response.data.valorSupervisor);
                    $('#apr').val(response.data.apr);
                    $('#valorApr').val(response.data.valorApr);
                    $('#m1').val(response.data.m1);
                    $('#valorM1').val(response.data.valorM1);
                    $('#m2').val(response.data.m2);
                    $('#valorM2').val(response.data.valorM2);
                    $('#mecanico').val(response.data.mecanico);
                    $('#valorMecanico').val(response.data.valorMecanico);
                    $('#ayudante').val(response.data.ayudante);
                    $('#valorAyudante').val(response.data.valorAyudante);
                    $('#totalTrabajadores').val(response.data.totalTrabajadores);
                    $('#totalManoObra').val(response.data.totalManoObra);
                    $('#tallerTerreno').val(response.data.tallerTerreno);  // Asumiendo que el valor por defecto es "Taller"
                    $('#duracionServicio').val(response.data.duracionServicio);
                    $('#totalHoras').val(response.data.totalHoras);
                    // Nuevos campos
                    $('#vehiculo1').val(response.data.vehiculo1).trigger('change'); // Cambiado vehiculo1Id por vehiculo1
                    $('#vehiculo2').val(response.data.vehiculo2).trigger('change'); // Cambiado vehiculo2Id por vehiculo2
                    $('#vehiculo3').val(response.data.vehiculo3).trigger('change'); // Cambiado vehiculo3Id por vehiculo3
                    
                    $('#combustible1').val(response.data.combustible1);
                    $('#combustible2').val(response.data.combustible2);
                    $('#combustible3').val(response.data.combustible3);
                    $('#totalKilometros').val(response.data.totalKilometros);
                    $('#totalPeajes').val(response.data.totalPeajes);
                    $('#totalCombustible').val(response.data.totalCombustible);
                    $('#totalGastosVehiculos').val(response.data.totalGastosVehiculos);
                    $('#observaciones').val(response.data.observaciones);
                    
                    $('#insumo1').val(response.data.insumo1).trigger('change');
                    $('#insumo2').val(response.data.insumo2).trigger('change');
                    $('#insumo3').val(response.data.insumo3).trigger('change'); 
                    $('#insumo4').val(response.data.insumo4).trigger('change'); 
                    $('#insumo5').val(response.data.insumo5).trigger('change'); 
                    $('#insumo6').val(response.data.insumo6).trigger('change'); 
                    $('#insumo7').val(response.data.insumo7).trigger('change');
                    $('#insumo8').val(response.data.insumo8).trigger('change');
                    $('#insumo9').val(response.data.insumo9).trigger('change');

                    $('#precio1').val(response.data.precio1);
                    $('#precio2').val(response.data.precio2);
                    $('#precio3').val(response.data.precio3);
                    $('#precio4').val(response.data.precio4);
                    $('#precio5').val(response.data.precio5);
                    $('#precio6').val(response.data.precio6);
                    $('#precio7').val(response.data.precio7);
                    $('#precio8').val(response.data.precio8);
                    $('#precio9').val(response.data.precio9);

                    // Continuar con los demás campos...
                    $('#cantidad1').val(response.data.cantidad1);
                    $('#cantidad2').val(response.data.cantidad2);
                    $('#cantidad3').val(response.data.cantidad3);
                    $('#cantidad4').val(response.data.cantidad4);
                    $('#cantidad5').val(response.data.cantidad5);
                    $('#cantidad6').val(response.data.cantidad6);
                    $('#cantidad7').val(response.data.cantidad7);
                    $('#cantidad8').val(response.data.cantidad8);
                    $('#cantidad9').val(response.data.cantidad9);

                    $('#totalGastosInsumos').val(response.data.totalGastosInsumos);

                                    // Añadiendo los nuevos campos aquí
                    $('#alojamientos').val(response.data.alojamientos);
                    $('#alimentacion').val(response.data.alimentacion);
                    $('#varios').val(response.data.varios);
                    $('#totalLogistica').val(response.data.totalLogistica);

                    $('#costoTotal').val(response.data.costoTotal);
                    alert("Número de OP encontrado exitosamente!");
                } else {
                    alert("Número de OP no encontrado.");
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
            });
        } else {
            console.error("Por favor, ingresa un número de OP.");
        }
    });

    $("#modificarForm").submit(function(event) {
        event.preventDefault();
        $("#numOp, #cantidad1, #cantidad2, #cantidad3, #cantidad4, #cantidad5, #cantidad6, #cantidad7, #cantidad8, #cantidad9, #supervisor, #apr, #m1, #m2, #mecanico, #ayudante, #bono").prop('disabled', false);

        var numOP = $("#numOP").val(); 
        console.log("Valor cantidad4: ", $("#cantidad4").val());
        console.log("Valor cantidad9: ", $("#cantidad9").val());
        // Habilita los campos antes de serializar el formulario

        console.log("Número de OP antes de enviar: ", numOP);
    
        if (numOP && numOP !== "") {
            var formData = $(this).serialize();
            formData += "&numOP=" + numOP;
    
            console.log("Datos del formulario: ", formData);
            $.post("../funciones/modificar/updateIngresoMod.php", formData)
            .done(function(data) {
                console.log(data);
                try {
                    if (data.startsWith('<')) {
                        throw new Error('Respuesta no válida del servidor');
                    }
            
                    var jsonData = JSON.parse(data);
            
                    if(jsonData.success) {
                        alert("Registro modificado exitosamente!");
                        location.reload();
                    } else {
                        alert(jsonData.message || "Error al actualizar el ingreso.");
                    }
                } catch (e) {
                    console.error("Error al parsear la respuesta:", e);
                    alert("Ocurrió un error inesperado.");
                }
            })
            
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("Error al comunicarse con el servidor: " + errorThrown);
            });
        } else {
            alert("El número de operación no puede estar vacío."); 
        }
    });
    
    
});


$(document).ready(function() {
    // Obtener empresa
    $("#rutEmpresa").blur(function() {
        var rut = $(this).val();

        $.post('../funciones/ingresar/getEmpresa.php', { rut: rut }, function(data) {
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
            url: '../funciones/ingresar/getCosto.php', // Ruta a tu archivo PHP
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

document.addEventListener('DOMContentLoaded', () => {
    let idsDeCampos = [
        'totalManoObra', 
        'totalGastosVehiculos', 
        'totalGastosInsumos', 
        'totalLogistica'
    ];

    setInterval(calcularTotal, 1000); // Esto hará que la función se ejecute cada 1 segundo

    idsDeCampos.forEach(id => {
        let campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('input', calcularTotal);
        } else {
            console.error('No se encontró el campo con ID "' + id + '"');
        }
    });
    
    calcularTotal(); // Esto hará que la función se ejecute también al cargar la página
});

document.addEventListener('DOMContentLoaded', () => {

    setInterval(calcularTotalLog, 1000); // Esto hará que la función se ejecute cada 1 segundo
    
    calcularTotalLog(); // Esto hará que la función se ejecute también al cargar la página
});

function calcularTotal() {
    let idsDeCampos = [
        'totalManoObra', 
        'totalGastosVehiculos', 
        'totalGastosInsumos', 
        'totalLogistica'
    ];
    let sum = 0;

    idsDeCampos.forEach(id => {
        let campo = document.getElementById(id);
        if (campo) {
            let valor = parseFloat(campo.value);
            if (!isNaN(valor)) {
                sum += valor;
            }
        } else {
            console.error('No se encontró el campo con ID "' + id + '"');
        }
    });

    let campoCostoTotal = document.getElementById('costoTotal');
    if (campoCostoTotal) {
        campoCostoTotal.value = sum; // establece el valor de costototal al total calculado
    } else {
        console.error('No se encontró el campo con ID "costototal"');
    }
}

function calcularTotalLog() {
    let total = 0;

    for (let i = 1; i <= 9; i++) {
        let cantidad = parseFloat($('#cantidad' + i).val()) || 0;
        let precio = parseFloat($('#precio' + i).val()) || 0;

        total += cantidad * precio;
    }

    $('#totalGastosInsumos').val(total);
}
    
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
    let seleccionarBono = [];

    function obtenerBonos() {
        $.get('../funciones/ingresar/getBonos.php', function(data) {
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
            // Comprueba si el data-original existe antes de sobrescribirlo, para preservar el valor original
            if ($this.find('.valor').data('original') === undefined) {
                $this.find('.valor').data('original', parseFloat($this.find('.valor').val()));
            }
            let originalValue = parseFloat($this.find('.valor').data('original'));
    
            let totalBonoPorTrabajador = bonoValue * cantidadTrabajadores;
            let nuevoValor = originalValue + totalBonoPorTrabajador;
    
            $this.find('.valor').val(nuevoValor.toFixed(2));
        });
        $("#totalManoObra").val(0); 
        $('#applyBonoButton').prop('disabled', true);
        $('#removeBonoButton').prop('disabled', false);
        // Deshabilita todos los campos de "cantidad cargo"
        $('.input-group input:first-child').prop('disabled', true);
        seleccionarBono = true;
    }
    function inicializar() {
        obtenerBonos();
        $('#removeBonoButton').prop('disabled', true);
        
        // Añadiendo listener para el select field
        $('#bono').on('change', function() {
            verificarBonoSeleccionado();
        });

        verificarBonoSeleccionado();
    }
    function verificarBonoSeleccionado() {
        let bonoSeleccionado = $('#bono').val();
        
        if (bonoSeleccionado === 'No_bono') {
            $('#applyBonoButton').prop('disabled', true);
            $('#removeBonoButton').prop('disabled', true);
        } else {
            $('#applyBonoButton').prop('disabled', false);
            $('#removeBonoButton').prop('disabled', true);
        }
    }
    // Event listener para "applyBonoButton"
    $('#applyBonoButton').on('click', function() {
        const button = $(this);
    
        toggleButtonLoading(button, true);
    
        setTimeout(function() {
            aplicarBono(); // Aplicamos el bono
            showNotification("Bono aplicado con éxito!"); // Mostramos la notificación
            toggleSelect();
            toggleButtonLoading(button, false); // Ocultamos el spinner
        }, 800);
    });
    // Llamada a la función de inicialización
    inicializar();
    
    function removerBono() {
        $('.input-group').each(function() {
            let $this = $(this);
            // Restablecer los campos de valores a su valor original si está disponible, de lo contrario a 0
            let originalValue = $this.find('.valor').data('original');
            if (originalValue !== undefined) {
                $this.find('.valor').val(originalValue);
            } else {
                $this.find('.valor').val(0);
            }
            // Eliminar la data original para que pueda ser establecida nuevamente al aplicar un nuevo bono
            $this.find('.valor').removeData('original');
        });
        // Establecer el total de mano de obra a 0
        $("#totalManoObra").val(0);
        $("#valorSupervisor").val(0);
        $("#valorApr").val(0);
        $("#valorM1").val(0);
        $("#valorM2").val(0);
        $("#valorMecanico").val(0);
        $("#valorAyudante").val(0);
        $("#supervisor").val(0);
        $("#apr").val(0);
        $("#m1").val(0);
        $("#m2").val(0);
        $("#mecanico").val(0);
        $("#ayudante").val(0);
        // $("#totalTrabajadores").val(0);
        // $("#totalHoras").val(0);
        $('.input-group input:first-child').prop('disabled', false);
        // Deshabilita el botón "remove" y habilita el botón "apply"
        $('#removeBonoButton').prop('disabled', true);
        $('#applyBonoButton').prop('disabled', false);
        seleccionarBono = false;
    }
     // Event listener para "removeBonoButton"
    $('#removeBonoButton').on('click', function() {
        const button = $(this);

        toggleButtonLoading(button, true);
        setTimeout(function() {
            removerBono(); // Llamamos a la función para remover el bono
            showNotification("Bono removido con éxito!");
            toggleSelect();
            toggleButtonLoading(button, false);
        }, 800);
    });

    function toggleSelect() {
        if(seleccionarBono) {
            $('#bono').attr('disabled', 'disabled');
        } else {
            $('#bono').removeAttr('disabled');
        }
    }
    // Llamada a la función de inicialización
    inicializar();
});

$(document).ready(function() {
    // Obtener vehículos
    $.ajax({
        url: '../funciones/modificar/getVehiculos.php',
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
                            .val(vehiculo.nombre)
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
        url: '../funciones/modificar/getInsumos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            for (let selectIndex = 1; selectIndex <= 9; selectIndex++) {
                let $currentSelect = $("#insumo" + selectIndex);
                let $currentPrecio = $("#precio" + selectIndex);

                $currentSelect.empty();
                $currentSelect.append($('<option>', {
                    value: 'NO',
                    text: 'NO'
                }));

                data.forEach(insumo => {
                    if (insumo.nombre && insumo.id) {
                        let option = $("<option>")
                            .text(insumo.nombre)
                            .val(insumo.nombre)
                            .data('precio', insumo.precio);
                        $currentSelect.append(option);
                    }
                });

                $currentSelect.on('change', function() {
                    let selectedOption = $(this).find('option:selected');
                    let precio = selectedOption.data('precio') || 0;
                    $currentPrecio.val(precio);
                });

                $currentSelect.on('select2:clear', function() {
                    $(this).val('NO').trigger('change');
                });

                $currentSelect.select2({
                    placeholder: "NO",
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

        $('#totalGastosInsumos').val(total);
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


