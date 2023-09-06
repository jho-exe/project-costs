<?php
include '../../includes/db_connection.php';

$response = array();

try {
    $stmt = $conn->prepare("SELECT * FROM vehiculos WHERE estado = 'Activo'");
    if ($stmt->execute()) {
        $vehiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response['success'] = true;
        $response['vehiculos'] = $vehiculos;
    } else {
        $response['success'] = false;
        $response['message'] = "Error al obtener los vehículos.";
    }
} catch (PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
