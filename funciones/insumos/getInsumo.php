<?php
include '../../includes/db_connection.php';

$response = array();

try {
    $stmt = $conn->prepare("SELECT * FROM insumos WHERE estado = 'Activo'");
    if ($stmt->execute()) {
        $insumos = $stmt->fetchAll(PDO::FETCH_ASSOC); // Cambié el nombre de la variable de "vehiculos" a "insumos"
        $response['success'] = true;
        $response['insumos'] = $insumos; // Cambié el nombre de la clave de "vehiculos" a "insumos"
    } else {
        $response['success'] = false;
        $response['message'] = "Error al obtener los insumos."; // Cambié el mensaje de "vehículos" a "insumos"
    }
} catch (PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
