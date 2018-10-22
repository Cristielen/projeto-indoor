-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE Cliente (
idCliente int(20) PRIMARY KEY,
nmCliente varchar(120),
endCliente varchar(120),
E-mail varchar(50),
senha varchar(26),
Login varchar(15)
)

CREATE TABLE Sensor (
idSensor int(20) PRIMARY KEY,
idCliente int(20),
FOREIGN KEY(idCliente) REFERENCES Cliente (idCliente)
)

CREATE TABLE Temperatura (
mdHora float(10),
mdDIa float(10),
mdSemana float(10),
mdMês float(10),
idSensor int(20),
FOREIGN KEY(idSensor) REFERENCES Sensor (idSensor)
)

