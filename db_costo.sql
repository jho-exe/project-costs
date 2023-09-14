-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-09-2023 a las 22:55:16
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_costo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `sueldo` int(11) DEFAULT NULL,
  `costohh` int(11) DEFAULT NULL,
  `cargo_largo` varchar(255) DEFAULT NULL,
  `B_T_Dia` int(11) DEFAULT 0,
  `B_T_Noche` int(11) DEFAULT 0,
  `B_sab_dom_festivo` int(11) DEFAULT 0,
  `B_Emergen` int(11) DEFAULT 0,
  `estado` varchar(255) DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `cargo`, `sueldo`, `costohh`, `cargo_largo`, `B_T_Dia`, `B_T_Noche`, `B_sab_dom_festivo`, `B_Emergen`, `estado`) VALUES
(1, 'Supervisor', 1538542, 51285, '', 18000, 20700, 50744, 22222, 'Activo'),
(2, 'Apr', 1036319, 34544, 'Asesor en prevención de riesgos', 12500, 20700, 40365, 15525, 'Activo'),
(3, 'Inspector Confiabilidad', 1036319, 34544, NULL, 12500, 20700, 40000, 15525, 'Activo'),
(4, 'Capataz', 1089988, 36333, NULL, 16500, 20000, 49000, 15525, 'Activo'),
(5, 'M1', 1076495, 35883, 'Maestro Primera', 12500, 20700, 41400, 15525, 'Activo'),
(6, 'Mecanico', 988002, 32933, 'Mec Soldador', 12500, 20700, 41400, 15525, 'Activo'),
(7, 'M2', 988002, 32933, 'Maestro Segunda', 11000, 20700, 41400, 15525, 'Activo'),
(8, 'Electricista', 852569, 28419, NULL, 10000, 20000, 30000, 15525, 'Activo'),
(9, 'Ayudante', 791319, 26377, NULL, 11000, 20700, 31050, 15525, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `RUT` varchar(12) NOT NULL,
  `RazonSocial` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Telefonos` varchar(20) NOT NULL,
  `estado` varchar(255) NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso`
--

CREATE TABLE `ingreso` (
  `id` int(11) NOT NULL,
  `numOP` varchar(50) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaTermino` date DEFAULT NULL,
  `numVenta` varchar(50) DEFAULT NULL,
  `rutEmpresa` varchar(50) DEFAULT NULL,
  `nombreEmpresa` varchar(255) DEFAULT NULL,
  `servicio` text DEFAULT NULL,
  `bono` enum('B_T_Dia','B_T_Noche','B_sab_dom_festivo','B_Emergen') DEFAULT NULL,
  `supervisor` int(11) DEFAULT 0,
  `valorSupervisor` int(11) DEFAULT 0,
  `apr` int(11) DEFAULT 0,
  `valorApr` int(11) DEFAULT 0,
  `m1` int(11) DEFAULT 0,
  `valorM1` int(11) DEFAULT 0,
  `m2` int(11) DEFAULT 0,
  `valorM2` int(11) DEFAULT 0,
  `mecanico` int(11) DEFAULT 0,
  `valorMecanico` int(11) DEFAULT 0,
  `ayudante` int(11) DEFAULT 0,
  `valorAyudante` int(11) DEFAULT 0,
  `totalTrabajadores` int(11) DEFAULT 0,
  `totalManoObra` int(11) DEFAULT 0,
  `tallerTerreno` enum('TALLER','TERRENO') DEFAULT NULL,
  `duracionServicio` int(11) DEFAULT 0,
  `totalHoras` int(11) DEFAULT 0,
  `vehiculo1` varchar(50) DEFAULT NULL,
  `combustible1` int(11) DEFAULT 0,
  `vehiculo2` varchar(50) DEFAULT NULL,
  `combustible2` int(11) DEFAULT 0,
  `vehiculo3` varchar(50) DEFAULT NULL,
  `combustible3` int(11) DEFAULT 0,
  `totalKilometros` int(11) DEFAULT 0,
  `totalPeajes` int(11) DEFAULT 0,
  `totalCombustible` int(11) DEFAULT 0,
  `totalGastosVehiculos` int(11) DEFAULT 0,
  `observaciones` text DEFAULT NULL,
  `insumo1` varchar(50) DEFAULT 'NO',
  `precio1` int(11) DEFAULT 0,
  `cantidad1` int(11) DEFAULT NULL,
  `insumo2` varchar(50) DEFAULT NULL,
  `precio2` int(11) DEFAULT 0,
  `cantidad2` int(11) DEFAULT NULL,
  `insumo3` varchar(50) DEFAULT NULL,
  `precio3` int(11) DEFAULT 0,
  `cantidad3` int(11) DEFAULT NULL,
  `insumo4` varchar(50) DEFAULT NULL,
  `precio4` int(11) DEFAULT 0,
  `cantidad4` int(11) DEFAULT NULL,
  `insumo5` varchar(50) DEFAULT NULL,
  `precio5` int(11) DEFAULT 0,
  `cantidad5` int(11) DEFAULT NULL,
  `insumo6` varchar(50) DEFAULT NULL,
  `precio6` int(11) DEFAULT 0,
  `cantidad6` int(11) DEFAULT NULL,
  `insumo7` varchar(50) DEFAULT NULL,
  `precio7` int(11) DEFAULT 0,
  `cantidad7` int(11) DEFAULT NULL,
  `insumo8` varchar(50) DEFAULT NULL,
  `precio8` int(11) DEFAULT 0,
  `cantidad8` int(11) DEFAULT NULL,
  `insumo9` varchar(50) DEFAULT NULL,
  `precio9` int(11) DEFAULT 0,
  `cantidad9` int(11) DEFAULT NULL,
  `totalGastosInsumos` int(11) DEFAULT 0,
  `alojamientos` int(11) DEFAULT 0,
  `alimentacion` int(11) DEFAULT 0,
  `varios` int(11) DEFAULT 0,
  `totalLogistica` int(11) DEFAULT 0,
  `costoTotal` int(11) DEFAULT 0,
  `fecha_modificacion` timestamp NULL DEFAULT NULL,
  `fecha_eliminacion` timestamp NULL DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `preciocombustible` int(11) DEFAULT NULL,
  `estado` varchar(255) DEFAULT 'Activo',
  `fecha_modificacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cargo` (`cargo`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingreso`
--
ALTER TABLE `ingreso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingreso`
--
ALTER TABLE `ingreso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
