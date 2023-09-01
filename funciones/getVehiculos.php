<?php
include '../includes/db_connection.php';

// Establece el encabezado de respuesta como JSON.
header('Content-Type: application/json');

// Modifica el query para incluir la columna preciocombustible
$query = "SELECT id, nombre, preciocombustible FROM vehiculos";
$stmt = $conn->prepare($query);
$stmt->execute();

$vehiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($vehiculos);
?>
