<?php
include '../../includes/db_connection.php';

$response = array();

try {
    $stmt = $conn->prepare("SELECT * FROM empresas WHERE estado = 'Activo'");
    if ($stmt->execute()) {
        $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response['success'] = true;
        $response['empresas'] = $empresas;
    } else {
        $response['success'] = false;
        $response['message'] = "Error al obtener las empresas.";
    }
} catch (PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
