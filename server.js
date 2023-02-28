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
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
      // add next question at the end
  },
];

// Option "Add Department" Quesetion
const departmentQuestion = [
  {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'addDepartment',
      //console.log(`Added ${department} to the database`)
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
];

// Option "Update Employee Role" Quesetion
const updateEmpRoleQuestion = [
  {
    type: 'list',
    message: 'Which employee\'s role do you want to update?',
    name: 'updateEmpRoleName',
    choices: ['John Doe', 'Mike Chan'] // there is more
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'updateEmpRole',
    choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Acount Manager', 'Acountant', 'Legal Team Lead'] // there is more
  },
  //console.log(`Updated employee\'s role`)
];

init();

function init(){
    mainPage();
}

function mainPage() {
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
  
    inquirer
  .prompt(mainQuestion)
  .then((response) => {
    console.log(response);
  });
}

// function initialQ () {
// inquirer.prompt(initialQuestion)
// .then(ans=>{
//     console.log(ans);
//     switch (ans.option) {
//         case "View All Employees":
//             initialQ() // 3. display employees table     ------VIEW------
//             break;
//         case "Add Employee":
//             initialQ() // 6. another question             ------ADD------
//             break;
//         case "Update Employee Role":
//             initialQ() // 7. another question            ------UPDATE------
//             break;
//         case "View All Roles":
//             initialQ() // 2. display roles table          ------VIEW------
//             break;
//         case "Add Role":
//             initialQ() // 5. another question            ------ADD------
//             break;
//         case "View All Departments":
//             initialQ() // 1. display departments table   ------VIEW------
//             break;
//         case "Add Department":
//             initialQ() // 4. another question            ------ADD------
//             break;
//         case "Quit":
//             process.exit();                              ------QUIT------
//             break; 
//         default:
//             break;
//     }
// })
// }

//-------------- Hide password instructions:------------------
// 1. Create a '.env' file and insert inside it: MYSQL_PASSWORD=rootroot
// 2. Add that '.env' file to .gitignore (it is already in .gitignore if created by github)
// 3. Import package: require('dotenv').config();
// 4. On server.js level, install npm package (dotenv) by running this command: npm install dotenv
// 5. Insert the following for your password in the connection code: process.env.MYSQL_PASSWORD,