<?php
include '../../includes/db_connection.php';

$response = array();

if(isset($_GET['id'])){
    $insumoId = $_GET['id'];
    
    try {
        $stmt = $conn->prepare("SELECT * FROM insumos WHERE id = :id");
        $stmt->bindParam(':id', $insumoId, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            $insumo = $stmt->fetch(PDO::FETCH_ASSOC);
            $response['success'] = true;
            $response['insumo'] = $insumo;
        } else {
            $response['success'] = false;
            $response['message'] = "Error al obtener los datos del insumo.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "ID de insumo no especificado.";
}

echo json_encode($response);
$conn = null;
?>
