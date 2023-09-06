<?php
header('Content-Type: application/json');

include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['nombre']) && isset($_POST['precio'])) {
        
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];

        // Prepared statements con PDO
        $stmt = $conn->prepare("INSERT INTO insumos (nombre, precio) VALUES (?, ?)");
        
        $stmt->bindParam(1, $nombre);
        $stmt->bindParam(2, $precio);

        if($stmt->execute()) {
            $response["success"] = "Insumo registrado exitosamente.";
        } else {
            $response["error"] = "Error al registrar el insumo: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["error"] = "Información del insumo no proporcionada completa.";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerrar conexión PDO (opcional)
$conn = null;
?>
