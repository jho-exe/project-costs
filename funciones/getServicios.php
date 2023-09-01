<?php
include '../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['buscarOPNV'])) {
        $opnv = filter_input(INPUT_POST, 'buscarOPNV', FILTER_SANITIZE_STRING);

        // Prepared statements con PDO, solo seleccionando los campos que necesitas
        $stmt = $conn->prepare("SELECT fechaInicio, fechaTermino, numOP, numVenta, rutEmpresa, nombreEmpresa, servicio FROM servicios WHERE numOP = ? OR numVenta = ?");
        $stmt->bindParam(1, $opnv);
        $stmt->bindParam(2, $opnv);

        if($stmt->execute()) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            if($data) {
                foreach ($data as $key => $value) {
                    $response[$key] = $value;
                }
            } else {
                $response["error"] = "No se encontraron registros.";
            }
        } else {
            $response["error"] = "Error en la consulta: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["error"] = "Valor buscarOPNV no proporcionado";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

// Cerrar conexión PDO (opcional)
$conn = null;
?>
