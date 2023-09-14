<?php
include '../../includes/db_connection.php';

$response = array();

// Verificar si se enviaron los datos necesarios
if(isset($_POST['id']) && isset($_POST['cargo'])) {
    
    $cargoId = $_POST['id'];
    $cargo = $_POST['cargo'];
    $sueldo = $_POST['sueldo'];
    $costohh = $_POST['costohh'];
    $cargo_largo = $_POST['cargo_largo'];
    $B_T_Dia = $_POST['B_T_Dia'];
    $B_T_Noche = $_POST['B_T_Noche'];
    $B_sab_dom_festivo = $_POST['B_sab_dom_festivo'];
    $B_Emergen = $_POST['B_Emergen'];

    try {
        $stmt = $conn->prepare("UPDATE cargos SET cargo = :cargo, sueldo = :sueldo, costohh = :costohh, cargo_largo = :cargo_largo, B_T_Dia = :B_T_Dia, B_T_Noche = :B_T_Noche, B_sab_dom_festivo = :B_sab_dom_festivo, B_Emergen = :B_Emergen WHERE id = :id");

        $stmt->bindParam(':id', $cargoId, PDO::PARAM_INT);
        $stmt->bindParam(':cargo', $cargo, PDO::PARAM_STR);
        $stmt->bindParam(':sueldo', $sueldo, PDO::PARAM_STR);
        $stmt->bindParam(':costohh', $costohh, PDO::PARAM_STR);
        $stmt->bindParam(':cargo_largo', $cargo_largo, PDO::PARAM_STR);
        $stmt->bindParam(':B_T_Dia', $B_T_Dia, PDO::PARAM_STR);
        $stmt->bindParam(':B_T_Noche', $B_T_Noche, PDO::PARAM_STR);
        $stmt->bindParam(':B_sab_dom_festivo', $B_sab_dom_festivo, PDO::PARAM_STR);
        $stmt->bindParam(':B_Emergen', $B_Emergen, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Cargo actualizado exitosamente.";
        } else {
            $response['success'] = false;
            $response['message'] = "Error al actualizar el cargo.";
        }
    } catch(PDOException $e) {
        $response["success"] = false;
        $response["message"] = "Error en la consulta: " . $e->getMessage();
    }
    
} else {
    $response['success'] = false;
    $response['message'] = "Datos incompletos para actualizar el cargo.";
}

echo json_encode($response);
$conn = null;
?>
