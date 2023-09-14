<?php
include '../../includes/db_connection.php';

$response = array();

try {
    $stmt = $conn->prepare("SELECT * FROM cargos WHERE estado = 'Activo'");
    if ($stmt->execute()) {
        $cargos = $stmt->fetchAll(PDO::FETCH_ASSOC); // Cambié el nombre de la variable de "vehiculos" a "cargos"
        $response['success'] = true;
        $response['cargos'] = $cargos; // Cambié el nombre de la clave de "vehiculos" a "cargos"
    } else {
        $response['success'] = false;
        $response['message'] = "Error al obtener los cargos."; // Cambié el mensaje de "vehículos" a "cargos"
    }
} catch (PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
