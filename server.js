const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost', // will not work on mac, use ip: '127.0.0.1' instead
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: 'rootroot',
//     database: '_db' // Database name here
//   },
//   console.log(`Connected to the _db database.`) // Database name here
// );

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Main Page Quesetions
const mainQuestion = [  // mainQ()
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'do',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'] // ,'Quit'
      // add next question at the end
  },
];

// Option "Add Department" Quesetion
const departmentQuestion = [  // departmentQ()
  {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'addDepartment',
  },
];

// Option "Add Role" Quesetion
const roleQuestion = [  // roleQ()
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

// Option "Add Employee" Quesetion
const employeeQuestion = [  // employeeQ()
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
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Acount Manager', 'Acountant', 'Legal Team Lead'] // there is more
  },
  {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'empManager',
    choices: ['None', 'John Doe'] // there is more
  },
];

// Option "Update Employee Role" Quesetion
const updateRoleQuestion = [  // updateRoleQ()
  {
    type: 'list',
    message: 'Which employee\'s role do you want to update?',
    name: 'updateRoleName',
    choices: ['John Doe', 'Mike Chan'] // there is more
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'updateRole',
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Acount Manager', 'Acountant', 'Legal Team Lead'] // there is more
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
        case "View All Departments":    // ------VIEW------
          viewDep();
          break;
        case "View All Roles":          // ------VIEW------
          viewRole();
          break;
        case "View All Employees":     // ------VIEW------
          viewEmp();
          break;
        case "Add Department":          // ------ADD------
          departmentQ();
          break;
        case "Add Role":               // ------ADD------
          roleQ();
          break;
        case "Add Employee":           //  ------ADD------
          employeeQ();
          break;
        case "Update Employee Role":    // ------UPDATE------
          updateRoleQ();
          break;
        case "Quit":                    // ------QUIT------
          process.exit();
          break; // Is it an issue that break is grayed out?
        default:
          break;
      }
    });
}

function viewDep() {
// presented with a formatted table showing department names and department ids
}

function viewRole() {
// presented with the job title, role id, the department that role belongs to, and the salary for that role
}

function viewEmp() {
// presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
}

function departmentQ() { // Questions Propmts Work
// prompted to enter the name of the department and that department is added to the database
  inquirer
    .prompt(departmentQuestion)
    .then((response) => {
      console.log(`Added ${response.addDepartment} to the database`)
      mainQ();
    });
  // Need to actually add to the database
}

function roleQ() { // Add Role
  inquirer
    .prompt(roleQuestion)
    .then((response) => {
      console.log(`Added ${response.roleName} to the database`)
      mainQ();
    });
  // Need to actually add to the database
}

function employeeQ() { // Add Employee
  inquirer
    .prompt(employeeQuestion)
    .then((response) => {
      console.log(`Added ${response.empfName} ${response.emplName} to the database`)
      mainQ();
    });
  // Need to actually add to the database
}

function updateRoleQ() { // Update Employee Role
  inquirer
    .prompt(updateRoleQuestion)
    .then((response) => { // Is it an issue that response is grayed out?
      //console.log(response);
      console.log(`Updated employee\'s role`)
      mainQ();
    });
  // Need to actually add to the database
}