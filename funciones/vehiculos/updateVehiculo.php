<?php
include '../../includes/db_connection.php';
var_dump($_POST);

$response = array();

// Verificar si se enviaron los datos necesarios
if(isset($_POST['id']) && isset($_POST['nombre']) && isset($_POST['descripcion']) && isset($_POST['preciocombustible'])){
    $vehiculoId = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $preciocombustible = $_POST['preciocombustible'];
    date_default_timezone_set('America/Santiago');
    $fecha_modificacion = date('Y-m-d H:i:s'); // Obtener la fecha y hora actual

    try {
        $stmt = $conn->prepare("UPDATE vehiculos SET nombre = :nombre, descripcion = :descripcion, preciocombustible = :preciocombustible, fecha_modificacion = :fecha_modificacion WHERE id = :id");
        $stmt->bindParam(':id', $vehiculoId, PDO::PARAM_INT);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':preciocombustible', $preciocombustible, PDO::PARAM_STR);
        $stmt->bindParam(':fecha_modificacion', $fecha_modificacion, PDO::PARAM_STR); // Vincular la fecha de modificación

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Vehículo actualizado exitosamente.";
        } else {
            $response['success'] = false;
            $response['message'] = "Error al actualizar el vehículo.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "Datos incompletos para actualizar el vehículo.";
}

echo json_encode($response);
$conn = null;
?>
