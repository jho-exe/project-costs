<?php
include '../../includes/db_connection.php';

// Establece el encabezado de respuesta como JSON.
header('Content-Type: application/json');

// Consulta SQL para obtener los bonos asociados a cada cargo
$query = "SELECT cargo, B_T_Dia, B_T_Noche, B_sab_dom_festivo, B_Emergen FROM cargos";
$stmt = $conn->prepare($query);
$stmt->execute();

$bonos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($bonos);
?>
