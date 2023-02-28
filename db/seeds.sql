-- Use employees_db --
USE employees_db;

-- Add department, role, employee --
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (name, salary, department_id)
VALUES ("Role 1", 50000, 1),
       ("Role 2", 60000, 2),
       ("Role 3", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, NULL),
       ("Amira", "Afzal", 2, 1),
       ("Christoper", "Lee", 3, 2);

       -- INSERT INTO department (name) VALUES (?);

-- INSERT INTO role (name, salary, department_id) VALUES (?, ?, ?);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);

-- -- Update role --
-- UPDATE employee set role_id = ? where id = ?;