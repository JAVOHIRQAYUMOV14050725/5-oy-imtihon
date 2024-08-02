

CREATE DATABASE exam;
\c exam;

CREATE TABLE companies(
id serial PRIMARY KEY,
name varchar(255),
create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users(
id serial PRIMARY KEY,
login varchar(25),
 password varchar(25),
 full_name varchar(50),
company_id INT REFERENCES companies(id),
role varchar(20));

CREATE TABLE tasks(
id serial PRIMARY KEY,
 title varchar(255),
 description text,
 company_id INT REFERENCES companies(id),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );rh

CREATE TABLE user_tasks (
    id SERIAL PRIMARY KEY,      
    user_id INT NOT NULL,      
    task_id INT NOT NULL,       
    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    end_at TIMESTAMP,         
    status VARCHAR(30)          
);



