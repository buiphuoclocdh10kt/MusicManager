-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: db_musicsong
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `song_table`
--

DROP TABLE IF EXISTS `song_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_table` (
  `id_song` int(11) NOT NULL AUTO_INCREMENT,
  `name_song` varchar(100) DEFAULT NULL,
  `author_song` varchar(100) DEFAULT NULL,
  `date_add_song` datetime DEFAULT NULL,
  `public_song` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_song`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_table`
--

LOCK TABLES `song_table` WRITE;
/*!40000 ALTER TABLE `song_table` DISABLE KEYS */;
INSERT INTO `song_table` VALUES (1,'Diễm Xưa','Trịnh Công Sơn','2017-12-13 00:00:00',0),(2,'Cát Bụi','Trịnh Công Sơn','2017-05-22 00:00:00',0),(3,'Về Đâu Mái Tóc Người Thương','Hoài Linh','2017-05-22 00:00:00',0),(4,'Xót Xa','Phan Thanh Tùng','2017-05-22 00:00:00',0),(5,'Lưu Bút Ngày Xanh','Thanh Sơn','2017-05-22 00:00:00',0);
/*!40000 ALTER TABLE `song_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-22 17:32:39
