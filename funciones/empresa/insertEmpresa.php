<?php
header('Content-Type: application/json');

include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['RUT']) && isset($_POST['RazonSocial']) && isset($_POST['Direccion']) && isset($_POST['Telefonos'])) {
        
        $RUT = $_POST['RUT'];
        $RazonSocial = $_POST['RazonSocial'];
        $Direccion = $_POST['Direccion'];
        $Telefonos = $_POST['Telefonos'];
        $estado = "activo";

        $stmt = $conn->prepare("INSERT INTO empresas (RUT, RazonSocial, Direccion, Telefonos, estado) VALUES (?, ?, ?, ?, ?)");
        
        $stmt->bindParam(1, $RUT);
        $stmt->bindParam(2, $RazonSocial);
        $stmt->bindParam(3, $Direccion);
        $stmt->bindParam(4, $Telefonos);
        $stmt->bindParam(5, $estado);

        if($stmt->execute()) {
            $response["success"] = "Empresa registrada exitosamente.";
        } else {
            $response["error"] = "Error al registrar la empresa: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["error"] = "Información de la empresa no proporcionada completa.";
    }
} catch(PDOException $e) {
    $response["error"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>
