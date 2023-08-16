CREATE TABLE persona
(
  dni INT(11) NOT NULL,
  nombre VARCHAR (80) not NULL,
  apellido VARCHAR (80) not NULL,
  PRIMARY KEY (dni),
  UNIQUE (dni)
);

CREATE TABLE usuario
(
  mail VARCHAR(40),
  nickname VARCHAR (20) not NULL,
  password VARCHAR (20) not NULL,
  PRIMARY KEY (mail),
  UNIQUE (mail)
);