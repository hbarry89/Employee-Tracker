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
    choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
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
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Acount Manager', 'Acountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
  },
  {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'empManager',
    choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
  },
];

// Questions for "Update Employee Role" choice | updateRoleQ()
const updateRoleQuestion = [
  {
    type: 'list',
    message: 'Which employee\'s role do you want to update?',
    name: 'updateRoleName',
    choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'updateRole',
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Acount Manager', 'Acountant', 'Legal Team Lead', 'Lawyer']
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
  db.query('SELECT role.id, role.name, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    // role: id, name, x, salary | department: name
    console.table(results);
    mainQ();
  });
}

// View Employees
function viewEmp() {
  db.query('SELECT employee.id, role.name, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    // employee: id, first name, last name | role: name, | department: name | role: salary | employee: manager_id
    //console.log(results);
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
      db.query(`INSERT INTO role (name, salary, department_id) VALUES ("${response.roleName}", ${response.roleSalary}, ${response.roleDepartment})`, function (err, results) {
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
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.empfName}", "${response.emplName}", ${response.empRole}, ${response.empManager})`, function (err, results) {
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
      db.query(`UPDATE employee set role_id = ? where id = ?;`, function (err, results) {
        if (err) throw err;
        //console.log(results);
      });
      console.log(`Updated employee\'s role`)
      mainQ();
    });
}

// 222 update role question, after user sselecting the one of the employee, you haev to display the list of role, then if user select one of the role then u can update using the id of employee and ir of the role