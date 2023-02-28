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
const mainQuestion = [
  {
      type: 'list',
      message: 'What would you like to do?',
      name: 'do',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role'] // ,'Quit'
      // add next question at the end
      // mainQ()
  },
];

// Option "Add Department" Quesetion
const departmentQuestion = [
  {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'addDepartment',
      //console.log(`Added ${department} to the database`)
      // departmentQ()
  },
];

// Option "Add Role" Quesetion
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
  //console.log(`Added ${roleName} to the database`)
  // roleQ()
];

// Option "Add Employee" Quesetion
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
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Acount Manager', 'Acountant', 'Legal Team Lead'] // there is more
  },
  {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'empManager',
    choices: ['None', 'John Doe'] // there is more
  },
  //console.log(`Added ${empfName} ${emplName} to the database`)
  // employeeQ()
];

// Option "Update Employee Role" Quesetion
const updateRoleQuestion = [
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
  //console.log(`Updated employee\'s role`)
  // updateRoleQ()
];

init();

function init() {
    mainQ();
}

function mainQ() {
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
  
  //   inquirer
  // .prompt(mainQuestion)
  // .then((response) => {
  //   console.log(response);
  // });

  inquirer
  .prompt(mainQuestion)
  .then((answers) => {
    console.log(answers);
      switch (ans.option) {
      case "View All Departments":    // ------VIEW------
        viewDep(); // presented with a formatted table showing department names and department ids
        break;
      case "View All Roles":          // ------VIEW------
        viewRole(); // presented with the job title, role id, the department that role belongs to, and the salary for that role
        break;
      case "View All Employees":     // ------VIEW------
        viewEmp(); // presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        break;
      case "Add Department":          // ------ADD------
        departmentQ(); // prompted to enter the name of the department and that department is added to the database
        break;
      case "Add Role":               // ------ADD------
        roleQ(); // prompted to enter the name, salary, and department for the role and that role is added to the database
        break;
      case "Add Employee":           //  ------ADD------
        employeeQ(); // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        break;
      case "Update Employee Role":    // ------UPDATE------
        updateRoleQ(); // prompted to select an employee to update and their new role and this information is updated in the database 
        break;
      case "Quit":                    // ------QUIT------
        process.exit();
        break; 
      default:
        break;
    }
  });
}

function viewDep() {

}

function viewRole() {

}

function viewEmp() {

}

function departmentQ() {

}

function roleQ() {

}

function employeeQ() {

}

function updateRoleQ() {
  
}