<?php
include '../../includes/db_connection.php';

$response = array();

if(isset($_GET['id'])){
    $empresaId = $_GET['id'];
    
    try {
        $stmt = $conn->prepare("SELECT * FROM empresas WHERE id = :id");
        $stmt->bindParam(':id', $empresaId, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            $empresa = $stmt->fetch(PDO::FETCH_ASSOC);
            $response['success'] = true;
            $response['empresa'] = $empresa;
        } else {
            $response['success'] = false;
            $response['message'] = "Error al obtener los datos de la empresa.";
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
$conn = null;
?>
