CREATE DATABASE Squadra

CREATE TABLE Squadra..Sistema
(
Id int identity primary key,
Descricao nvarchar(100) not null,
Sigla nvarchar(10) not null,
Email nvarchar(100),
Justificativa nvarchar(500),
NovaJustificativa nvarchar(500),
Status bit,
DataUltimaModificacao datetime2,
Url nvarchar(100),
DataCriacao datetime2

)

CREATE TABLE Squadra..Usuario
(
Id int identity primary key,
Username nvarchar(max),
Password nvarchar(max),
Cargo nvarchar(max),
DataCriacao datetime2,
DataUltimaModificacao datetime2
)

INSERT INTO Squadra..Usuario VALUES ('Teste','teste', 'Gerente', GetDate(), GetDate())
