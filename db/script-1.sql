SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `orchid_db` DEFAULT CHARACTER SET utf8 ;
USE `orchid_db` ;

-- -----------------------------------------------------
-- Table `orchid_db`.`brands`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orchid_db`.`brands` ;

CREATE  TABLE IF NOT EXISTS `orchid_db`.`brands` (
  `Code` INT NOT NULL COMMENT 'Code' ,
  `Description` VARCHAR(45) NOT NULL ,
  `Active` VARCHAR(1) NOT NULL DEFAULT '1' ,
  PRIMARY KEY (`Code`) ,
  INDEX `idx_brands` (`Active` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `orchid_db`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orchid_db`.`products` ;

CREATE  TABLE IF NOT EXISTS `orchid_db`.`products` (
  `Code` INT NOT NULL ,
  `Name` VARCHAR(45) NOT NULL ,
  `Price` DOUBLE NOT NULL DEFAULT 1 ,
  `OfferPrice` DOUBLE NOT NULL DEFAULT 0 ,
  `Status` VARCHAR(1) NOT NULL DEFAULT 'A' COMMENT '	' ,
  `CreationDate` DATETIME NULL ,
  `ImagePath` VARCHAR(250) NOT NULL ,
  `Description` VARCHAR(250) NULL ,
  `CodeBrand` INT NOT NULL DEFAULT 1 ,
  PRIMARY KEY (`Code`) ,
  INDEX `CREATIONDATEIDX` (`CreationDate` ASC) ,
  INDEX `fk_brand_idx` (`CodeBrand` ASC) ,
  CONSTRAINT `fk_brand`
    FOREIGN KEY (`CodeBrand` )
    REFERENCES `orchid_db`.`brands` (`Code` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `orchid_db`.`profiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orchid_db`.`profiles` ;

CREATE  TABLE IF NOT EXISTS `orchid_db`.`profiles` (
  `Code` VARCHAR(45) NOT NULL ,
  `Description` VARCHAR(45) NOT NULL ,
  `Active` VARCHAR(1) NOT NULL DEFAULT 'A' ,
  PRIMARY KEY (`Code`) ,
  UNIQUE INDEX `Code_UNIQUE` (`Code` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `orchid_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orchid_db`.`users` ;

CREATE  TABLE IF NOT EXISTS `orchid_db`.`users` (
  `User` VARCHAR(50) NOT NULL ,
  `Name` VARCHAR(45) NOT NULL ,
  `Active` VARCHAR(1) NOT NULL DEFAULT 'A' ,
  `Pass` VARCHAR(45) NOT NULL ,
  `CodeProfile` VARCHAR(45) NOT NULL DEFAULT 'USER' ,
  PRIMARY KEY (`User`) ,
  UNIQUE INDEX `user_UNIQUE` (`User` ASC) ,
  INDEX `FK_uprofiles_idx` (`CodeProfile` ASC) ,
  CONSTRAINT `FK_uprofiles`
    FOREIGN KEY (`CodeProfile` )
    REFERENCES `orchid_db`.`profiles` (`Code` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `orchid_db`.`Comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orchid_db`.`Comments` ;

CREATE  TABLE IF NOT EXISTS `orchid_db`.`Comments` (
  `Code` INT NOT NULL AUTO_INCREMENT ,
  `Comment` VARCHAR(500) NOT NULL ,
  `CodeUser` VARCHAR(50) NOT NULL ,
  `DatePublished` DATETIME NOT NULL ,
  `Active` VARCHAR(1) NOT NULL DEFAULT 'A' ,
  PRIMARY KEY (`Code`) ,
  UNIQUE INDEX `Code_UNIQUE` (`Code` ASC) ,
  INDEX `FK_USER_idx` (`CodeUser` ASC) ,
  CONSTRAINT `FK_USER`
    FOREIGN KEY (`CodeUser` )
    REFERENCES `orchid_db`.`users` (`User` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `orchid_db`;

DELIMITER $$

USE `orchid_db`$$
DROP TRIGGER IF EXISTS `orchid_db`.`trg_CreationDate` $$
USE `orchid_db`$$


CREATE TRIGGER trg_CreationDate BEFORE INSERT ON products
  FOR EACH ROW 
	BEGIN
		set New.CreationDate = Now();
		if (New.OfferPrice is null) then
			set New.OfferPrice = 0;
		end if;
	END$$


DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `orchid_db`.`brands`
-- -----------------------------------------------------
START TRANSACTION;
USE `orchid_db`;
INSERT INTO `orchid_db`.`brands` (`Code`, `Description`, `Active`) VALUES (1, 'TOMMY', 'A');
INSERT INTO `orchid_db`.`brands` (`Code`, `Description`, `Active`) VALUES (2, 'CHANNEL', 'A');
INSERT INTO `orchid_db`.`brands` (`Code`, `Description`, `Active`) VALUES (3, 'BOSS', 'A');

COMMIT;

-- -----------------------------------------------------
-- Data for table `orchid_db`.`products`
-- -----------------------------------------------------
START TRANSACTION;
USE `orchid_db`;
INSERT INTO `orchid_db`.`products` (`Code`, `Name`, `Price`, `OfferPrice`, `Status`, `CreationDate`, `ImagePath`, `Description`, `CodeBrand`) VALUES (1, 'Agua Marina', 100, 90, 'A', NULL, 'prd_01.jpg', 'Perfume de fragancia azul - Perfume de fragancia azul - Perfume de fragancia azul - Perfume de fragancia azul - Perfume de fragancia azul - Perfume de fragancia azul', 1);
INSERT INTO `orchid_db`.`products` (`Code`, `Name`, `Price`, `OfferPrice`, `Status`, `CreationDate`, `ImagePath`, `Description`, `CodeBrand`) VALUES (2, 'Grama Silvestre', 110, 0, 'A', NULL, 'prd_02.jpg', 'Desierto del mohave - Desierto del mohave - Desierto del mohave - Desierto del mohave - Desierto del mohave - Desierto del mohave', 2);
INSERT INTO `orchid_db`.`products` (`Code`, `Name`, `Price`, `OfferPrice`, `Status`, `CreationDate`, `ImagePath`, `Description`, `CodeBrand`) VALUES (3, 'Desierto Rojo', 115, 0, 'A', NULL, 'prd_03.jpg', 'Lago de apulo con pescado - Lago de apulo con pescado - Lago de apulo con pescado - Lago de apulo con pescado - Lago de apulo con pescado - Lago de apulo con pescado', 1);
INSERT INTO `orchid_db`.`products` (`Code`, `Name`, `Price`, `OfferPrice`, `Status`, `CreationDate`, `ImagePath`, `Description`, `CodeBrand`) VALUES (4, 'Frutas Tropicales', 120, 105, 'A', NULL, 'prd_04.jpg', 'Verde limon con semita - Verde limon con semita - Verde limon con semita - Verde limon con semita - Verde limon con semita - Verde limon con semita', 3);
INSERT INTO `orchid_db`.`products` (`Code`, `Name`, `Price`, `OfferPrice`, `Status`, `CreationDate`, `ImagePath`, `Description`, `CodeBrand`) VALUES (5, 'Frutas Marinas', 125, 0, 'A', NULL, 'prd_05.jpg', 'Agua de rosa de Jamaica - Agua de rosa de Jamaica - Agua de rosa de Jamaica - Agua de rosa de Jamaica - Agua de rosa de Jamaica', 2);
INSERT INTO `orchid_db`.`products` (`Code`, `Name`, `Price`, `OfferPrice`, `Status`, `CreationDate`, `ImagePath`, `Description`, `CodeBrand`) VALUES (6, 'Coco Chanel', 130, 115, 'A', NULL, 'prd_06.jpg', 'Paraiso tropical y algo mas, Paraiso tropical y algo mas, Paraiso tropical y algo mas, Paraiso tropical y algo mas', 3);

COMMIT;

-- -----------------------------------------------------
-- Data for table `orchid_db`.`profiles`
-- -----------------------------------------------------
START TRANSACTION;
USE `orchid_db`;
INSERT INTO `orchid_db`.`profiles` (`Code`, `Description`, `Active`) VALUES ('USER', 'Usuario de consulta', 'A');
INSERT INTO `orchid_db`.`profiles` (`Code`, `Description`, `Active`) VALUES ('ADMIN', 'Usuario Administrador', 'A');

COMMIT;

-- -----------------------------------------------------
-- Data for table `orchid_db`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `orchid_db`;
INSERT INTO `orchid_db`.`users` (`User`, `Name`, `Active`, `Pass`, `CodeProfile`) VALUES ('user', 'Usuario de consulta', 'A', 'pass', 'USER');
INSERT INTO `orchid_db`.`users` (`User`, `Name`, `Active`, `Pass`, `CodeProfile`) VALUES ('admin', 'Usuario Administrador', 'A', 'admin', 'ADMIN');

COMMIT;
