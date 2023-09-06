<?php
header('Content-Type: application/json');

include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['numOP']) && $_POST['numOP'] != '' && $_POST['numOP'] != '0') {
        
        $fields = [
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
        
        $params = [];
        foreach ($fields as $field) {
            $params[] = $_POST[$field] ?? null;
        }

        $placeholders = rtrim(str_repeat('?, ', count($fields)), ', ');
        
        $stmt = $conn->prepare("INSERT INTO ingreso (" . implode(', ', $fields) . ") VALUES ($placeholders)");

        if($stmt->execute($params)) {
            $response["success"] = "Ingreso registrado exitosamente.";
        } else {
            $response["error"] = "Error al registrar el ingreso: " . implode(" - ", $stmt->errorInfo());
        }
    } else {
        $response["error"] = "El número de OP no puede ser nulo o 0.";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>
