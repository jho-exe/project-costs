<?php
include '../../includes/db_connection.php';


$response = array();

if(isset($_GET['id'])){
    $cargoId = $_GET['id'];
    
    try {
        $stmt = $conn->prepare("SELECT * FROM cargos WHERE id = :id");
        $stmt->bindParam(':id', $cargoId, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            $cargo = $stmt->fetch(PDO::FETCH_ASSOC);
            $response['success'] = true;
            $response['cargo'] = $cargo;
        } else {
            $response['success'] = false;
            $response['message'] = "Error al obtener los datos del cargo.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "ID de cargo no especificado.";
}

echo json_encode($response);
$conn = null;
?>
