INSERT INTO department (name)
VALUES ("Department 1"),
       ("Department 2"),
       ("Department 3");

INSERT INTO role (name, salary, department_id)
VALUES ("Role 1", 50000, 1),
       ("Role 2", 60000, 2),
       ("Role 3", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", 1, 3),
       ("Amira", "Afzal", 2, 3),
       ("Christoper", "Lee", 3, 3);