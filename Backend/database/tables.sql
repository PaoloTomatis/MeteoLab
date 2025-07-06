CREATE DATABASE MeteoLab_DB;
USE MeteoLab_DB;

CREATE TABLE data (
    id INT(11) NOT NULL AUTO_INCREMENT,
    temperature INT(11) NOT NULL,
    humidity INT(11) NOT NULL,
    light INT(11) NOT NULL,
    date VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);