-- Create user and tablespace for Card Portal
-- Run this as SYSDBA

-- Create tablespace
CREATE TABLESPACE cardportal_data
DATAFILE 'cardportal_data.dbf'
SIZE 100M
AUTOEXTEND ON
NEXT 10M
MAXSIZE 1G;

-- Create user
CREATE USER cardportal
IDENTIFIED BY password
DEFAULT TABLESPACE cardportal_data
TEMPORARY TABLESPACE temp
QUOTA UNLIMITED ON cardportal_data;

-- Grant privileges
GRANT CONNECT, RESOURCE TO cardportal;
GRANT CREATE SESSION TO cardportal;
GRANT CREATE TABLE TO cardportal;
GRANT CREATE SEQUENCE TO cardportal;
GRANT CREATE VIEW TO cardportal;
GRANT CREATE PROCEDURE TO cardportal;

-- Additional privileges for development
GRANT CREATE ANY SEQUENCE TO cardportal;
GRANT CREATE ANY TABLE TO cardportal;
GRANT ALTER ANY TABLE TO cardportal;
GRANT DROP ANY TABLE TO cardportal;