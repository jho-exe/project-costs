<?php
include '../../includes/db_connection.php';

$response = array();

try {
    if(isset($_POST['RUT']) && isset($_POST['RazonSocial']) && isset($_POST['Direccion']) && isset($_POST['Telefonos'])) {
        
        $RUT = $_POST['RUT'];
        $RazonSocial = $_POST['RazonSocial'];
        $Direccion = $_POST['Direccion'];
        $Telefonos = $_POST['Telefonos'];
        $empresaId = $_POST['empresaId'];

        $stmt = $conn->prepare("UPDATE empresas SET RUT = ?, RazonSocial = ?, Direccion = ?, Telefonos = ? WHERE id = ?");
        
        $stmt->bindParam(1, $RUT);
        $stmt->bindParam(2, $RazonSocial);
        $stmt->bindParam(3, $Direccion);
        $stmt->bindParam(4, $Telefonos);
        $stmt->bindParam(5, $empresaId);

        if($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Empresa actualizada exitosamente.";
        } else {
            $response["success"] = false;
            $response["message"] = "Error al actualizar la empresa: " . $stmt->errorInfo()[2];
        }
    } else {
        $response["success"] = false;
        $response["message"] = "Información de la empresa no proporcionada completa.";
    }
} catch(PDOException $e) {
    $response["success"] = false;
    $response["message"] = "Error en la consulta: " . $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>
