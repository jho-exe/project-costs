<?php
include '../../includes/db_connection.php';


$response = array();

if(isset($_GET['id'])){
    $vehiculoId = $_GET['id'];
    
    try {
        $stmt = $conn->prepare("SELECT * FROM vehiculos WHERE id = :id");
        $stmt->bindParam(':id', $vehiculoId, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            $vehiculo = $stmt->fetch(PDO::FETCH_ASSOC);
            $response['success'] = true;
            $response['vehiculo'] = $vehiculo;
        } else {
            $response['success'] = false;
            $response['message'] = "Error al obtener los datos del vehículo.";
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
$conn = null;
?>
