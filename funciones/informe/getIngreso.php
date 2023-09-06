<?php
include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['numOP'])) {
        $numOP = $_POST['numOP'];

        $stmt = $conn->prepare("SELECT * FROM ingreso WHERE numOP = ? LIMIT 1");
        $stmt->bindParam(1, $numOP);

        if($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if($row) {
                $response = $row;
            } else {
                $response["error"] = "No se encontraron registros.";
            }
        } else {
            $response["error"] = "Error en la consulta: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["error"] = "Número de OP no proporcionado";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>
