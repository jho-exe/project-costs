<?php
include '../../includes/db_connection.php';

$response = array();

try {
    // Preparar la consulta para seleccionar todos los registros
    $stmt = $conn->prepare("SELECT * FROM ingreso");
    
    // Ejecutar la consulta
    if($stmt->execute()) {
        // Obtener todos los resultados en lugar de solo uno
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($rows) {
            $response["data"] = $rows;
        } else {
            $response["error"] = "No se encontraron registros.";
        }
    } else {
        $response["error"] = "Error en la consulta: " . implode(" - ", $stmt->errorInfo());
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

// Devolver la respuesta como JSON
echo json_encode($response);

// Cerrar la conexión
$conn = null;
?>
