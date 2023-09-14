<?php
header('Content-Type: application/json');

include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['nombre']) && isset($_POST['descripcion']) && isset($_POST['preciocombustible'])) {
        
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $preciocombustible = $_POST['preciocombustible'];

        // Prepared statements con PDO
        $stmt = $conn->prepare("INSERT INTO vehiculos (nombre, descripcion, preciocombustible) VALUES (?, ?, ?)");
        
        $stmt->bindParam(1, $nombre);
        $stmt->bindParam(2, $descripcion);
        $stmt->bindParam(3, $preciocombustible);

        if($stmt->execute()) {
            $response["success"] = "Vehículo registrado exitosamente.";
        } else {
            $response["error"] = "Error al registrar el vehículo: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["error"] = "Información del vehículo no proporcionada completa.";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerrar conexión PDO (opcional)
$conn = null;
?>
