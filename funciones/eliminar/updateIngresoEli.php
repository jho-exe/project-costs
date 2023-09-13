<?php
include '../../includes/db_connection.php';

$response = array();
date_default_timezone_set('America/Santiago');

if(isset($_POST['numOP'])){
    $numOP = $_POST['numOP'];
    $fecha_eliminacion = date('Y-m-d H:i:s');

    try {
        // Utilizar una sentencia de actualización más segura con marcadores de posición
        $stmt = $conn->prepare("UPDATE ingreso SET estado = 'Inactivo', fecha_eliminacion = :fecha_eliminacion WHERE numOP = :numOP");
        $stmt->bindParam(':numOP', $numOP, PDO::PARAM_INT);
        $stmt->bindParam(':fecha_eliminacion', $fecha_eliminacion, PDO::PARAM_STR); // Vincular la fecha de modificación
        
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "El estado del vehículo ha sido actualizado a 'Inactivo'.";
        } else {
            $response['success'] = false;
            $response['message'] = "Error al actualizar el estado del vehículo.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "ID de vehículo no especificado.";
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
