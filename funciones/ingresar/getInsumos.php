<?php
include '../../includes/db_connection.php';

// Verificar conexión
if (!$conn) {
    die(json_encode(['error' => 'Failed to connect to the database']));
}

$query = "SELECT id, nombre, precio FROM insumos WHERE estado = 'Activo'";
$stmt = $conn->prepare($query);

if (!$stmt) {
    die(json_encode(['error' => 'Failed to prepare the query']));
}

if (!$stmt->execute()) {
    die(json_encode(['error' => 'Failed to execute the query']));
}

$insumos = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$insumos) {
    die(json_encode(['error' => 'Failed to fetch the insumos']));
}

// Establecer el header para indicar que la respuesta es de tipo JSON
header('Content-Type: application/json');
echo json_encode($insumos);
?>
