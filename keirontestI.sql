-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.1.37-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para keiron
CREATE DATABASE IF NOT EXISTS `keiron` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `keiron`;

-- Volcando estructura para tabla keiron.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarios_id` int(11) DEFAULT NULL,
  `ticket_pedido` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COMMENT='Tickets information';

-- Volcando datos para la tabla keiron.ticket: ~2 rows (aproximadamente)
DELETE FROM `ticket`;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;

-- Volcando estructura para tabla keiron.tipo_usuario
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='Niveles de usuario';

-- Volcando datos para la tabla keiron.tipo_usuario: ~2 rows (aproximadamente)
DELETE FROM `tipo_usuario`;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` (`id`, `nombre`) VALUES
	(1, 'Administrador'),
	(2, 'Usuario');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;

-- Volcando estructura para tabla keiron.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipouser_id` int(11) NOT NULL DEFAULT '1',
  `nombre` varchar(255) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `pass` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `tipouser_id` (`tipouser_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='Dedicada manejar el acceso y nivel de los usuarios';

-- Volcando datos para la tabla keiron.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `tipouser_id`, `nombre`, `email`, `pass`) VALUES
	(1, 1, 'admin', 'correo@gmail.com', '$2a$2a$10$CzCRH32OHyLloKiSN5kE7ecWX8soMEkuBvh3M2WggYiYdcUkUkfQW');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
