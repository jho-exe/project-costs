<?php
include '../../includes/db_connection.php';

$response = array();

if(isset($_POST['id'])){
    $empresaId = $_POST['id'];
    
    try {
        // Utilizar una sentencia de actualización más segura con marcadores de posición
        $stmt = $conn->prepare("UPDATE empresas SET estado = 'Inactivo' WHERE id = :id");
        $stmt->bindParam(':id', $empresaId, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "El estado de la empresa ha sido actualizado a 'Inactivo'.";
        } else {
            $response['success'] = false;
            $response['message'] = "Error al actualizar el estado de la empresa.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "ID de empresa no especificado.";
}

echo json_encode($response);

// Cerramos la conexión a la base de datos al final
$conn = null;
?>
