<?php
include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['nombre']) && isset($_POST['precio'])) {
        
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $insumoId = $_POST['insumoId'];

        $stmt = $conn->prepare("UPDATE insumos SET nombre = ?, precio = ? WHERE id = ?");
        
        $stmt->bindParam(1, $nombre);
        $stmt->bindParam(2, $precio);
        $stmt->bindParam(3, $insumoId);

        if($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Insumo actualizado exitosamente.";
        } else {
            $response["success"] = false;
            $response["message"] = "Error al actualizar el insumo: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["success"] = false;
        $response["message"] = "Información del insumo no proporcionada completa.";
    }
} catch(PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>
