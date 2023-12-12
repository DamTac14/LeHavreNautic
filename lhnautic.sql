-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 08 nov. 2023 à 16:17
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lhnautic`
--

-- --------------------------------------------------------

--
-- Structure de la table `bateaux`
--

DROP TABLE IF EXISTS `bateaux`;
CREATE TABLE IF NOT EXISTS `bateaux` (
  `idBATEAUX` int NOT NULL AUTO_INCREMENT,
  `gamme` varchar(45) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `numero_serie` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `immatriculation` varchar(45) DEFAULT NULL,
  `annee` int DEFAULT NULL,
  `longueur_coque` int DEFAULT NULL,
  `largeur_bau` int DEFAULT NULL,
  `tirant_air` int DEFAULT NULL,
  `tirant_eau` int DEFAULT NULL,
  `cabine` int DEFAULT NULL,
  `couchette` int DEFAULT NULL,
  `lier_client_vente` tinyint(1) NOT NULL,
  `etat` varchar(45) DEFAULT NULL,
  `prix` int DEFAULT NULL,
  `MOTEURS_idMOTEURS` int NOT NULL,
  `FOURNISSEUR_idFOURNISSEUR` int NOT NULL,
  PRIMARY KEY (`idBATEAUX`,`MOTEURS_idMOTEURS`,`FOURNISSEUR_idFOURNISSEUR`),
  UNIQUE KEY `num_serie` (`numero_serie`),
  KEY `fk_BATEAUX_MOTEURS1_idx` (`MOTEURS_idMOTEURS`),
  KEY `fk_BATEAUX_FOURNISSEUR1_idx` (`FOURNISSEUR_idFOURNISSEUR`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `bateaux`
--

INSERT INTO `bateaux` (`idBATEAUX`, `gamme`, `nom`, `numero_serie`, `immatriculation`, `annee`, `longueur_coque`, `largeur_bau`, `tirant_air`, `tirant_eau`, `cabine`, `couchette`, `lier_client_vente`, `etat`, `prix`, `MOTEURS_idMOTEURS`, `FOURNISSEUR_idFOURNISSEUR`) VALUES
(19, 'aucun bateau', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 16, 13);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `idCLIENTS` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `place_portuaire` varchar(4) DEFAULT NULL,
  `BATEAUX_idBATEAUX` int NOT NULL,
  PRIMARY KEY (`idCLIENTS`),
  KEY `fk_UTILISATEURS_BATEAUX1_idx` (`BATEAUX_idBATEAUX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `conformite`
--

DROP TABLE IF EXISTS `conformite`;
CREATE TABLE IF NOT EXISTS `conformite` (
  `idCONFORMITE` int NOT NULL AUTO_INCREMENT,
  `date_entree` date DEFAULT NULL,
  `commentaire` varchar(1500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CLIENTS_idCLIENTS` int NOT NULL,
  PRIMARY KEY (`idCONFORMITE`,`CLIENTS_idCLIENTS`),
  KEY `fk_CONFORMITE_UTILISATEURS1_idx` (`CLIENTS_idCLIENTS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

DROP TABLE IF EXISTS `employe`;
CREATE TABLE IF NOT EXISTS `employe` (
  `idEMPLOYE` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `mot_de_passe` varchar(45) DEFAULT NULL,
  `ROLE_idROLE` int NOT NULL,
  PRIMARY KEY (`idEMPLOYE`,`ROLE_idROLE`),
  KEY `fk_EMPLOYE_ROLE1_idx` (`ROLE_idROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `employe`
--

INSERT INTO `employe` (`idEMPLOYE`, `nom`, `prenom`, `mail`, `telephone`, `mot_de_passe`, `ROLE_idROLE`) VALUES
(1, 'Di Gregorio', 'François', 'f.digregorio@lehavre-nautic.fr', '0607623811', 'dig_fran123456', 1),
(2, 'Chef', 'Atelier', 'atelier@lehavre-nautic.fr', '0235242114', 'atelier123456', 1);

-- --------------------------------------------------------

--
-- Structure de la table `entretien`
--

DROP TABLE IF EXISTS `entretien`;
CREATE TABLE IF NOT EXISTS `entretien` (
  `idENTRETIEN` int NOT NULL AUTO_INCREMENT,
  `periode` int DEFAULT NULL,
  `etape` varchar(45) DEFAULT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `valide` tinyint DEFAULT NULL,
  `MOTEURS_idMOTEURS` int NOT NULL,
  PRIMARY KEY (`idENTRETIEN`,`MOTEURS_idMOTEURS`),
  KEY `fk_ENTRETIEN_MOTEURS1_idx` (`MOTEURS_idMOTEURS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `idFOURNISSEUR` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`idFOURNISSEUR`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`idFOURNISSEUR`, `nom`, `type`) VALUES
(1, 'Jeanneau', 'bateau'),
(13, 'none', 'moteur'),
(14, 'Mercury', 'moteur'),
(15, 'Evok Marine', 'bateau'),
(16, 'Brig', 'bateau'),
(17, 'Whaly', 'bateau'),
(18, 'Yamaha', 'moteur'),
(19, 'Suzuki', 'moteur'),
(20, 'Yanmar', 'moteur');

-- --------------------------------------------------------

--
-- Structure de la table `moteurs`
--

DROP TABLE IF EXISTS `moteurs`;
CREATE TABLE IF NOT EXISTS `moteurs` (
  `idMOTEURS` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) DEFAULT NULL,
  `gamme` varchar(45) DEFAULT NULL,
  `numero_serie` varchar(45) DEFAULT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `puissance` int DEFAULT NULL,
  `annee` int NOT NULL,
  `poids` int DEFAULT NULL,
  `bruit` int DEFAULT NULL,
  `taxe` int DEFAULT NULL,
  `etat` varchar(25) DEFAULT NULL,
  `annee_utilisation` int NOT NULL,
  `lier_bateau_vente` tinyint NOT NULL,
  `prix` int DEFAULT NULL,
  `FOURNISSEUR_idFOURNISSEUR` int NOT NULL,
  PRIMARY KEY (`idMOTEURS`,`FOURNISSEUR_idFOURNISSEUR`),
  KEY `fk_MOTEURS_FOURNISSEUR1_idx` (`FOURNISSEUR_idFOURNISSEUR`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `moteurs`
--

INSERT INTO `moteurs` (`idMOTEURS`, `nom`, `gamme`, `numero_serie`, `reference`, `puissance`, `annee`, `poids`, `bruit`, `taxe`, `etat`, `annee_utilisation`, `lier_bateau_vente`, `prix`, `FOURNISSEUR_idFOURNISSEUR`) VALUES
(16, 'aucun moteur', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, 1, NULL, 13);

-- --------------------------------------------------------

--
-- Structure de la table `pris_en_charge`
--

DROP TABLE IF EXISTS `pris_en_charge`;
CREATE TABLE IF NOT EXISTS `pris_en_charge` (
  `idPRIS_EN_CHARGE` int NOT NULL AUTO_INCREMENT,
  `date_sortie` date DEFAULT NULL,
  `CLIENTS_idCLIENTS` int NOT NULL,
  PRIMARY KEY (`idPRIS_EN_CHARGE`,`CLIENTS_idCLIENTS`),
  KEY `fk_PRIS_EN_CHARGE_UTILISATEURS1_idx` (`CLIENTS_idCLIENTS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `remorques`
--

DROP TABLE IF EXISTS `remorques`;
CREATE TABLE IF NOT EXISTS `remorques` (
  `idREMORQUES` int NOT NULL AUTO_INCREMENT,
  `marque` varchar(45) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `ptac` int DEFAULT NULL,
  `charge` int DEFAULT NULL,
  `largeur` int DEFAULT NULL,
  `longueur` int DEFAULT NULL,
  `resistance` varchar(45) DEFAULT NULL,
  `tete` varchar(45) DEFAULT NULL,
  `chassis` varchar(45) DEFAULT NULL,
  `roues` varchar(45) DEFAULT NULL,
  `etat` varchar(45) DEFAULT NULL,
  `prix` int DEFAULT NULL,
  `feux` tinyint DEFAULT NULL,
  `pneus` tinyint DEFAULT NULL,
  `cablage` tinyint DEFAULT NULL,
  `roue_secours` tinyint DEFAULT NULL,
  PRIMARY KEY (`idREMORQUES`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `idROLE` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`idROLE`, `role`) VALUES
(1, 'Administrateur'),
(2, 'Utilisateur');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bateaux`
--
ALTER TABLE `bateaux`
  ADD CONSTRAINT `fk_BATEAUX_FOURNISSEUR1` FOREIGN KEY (`FOURNISSEUR_idFOURNISSEUR`) REFERENCES `fournisseur` (`idFOURNISSEUR`),
  ADD CONSTRAINT `fk_BATEAUX_MOTEURS1` FOREIGN KEY (`MOTEURS_idMOTEURS`) REFERENCES `moteurs` (`idMOTEURS`);

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `fk_UTILISATEURS_BATEAUX1` FOREIGN KEY (`BATEAUX_idBATEAUX`) REFERENCES `bateaux` (`idBATEAUX`);

--
-- Contraintes pour la table `conformite`
--
ALTER TABLE `conformite`
  ADD CONSTRAINT `fk_CONFORMITE_UTILISATEURS1` FOREIGN KEY (`CLIENTS_idCLIENTS`) REFERENCES `clients` (`idCLIENTS`);

--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `fk_EMPLOYE_ROLE1` FOREIGN KEY (`ROLE_idROLE`) REFERENCES `role` (`idROLE`);

--
-- Contraintes pour la table `entretien`
--
ALTER TABLE `entretien`
  ADD CONSTRAINT `fk_ENTRETIEN_MOTEURS1` FOREIGN KEY (`MOTEURS_idMOTEURS`) REFERENCES `moteurs` (`idMOTEURS`);

--
-- Contraintes pour la table `moteurs`
--
ALTER TABLE `moteurs`
  ADD CONSTRAINT `fk_MOTEURS_FOURNISSEUR1` FOREIGN KEY (`FOURNISSEUR_idFOURNISSEUR`) REFERENCES `fournisseur` (`idFOURNISSEUR`);

--
-- Contraintes pour la table `pris_en_charge`
--
ALTER TABLE `pris_en_charge`
  ADD CONSTRAINT `fk_PRIS_EN_CHARGE_UTILISATEURS1` FOREIGN KEY (`CLIENTS_idCLIENTS`) REFERENCES `clients` (`idCLIENTS`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
