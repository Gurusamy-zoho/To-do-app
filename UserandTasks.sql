# Write Two table one is Users and another table is tasks for todo-app

CREATE DATABASE TodoList;
use TodoList;

CREATE TABLE Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

SELECT * from users