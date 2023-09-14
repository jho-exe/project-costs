<?php
include '../../includes/db_connection.php';

$response = array();
date_default_timezone_set('America/Santiago');

if(isset($_POST['numOP'])){
    $numOP = $_POST['numOP'];
    $fecha_eliminacion = date('Y-m-d H:i:s');

    try {
        // Utilizar una sentencia de actualización más segura con marcadores de posición
        $stmt = $conn->prepare("UPDATE ingreso SET estado = 'Inactivo', fecha_eliminacion = :fecha_eliminacion WHERE numOP = :numOP AND estado = 'Activo' ");
        $stmt->bindParam(':numOP', $numOP, PDO::PARAM_INT);
        $stmt->bindParam(':fecha_eliminacion', $fecha_eliminacion, PDO::PARAM_STR); // Vincular la fecha de modificación
        
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Aquí significa que al menos una fila fue afectada (el registro fue actualizado)
            $response['success'] = true;
            $response['message'] = "El estado del ingreso ha sido actualizado a 'Inactivo'.";
        } else {
            // Aquí significa que ninguna fila fue afectada (el registro no se encontró o ya estaba inactivo)
            $response['success'] = false;
            $response['message'] = "No se encontró ningún registro activo con el numOP especificado.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "ID de ingreso no especificado.";
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
