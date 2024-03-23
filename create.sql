-- Create database named 'app'
CREATE DATABASE app;

-- Drop schema epsi and all its objects if it exists
DROP SCHEMA IF EXISTS epsi CASCADE;

-- Create epsi schema if not exists
CREATE SCHEMA IF NOT EXISTS epsi;

-- Switch to epsi schema
SET search_path TO epsi;

-- Create patient table with UUID for psychologist_id
CREATE TABLE patient (
    psychologist_id UUID,
    patient_id UUID PRIMARY KEY,
    name VARCHAR(100),
    birthdate VARCHAR(12),
    cpf VARCHAR(14),
    phone VARCHAR(15),
    emergency_phone VARCHAR(15),
    city VARCHAR(100),
    province VARCHAR(50),
    email_address VARCHAR(100),
    address VARCHAR(255)
);
