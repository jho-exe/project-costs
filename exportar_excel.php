<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style;

// Conectar a la base de datos (reemplazar con tus propias credenciales)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_costo";

$conexion = new mysqli($servername, $username, $password, $dbname);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Consulta SQL para obtener los datos de la tabla ingreso
$consulta = "SELECT * FROM ingreso";
$resultados = $conexion->query($consulta);

// Crear un nuevo objeto Spreadsheet
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

// Definir el título y las celdas combinadas
$titulo = 'Reporte de Costos';
$sheet->mergeCells('A1:AT1'); // Combinar celdas de A1 a AT1 para el título
$sheet->setCellValue('A1', $titulo); // Establecer el título

// Estilo para el título
$styleTitle = [
    'font' => [
        'bold' => true,
        'size' => 18, // Tamaño de fuente para el título
        'color' => ['rgb' => '000000'],
    ],
    'alignment' => [
        'horizontal' => Style\Alignment::HORIZONTAL_CENTER, // Centrar horizontalmente
    ],
];

$sheet->getStyle('A1')->applyFromArray($styleTitle);

// Estilos para encabezados
$styleHeader = [
    'font' => [
        'bold' => true,
        'size' => 14,
        'color' => ['rgb' => 'FFFFFF'],
    ],
    'alignment' => [
        'horizontal' => Style\Alignment::HORIZONTAL_CENTER,
    ],
    'fill' => [
        'fillType' => Style\Fill::FILL_SOLID,
        'color' => ['rgb' => '0070C0'],
    ],
];

$sheet->getStyle('A2:BU2')->applyFromArray($styleHeader);

// Aplicar borde a toda la tabla
$highestRow = $sheet->getHighestRow();
$highestColumn = $sheet->getHighestColumn();
$sheet->getStyle('A2:' . $highestColumn . $highestRow)->applyFromArray([
    'borders' => [
        'outline' => [
            'borderStyle' => Style\Border::BORDER_THIN,
            'color' => ['rgb' => '000000'],
        ],
    ],
]);

// Encabezados
$encabezados = [
    'ID', 'numOP', 'Fecha Inicio', 'Fecha Término', 'Número de Venta', 'RUT Empresa', 'Nombre Empresa',
    'Servicio', 'Bono', 'Supervisor', 'Valor Supervisor', 'APR', 'Valor APR', 'M1', 'Valor M1',
    'M2', 'Valor M2', 'Mecánico', 'Valor Mecánico', 'Ayudante', 'Valor Ayudante', 'Total Trabajadores',
    'Total Mano de Obra', 'Taller/Terreno', 'Duración Servicio', 'Total Horas', 'Vehículo 1', 'Combustible 1',
    'Vehículo 2', 'Combustible 2', 'Vehículo 3', 'Combustible 3', 'Total Kilómetros', 'Total Peajes',
    'Total Combustible', 'Total Gastos Vehículos', 'Observaciones', 'Insumo 1', 'Precio 1', 'Cantidad 1',
    'Insumo 2', 'Precio 2', 'Cantidad 2', 'Insumo 3', 'Precio 3', 'Cantidad 3', 'Insumo 4', 'Precio 4',
    'Cantidad 4', 'Insumo 5', 'Precio 5', 'Cantidad 5', 'Insumo 6', 'Precio 6', 'Cantidad 6', 'Insumo 7',
    'Precio 7', 'Cantidad 7', 'Insumo 8', 'Precio 8', 'Cantidad 8', 'Insumo 9', 'Precio 9', 'Cantidad 9',
    'Total Gastos Insumos', 'Alojamientos', 'Alimentación', 'Varios', 'Total Logística', 'Costo Total',
    'Fecha Modificación', 'Fecha Eliminación', 'Estado'
];

$columna = 'A';
foreach ($encabezados as $encabezado) {
    $sheet->setCellValue($columna . '2', $encabezado);
    $columna++;
}

// Estilo para celdas de datos
$styleData = [
    'borders' => [
        'allBorders' => [
            'borderStyle' => Style\Border::BORDER_THIN,
        ],
    ],
];

$row = 3; // Cambiado a '3' para la primera fila de datos
$oddRowColor = ['rgb' => 'E6F7FF']; // Color celeste claro
while ($fila = $resultados->fetch_assoc()) {
    $columna = 'A';
    foreach ($fila as $valor) {
        $sheet->setCellValue($columna . $row, $valor);
        $columna++;
    }
    
    // Aplicar estilo de celda de datos
    $sheet->getStyle('A' . $row . ':' . $highestColumn . $row)->applyFromArray($styleData);
    
    // Alternar el fondo celeste claro en filas intercaladas
    if ($row % 2 == 1) { // Cambiado a '1' para las filas impares
        $sheet->getStyle('A' . $row . ':' . $highestColumn . $row)->applyFromArray([
            'fill' => [
                'fillType' => Style\Fill::FILL_SOLID,
                'color' => $oddRowColor,
            ],
        ]);
    }

    $row++;
}

// Crear el archivo Excel
$writer = new Xlsx($spreadsheet);
$filename = 'IngresosHistoricos.xlsx';

// Enviar el archivo Excel al navegador
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="' . $filename . '"');
header('Cache-Control: max-age=0');
$writer->save('php://output');

// Cerrar la conexión a la base de datos
$conexion->close();
?>