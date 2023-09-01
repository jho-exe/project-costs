<?php
include '../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['rut'])) {
        $rut = $_POST['rut'];

        // Prepared statements con PDO
        $stmt = $conn->prepare("SELECT RazonSocial FROM empresas WHERE RUT = ? LIMIT 1");
        $stmt->bindParam(1, $rut);

        if($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if($row) {
                $response["RazonSocial"] = $row["RazonSocial"];
            } else {
                $response["RazonSocial"] = "";
            }
        } else {
            $response["error"] = "Error en la consulta: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["error"] = "RUT no proporcionado";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerrar conexión PDO (opcional)
$conn = null;
?>
