-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 10-06-2026 a las 01:41:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectoprestamo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleprestamo`
--

CREATE TABLE `detalleprestamo` (
  `id_detalle` int(11) NOT NULL,
  `id_prestamo` int(11) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalleprestamo`
--

INSERT INTO `detalleprestamo` (`id_detalle`, `id_prestamo`, `id_equipo`) VALUES
(1, 1, 1),
(2, 1, 7),
(3, 2, 2),
(4, 2, 4),
(5, 3, 3),
(6, 3, 6),
(7, 4, 5),
(8, 5, 1),
(9, 5, 8),
(10, 5, 9),
(11, 6, 10),
(12, 7, 2),
(13, 7, 4),
(14, 8, 6),
(15, 8, 7),
(16, 9, 1),
(17, 9, 3),
(18, 10, 2),
(19, 10, 5),
(20, 11, 4),
(21, 11, 7),
(22, 12, 6),
(23, 12, 9),
(24, 13, 8),
(25, 13, 10),
(26, 14, 1),
(27, 14, 3),
(28, 15, 2),
(29, 15, 4),
(30, 16, 5),
(31, 16, 7),
(32, 17, 6),
(33, 17, 8),
(34, 18, 9),
(35, 18, 10),
(36, 19, 1),
(37, 19, 2),
(38, 20, 3),
(39, 20, 4),
(40, 21, 5),
(41, 21, 7),
(42, 21, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `codigo_inventario` varchar(30) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id_equipo`, `nombre`, `descripcion`, `marca`, `modelo`, `codigo_inventario`, `estado`) VALUES
(1, 'Laptop Dell Inspiron', 'Laptop 15.6 pulgadas, Intel i5, 8GB RAM, 256GB SSD', 'Dell', 'Inspiron 3511', 'EQ-2024-001', 'disponible'),
(2, 'Proyector Epson', 'Proyector multimedia 3200 lumens, resolución HD', 'Epson', 'PowerLite X39', 'EQ-2024-002', 'disponible'),
(3, 'Impresora HP LaserJet', 'Impresora láser monocromática, wifi, duplex', 'HP', 'LaserJet Pro M404n', 'EQ-2024-003', 'disponible'),
(4, 'Cámara Canon', 'Cámara DSLR 24.1 MP, video 4K, kit 18-55mm', 'Canon', 'EOS Rebel T7', 'EQ-2024-004', 'disponible'),
(5, 'Tablet Samsung', 'Tablet 10.4 pulgadas, 64GB, wifi', 'Samsung', 'Galaxy Tab A7', 'EQ-2024-005', 'disponible'),
(6, 'Monitor LG', 'Monitor 24 pulgadas, Full HD, IPS', 'LG', '24MK430H', 'EQ-2024-006', 'disponible'),
(7, 'Teclado y Mouse Logitech', 'Combo inalámbrico, teclado español', 'Logitech', 'MK270', 'EQ-2024-007', 'disponible'),
(8, 'Parlantes JBL', 'Parlantes bluetooth portátil, 20W', 'JBL', 'Flip 5', 'EQ-2024-008', 'disponible'),
(9, 'Webcam Logitech', 'Webcam HD 1080p, micrófono integrado', 'Logitech', 'C270', 'EQ-2024-009', 'disponible'),
(10, 'Disco Duro Externo', 'Disco duro 1TB, USB 3.0, portátil', 'WD', 'Elements Portable', 'EQ-2024-010', 'disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_prestamo` date DEFAULT NULL,
  `fecha_devolucion_programada` date DEFAULT NULL,
  `fecha_devolucion_real` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id_prestamo`, `id_usuario`, `fecha_prestamo`, `fecha_devolucion_programada`, `fecha_devolucion_real`, `estado`) VALUES
(1, 1, '2024-01-15', '2024-01-22', '2024-01-21', 'devuelto'),
(2, 2, '2024-02-01', '2024-02-08', '2024-02-08', 'devuelto'),
(3, 3, '2024-03-10', '2024-03-17', NULL, 'activo'),
(4, 1, '2024-04-05', '2024-04-12', '2024-04-10', 'devuelto'),
(5, 4, '2024-05-20', '2024-05-27', NULL, 'activo'),
(6, 2, '2024-06-01', '2024-06-08', NULL, 'activo'),
(7, 3, '2023-12-01', '2023-12-08', '2023-12-10', 'devuelto'),
(8, 1, '2024-06-05', '2024-06-12', NULL, 'activo'),
(9, 5, '2024-01-20', '2024-01-27', '2024-01-26', 'devuelto'),
(10, 5, '2024-03-15', '2024-03-22', NULL, 'activo'),
(11, 6, '2024-02-10', '2024-02-17', '2024-02-17', 'devuelto'),
(12, 6, '2024-05-01', '2024-05-08', NULL, 'activo'),
(13, 7, '2024-03-01', '2024-03-08', '2024-03-07', 'devuelto'),
(14, 7, '2024-06-10', '2024-06-17', NULL, 'activo'),
(15, 8, '2024-01-10', '2024-01-17', '2024-01-15', 'devuelto'),
(16, 8, '2024-04-20', '2024-04-27', '2024-04-27', 'devuelto'),
(17, 8, '2024-06-01', '2024-06-08', NULL, 'activo'),
(18, 9, '2024-02-15', '2024-02-22', '2024-02-20', 'devuelto'),
(19, 9, '2024-05-10', '2024-05-17', NULL, 'activo'),
(20, 10, '2024-03-20', '2024-03-27', '2024-03-25', 'devuelto'),
(21, 10, '2024-06-05', '2024-06-12', NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `ci` varchar(20) DEFAULT NULL,
  `tipo_usuario` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `ci`, `tipo_usuario`, `telefono`, `correo`) VALUES
(1, 'luis', 'cabrera', '90248239', 'docente', '8273840', 'luis@gmail.com'),
(2, 'jorge', 'watterson', '73283923', 'estudiante', '676787283', 'jorge@gmail.com'),
(3, 'carla', 'chaco', '89283742', 'administrativo', '73827628', 'carla@gmail.com'),
(4, 'juanita', 'alcachofa', '66537291', 'estudiante', '78273942', 'juanita@gmail.com'),
(5, 'maria', 'lopez', '45678912', 'estudiante', '70123456', 'maria.lopez@universidad.edu'),
(6, 'pedro', 'gutierrez', '78945612', 'estudiante', '71234567', 'pedro.gutierrez@estudiante.edu'),
(7, 'ana', 'torres', '32165498', 'docente', '72345678', 'ana.torres@universidad.edu'),
(8, 'carlos', 'ramirez', '65498732', 'docente', '73456789', 'carlos.ramirez@universidad.edu'),
(9, 'laura', 'mendoza', '98732165', 'estudiante', '74567890', 'laura.mendoza@estudiante.edu'),
(10, 'roberto', 'flores', '15935748', 'administrativo', '75678901', 'roberto.flores@universidad.edu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalleprestamo`
--
ALTER TABLE `detalleprestamo`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_prestamo` (`id_prestamo`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id_equipo`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalleprestamo`
--
ALTER TABLE `detalleprestamo`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalleprestamo`
--
ALTER TABLE `detalleprestamo`
  ADD CONSTRAINT `detalleprestamo_ibfk_1` FOREIGN KEY (`id_prestamo`) REFERENCES `prestamo` (`id_prestamo`),
  ADD CONSTRAINT `detalleprestamo_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`);

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
