USE db_lab;

DROP DATABASE IF EXISTS web_db;

CREATE DATABASE IF NOT EXISTS web_db;

USE web_db;

CREATE TABLE news (
	id INT auto_increment PRIMARY KEY,
    title NVARCHAR(50) NOT NULL,
    article nvarchar(1000));
    
CREATE TABLE fans (
	id INT auto_increment primary KEY,
    ap_date longtext,
    appeal nvarchar(1000));