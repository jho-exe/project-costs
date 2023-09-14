<?php
include '../../includes/db_connection.php';

$response = array();

if(isset($_GET['numOP'])) {
    $numOP = $_GET['numOP'];

    try {
        $stmt = $conn->prepare("SELECT * FROM ingreso WHERE numOP = :numOP AND estado = 'Activo'");
        $stmt->bindParam(':numOP', $numOP);
        
        if($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if($row) {
                $response["data"] = $row;
            } else {
                $response["error"] = "No se encontraron registros.";
            }
        } else {
            $response["error"] = "Error en la consulta: " . implode(" - ", $stmt->errorInfo());
        }
    } catch(PDOException $e) {
        $response["error"] = "Error en la consulta: " . $e->getMessage();
    }
} else {
    $response["error"] = "Número OP no especificado.";
}

echo json_encode($response);

$conn = null;
?>
