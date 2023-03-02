const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost', // will not work on mac, use ip: '127.0.0.1' instead
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: 'employees_db' // Database name here
  },
  console.log(`Connected to the employees_db database.`) // Database name here
);

// Main Page Quesetions | mainQ()
const mainQuestion = [
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'do',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
  },
];

// Question for "Add Department" choice | departmentQ()
const departmentQuestion = [
  {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'addDepartment',
  },
];

// Questions for "Add Role" choice | roleQ()
const roleQuestion = [
  {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'roleName',
  },
  {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'roleSalary',
  },
  {
    type: 'list',
    message: 'Which department does the role belong to?',
    name: 'roleDepartment',
    choices: [{name:'Sales', value: 1}, {name: 'Engineering', value: 2}, {name: 'Finance', value: 3}, {name:'Legal', value: 4}]
    // array.map() to create a choices array from the departments in the database consisting of objects with the name of the department and id as a value.
  },
];

// Questions for "Add Employee" choice | employeeQ()
const employeeQuestion = [
  {
      type: 'input',
      message: 'What is the employee\'s first name?',
      name: 'empfName',
  },
  {
    type: 'input',
    message: 'What is the employee\'s last name?',
    name: 'emplName',
  },
  {
    type: 'list',
    message: 'What is the employee\'s role?',
    name: 'empRole',
    choices: [{name: 'Sales Lead', value: 1}, {name: 'Salesperson', value: 2}, {name: 'Lead Engineer', value: 3}, {name: 'Software Engineer', value: 4}, {name: 'Acount Manager', value: 5}, {name: 'Acountant', value: 6}, {name: 'Legal Team Lead', value: 7}, {name: 'Lawyer', value: 8}]
  },
  {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'empManager',
    choices: [{name: 'None', value: 9}, {name: 'John Doe', value: 1}, {name: 'Mike Chan', value: 2}, {name: 'Ashley Rodriguez', value: 3}, {name: 'Kevin Tupik', value: 4}, {name: 'Kunal Singh', value: 5}, {name: 'Malia Brown', value: 6}, {name: 'Sarah Lourd', value: 7}, {name: 'Tom Allen', value: 8}]
  },
];

// Questions for "Update Employee Role" choice | updateRoleQ()
const updateRoleQuestion = [
  {
    type: 'list',
    message: 'Which employee\'s role do you want to update?',
    name: 'updateRoleName',
    choices: [{name: 'John Doe', value: 1}, {name: 'Mike Chan', value: 2}, {name: 'Ashley Rodriguez', value: 3}, {name: 'Kevin Tupik', value: 4}, {name: 'Kunal Singh', value: 5}, {name: 'Malia Brown', value: 6}, {name: 'Sarah Lourd', value: 7}, {name: 'Tom Allen', value: 8}]
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'updateRole',
    choices: [{name: 'Sales Lead', value: 1}, {name: 'Salesperson', value: 2}, {name: 'Lead Engineer', value: 3}, {name: 'Software Engineer', value: 4}, {name: 'Acount Manager', value: 5}, {name: 'Acountant', value: 6}, {name: 'Legal Team Lead', value: 7}, {name: 'Lawyer', value: 8}]
  },
];

init();

function init() {
  console.log(`
  _____                 _                       
 | ____|_ __ ___  _ __ | | ___  _   _  ___  ___ 
 |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\
 | |___| | | | | | |_) | | (_) | |_| |  __/  __/
 |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|
  __  __         |_|            |___/           
 |  \\/  | __ _ _ __   __ _  __ _  ___ _ __      
 | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|     
 | |  | | (_| | | | | (_| | (_| |  __/ |        
 |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|        
                           |___/                `);
    mainQ();
}

function mainQ() {
  inquirer
    .prompt(mainQuestion)
    .then((response) => {
      switch (response.do) {
      case "View All Departments":   // ------VIEW------
        viewDep();
        break;
      case "View All Roles":         // ------VIEW------
        viewRole();
        break;
      case "View All Employees":     // ------VIEW------
        viewEmp();
        break;
      case "Add Department":         // ------ADD------
        departmentQ();
        break;
      case "Add Role":               // ------ADD------
        roleQ();
        break;
      case "Add Employee":           //  ------ADD------
        employeeQ();
        break;
      case "Update Employee Role":   // ------UPDATE------
        updateRoleQ();
        break;
      case "Quit":                   // ------QUIT------
        process.exit(console.log ('Thank you for using Employee Manager!'));
      default:
        break;
    }
  });
}

// View Departments
function viewDep() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    mainQ();
  });
}

// View Roles
function viewRole() {
  db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    console.table(results);
    mainQ();
  });
}

// View Employees
function viewEmp() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;', function (err, results) {
    console.table(results);
    mainQ();
  });
}

// Add Department
function departmentQ() {
  inquirer
    .prompt(departmentQuestion)
    .then((response) => {
      db.query(`INSERT INTO department (name) VALUES ("${response.addDepartment}")`, function (err, results) {
        if (err) throw err;
        //console.log(results);
      });
      console.log(`Added ${response.addDepartment} to the database`)
      mainQ();
    });
}

// Add Role
function roleQ() {
  inquirer
    .prompt(roleQuestion)
    .then((response) => {
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.roleName, response.roleSalary, response.roleDepartment], function (err, results) {
        if (err) throw err;
        //console.log(results);
      });
      console.log(`Added ${response.roleName} to the database`)
      mainQ();
    });
}

// Add Employee
function employeeQ() {
  inquirer
    .prompt(employeeQuestion)
    .then((response) => {
      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.empfName, response.emplName, response.empRole, response.empManager], function (err, results) {
        if (err) throw err;
        //console.log(results);
      });
      console.log(`Added ${response.empfName} ${response.emplName} to the database`)
      mainQ();
    });
}

// Update Employee Role
function updateRoleQ() {
  inquirer
    .prompt(updateRoleQuestion)
    .then((response) => {
      let role_id = response.updateRole
      let id = response.updateRoleName
      db.query("UPDATE employee set role_id = ? where id = ?;", [role_id, id], function (err, results) {
        if (err) throw err;
        //console.log(results);
      });
      console.log(`Updated employee\'s role`)
      mainQ();
    });
}