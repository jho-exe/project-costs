<?php
include '../../includes/db_connection.php';

$response = array();

if(isset($_POST['id'])){
    $vehiculoId = $_POST['id'];
    
    try {
        // Utilizar una sentencia de actualización más segura con marcadores de posición
        $stmt = $conn->prepare("UPDATE insumos SET estado = 'Inactivo' WHERE id = :id");
        $stmt->bindParam(':id', $vehiculoId, PDO::PARAM_INT);
        
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
