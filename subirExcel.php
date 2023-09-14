<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$message = '';

if(isset($_POST["submit"])) {
    $target_dir = "C:/xampp/htdocs/proyecto-costos/uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    
    // Subir el archivo al servidor
    if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $message = "El archivo ". basename($_FILES["fileToUpload"]["name"]). " ha sido subido.";
        
        // Conectar a la base de datos
        $conn = new PDO('mysql:host=localhost;dbname=db_costo', 'root', '');

        try {
            // Cargar el archivo Excel
            $spreadsheet = IOFactory::load($target_file);
            
            // Obtener la hoja de cálculo activa
            $sheet = $spreadsheet->getActiveSheet();

            // Preparar una consulta SQL
            $stmt = $conn->prepare('INSERT INTO empresas (RUT, RazonSocial, Direccion, Telefonos) VALUES (?, ?, ?, ?)');

            // Comenzar desde la segunda fila si tu Excel tiene una fila de encabezado
            foreach ($sheet->getRowIterator(2) as $row) {
                // Obtén los datos de la fila como un array
                $data = $row->getCellIterator();
                $data->setIterateOnlyExistingCells(FALSE); 
                $row_data = [];
                foreach ($data as $cell) {
                    $row_data[] = $cell->getValue();
                }

                // Validar los datos aquí (si es necesario)
                
                // Ejecutar la consulta con los datos de la fila
                $stmt->execute($row_data);
            }

            $message = "Datos importados con éxito";

        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            $message = "Error al leer el archivo Excel: " . $e->getMessage();
        } catch (PDOException $e) {
            $message = "Error al insertar datos en la base de datos: " . $e->getMessage();
        }
        
    } else {
        $message = "Error al subir el archivo.";
    }
}
header("Location: formularios/empresa.html?message=" . urlencode($message));
exit();
?>