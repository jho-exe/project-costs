<?php
include '../../includes/db_connection.php';

// Establece el encabezado de respuesta como JSON.
header('Content-Type: application/json');

$query = "SELECT id, nombre, precio FROM insumos WHERE estado = 'Activo'";
$stmt = $conn->prepare($query);
$stmt->execute();

$insumos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($insumos);
?>
