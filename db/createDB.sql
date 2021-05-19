CREATE DATABASE imageresizer;

USE imageresizer;

	
CREATE TABLE images (
	id_image INT PRIMARY KEY AUTO_INCREMENT,
	metadata VARCHAR(1000),
	image_path VARCHAR(1000)
);
