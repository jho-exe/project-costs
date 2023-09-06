<?php
include '../../includes/db_connection.php';

// Establece el encabezado de respuesta como JSON.
header('Content-Type: application/json');

$tipoCargo = $_POST['cargo'];

// Query para obtener el valor de costohh de la tabla 'cargos' basado en el tipo de cargo.
$query = "SELECT costohh FROM cargos WHERE cargo = :cargo";
$stmt = $conn->prepare($query);
$stmt->bindParam(':cargo', $tipoCargo);

// Ejecuta el query.
$stmt->execute();

// Obtiene el resultado.
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Verifica si se encontró el valor y si no, retorna un valor por defecto.
if ($result) {
    echo json_encode(['costohh' => $result['costohh']]);
} else {
    echo json_encode(['costohh' => 0]); // Valor por defecto si no se encuentra el tipo de cargo en la base de datos.
}
?>
