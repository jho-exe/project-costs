<?php
include '../../includes/db_connection.php';

$response = array();
date_default_timezone_set('America/Santiago');

try {
    if(isset($_POST['numOP'])) {
        // Asignación de todas las variables POST a variables locales
        $modificarId = $_POST['modificarId'];
        $numOP = $_POST['numOP'];
        $fechaInicio = $_POST['fechaInicio'];
        $fechaTermino = $_POST['fechaTermino'];
        $numVenta = $_POST['numVenta'];
        $rutEmpresa = $_POST['rutEmpresa'];
        $nombreEmpresa = $_POST['nombreEmpresa'];
        $servicio = $_POST['servicio'];
        $bono = $_POST['bono'];
        $supervisor = $_POST['supervisor'];
        $valorSupervisor = $_POST['valorSupervisor'];
        $apr = $_POST['apr'];
        $valorApr = $_POST['valorApr'];
        $m1 = $_POST['m1'];
        $valorM1 = $_POST['valorM1'];
        $m2 = $_POST['m2'];
        $valorM2 = $_POST['valorM2'];
        $mecanico = $_POST['mecanico'];
        $valorMecanico = $_POST['valorMecanico'];
        $ayudante = $_POST['ayudante'];
        $valorAyudante = $_POST['valorAyudante'];
        $totalTrabajadores = $_POST['totalTrabajadores'];
        $totalManoObra = $_POST['totalManoObra'];
        $tallerTerreno = $_POST['tallerTerreno'];
        $duracionServicio = $_POST['duracionServicio'];
        $totalHoras = $_POST['totalHoras'];
        $vehiculo1 = $_POST['vehiculo1'];
        $combustible1 = $_POST['combustible1'];
        $vehiculo2 = $_POST['vehiculo2'];
        $combustible2 = $_POST['combustible2'];
        $vehiculo3 = $_POST['vehiculo3'];
        $combustible3 = $_POST['combustible3'];
        $totalKilometros = $_POST['totalKilometros'];
        $totalPeajes = $_POST['totalPeajes'];
        $totalCombustible = $_POST['totalCombustible'];
        $totalGastosVehiculos = $_POST['totalGastosVehiculos'];
        $observaciones = $_POST['observaciones'];
        $insumo1 = $_POST['insumo1'];
        $precio1 = $_POST['precio1'];
        $cantidad1 = $_POST['cantidad1'];
        $insumo2 = $_POST['insumo2'];
        $precio2 = $_POST['precio2'];
        $cantidad2 = $_POST['cantidad2'];
        $insumo3 = $_POST['insumo3'];
        $precio3 = $_POST['precio3'];
        $cantidad3 = $_POST['cantidad3'];
        $insumo4 = $_POST['insumo4'];
        $precio4 = $_POST['precio4'];
        $cantidad4 = $_POST['cantidad4'];
        $insumo5 = $_POST['insumo5'];
        $precio5 = $_POST['precio5'];
        $cantidad5 = $_POST['cantidad5'];
        $insumo6 = $_POST['insumo6'];
        $precio6 = $_POST['precio6'];
        $cantidad6 = $_POST['cantidad6'];
        $insumo7 = $_POST['insumo7'];
        $precio7 = $_POST['precio7'];
        $cantidad7 = $_POST['cantidad7'];
        $insumo8 = $_POST['insumo8'];
        $precio8 = $_POST['precio8'];
        $cantidad8 = $_POST['cantidad8'];
        $insumo9 = $_POST['insumo9'];
        $precio9 = $_POST['precio9'];
        $cantidad9 = $_POST['cantidad9'];
        $totalGastosInsumos = $_POST['totalGastosInsumos'];
        $alojamientos = $_POST['alojamientos'];
        $alimentacion = $_POST['alimentacion'];
        $varios = $_POST['varios'];
        $totalLogistica = $_POST['totalLogistica'];
        $costoTotal = $_POST['costoTotal'];
        $fecha_modificacion = date('Y-m-d H:i:s');
        $fecha_eliminacion = $_POST['fecha_eliminacion'];


        $stmt = $conn->prepare("UPDATE ingreso SET 
            numOP = ?, 
            fechaInicio = ?, 
            fechaTermino = ?, 
            numVenta = ?, 
            rutEmpresa = ?, 
            nombreEmpresa = ?, 
            servicio = ?, 
            bono = ?, 
            supervisor = ?, 
            valorSupervisor = ?, 
            apr = ?, 
            valorApr = ?, 
            m1 = ?, 
            valorM1 = ?, 
            m2 = ?, 
            valorM2 = ?, 
            mecanico = ?, 
            valorMecanico = ?, 
            ayudante = ?, 
            valorAyudante = ?, 
            totalTrabajadores = ?, 
            totalManoObra = ?, 
            tallerTerreno = ?, 
            duracionServicio = ?, 
            totalHoras = ?, 
            vehiculo1 = ?, 
            combustible1 = ?, 
            vehiculo2 = ?, 
            combustible2 = ?, 
            vehiculo3 = ?, 
            combustible3 = ?, 
            totalKilometros = ?, 
            totalPeajes = ?, 
            totalCombustible = ?, 
            totalGastosVehiculos = ?, 
            observaciones = ?, 
            insumo1 = ?, 
            precio1 = ?, 
            cantidad1 = ?, 
            insumo2 = ?, 
            precio2 = ?, 
            cantidad2 = ?, 
            insumo3 = ?, 
            precio3 = ?, 
            cantidad3 = ?, 
            insumo4 = ?, 
            precio4 = ?, 
            cantidad4 = ?, 
            insumo5 = ?, 
            precio5 = ?, 
            cantidad5 = ?, 
            insumo6 = ?, 
            precio6 = ?, 
            cantidad6 = ?, 
            insumo7 = ?, 
            precio7 = ?, 
            cantidad7 = ?, 
            insumo8 = ?, 
            precio8 = ?, 
            cantidad8 = ?, 
            insumo9 = ?, 
            precio9 = ?, 
            cantidad9 = ?, 
            totalGastosInsumos = ?, 
            alojamientos = ?, 
            alimentacion = ?, 
            varios = ?, 
            totalLogistica = ?, 
            costoTotal = ?, 
            fecha_modificacion = ?, 
            fecha_eliminacion = ? 
            WHERE id = ?");

            $stmt->bindParam(1, $numOP);
            $stmt->bindParam(2, $fechaInicio);
            $stmt->bindParam(3, $fechaTermino);
            $stmt->bindParam(4, $numVenta);
            $stmt->bindParam(5, $rutEmpresa);
            $stmt->bindParam(6, $nombreEmpresa);
            $stmt->bindParam(7, $servicio);
            $stmt->bindParam(8, $bono);
            $stmt->bindParam(9, $supervisor);
            $stmt->bindParam(10, $valorSupervisor);
            $stmt->bindParam(11, $apr);
            $stmt->bindParam(12, $valorApr);
            $stmt->bindParam(13, $m1);
            $stmt->bindParam(14, $valorM1);
            $stmt->bindParam(15, $m2);
            $stmt->bindParam(16, $valorM2);
            $stmt->bindParam(17, $mecanico);
            $stmt->bindParam(18, $valorMecanico);
            $stmt->bindParam(19, $ayudante);
            $stmt->bindParam(20, $valorAyudante);
            $stmt->bindParam(21, $totalTrabajadores);
            $stmt->bindParam(22, $totalManoObra);
            $stmt->bindParam(23, $tallerTerreno);
            $stmt->bindParam(24, $duracionServicio);
            $stmt->bindParam(25, $totalHoras);
            $stmt->bindParam(26, $vehiculo1);
            $stmt->bindParam(27, $combustible1);
            $stmt->bindParam(28, $vehiculo2);
            $stmt->bindParam(29, $combustible2);
            $stmt->bindParam(30, $vehiculo3);
            $stmt->bindParam(31, $combustible3);
            $stmt->bindParam(32, $totalKilometros);
            $stmt->bindParam(33, $totalPeajes);
            $stmt->bindParam(34, $totalCombustible);
            $stmt->bindParam(35, $totalGastosVehiculos);
            $stmt->bindParam(36, $observaciones);
            $stmt->bindParam(37, $insumo1);
            $stmt->bindParam(38, $precio1);
            $stmt->bindParam(39, $cantidad1);
            $stmt->bindParam(40, $insumo2);
            $stmt->bindParam(41, $precio2);
            $stmt->bindParam(42, $cantidad2);
            $stmt->bindParam(43, $insumo3);
            $stmt->bindParam(44, $precio3);
            $stmt->bindParam(45, $cantidad3);
            $stmt->bindParam(46, $insumo4);
            $stmt->bindParam(47, $precio4);
            $stmt->bindParam(48, $cantidad4);
            $stmt->bindParam(49, $insumo5);
            $stmt->bindParam(50, $precio5);
            $stmt->bindParam(51, $cantidad5);
            $stmt->bindParam(52, $insumo6);
            $stmt->bindParam(53, $precio6);
            $stmt->bindParam(54, $cantidad6);
            $stmt->bindParam(55, $insumo7);
            $stmt->bindParam(56, $precio7);
            $stmt->bindParam(57, $cantidad7);
            $stmt->bindParam(58, $insumo8);
            $stmt->bindParam(59, $precio8);
            $stmt->bindParam(60, $cantidad8);
            $stmt->bindParam(61, $insumo9);
            $stmt->bindParam(62, $precio9);
            $stmt->bindParam(63, $cantidad9);
            $stmt->bindParam(64, $totalGastosInsumos);
            $stmt->bindParam(65, $alojamientos);
            $stmt->bindParam(66, $alimentacion);
            $stmt->bindParam(67, $varios);
            $stmt->bindParam(68, $totalLogistica);
            $stmt->bindParam(69, $costoTotal);
            $stmt->bindParam(70, $fecha_modificacion);
            $stmt->bindParam(71, $fecha_eliminacion);
            $stmt->bindParam(72, $modificarId);


            $response = array(
                "success" => false,
                "message" => "Error al actualizar el ingreso."
            );

        if($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Ingreso actualizado exitosamente.";
        } else {
            $response["success"] = false;
            $response["message"] = "Error al actualizar el ingreso: " . $stmt->errorInfo()[2];
        }
    } else {
    $response["success"] = false;
    $response["message"] = "Información incompleta.";
    }
} catch(PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>
