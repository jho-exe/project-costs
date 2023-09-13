<?php
include '../../includes/db_connection.php';

try {
    // Establece el encabezado de respuesta como JSON.
    header('Content-Type: application/json');

    // Consulta SQL para obtener los bonos asociados a cada cargo
    $query = "SELECT cargo, B_T_Dia, B_T_Noche, B_sab_dom_festivo, B_Emergen FROM cargos";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $bonos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bonos);
} catch (Exception $e) {
    // Devuelve un mensaje de error con un estado 500 si algo va mal.
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
} finally {
    // Cierra la conexión a la base de datos.
    $conn = null;
}
?>
