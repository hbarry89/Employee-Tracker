const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// require('dotenv').config(); // To hide mysql password in connection

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
//     password: 'rootroot', // process.env.MYSQL_PASSWORD
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

const mainQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'do',
        choices: ['View All Employees', 'Add Employees', 'Update Employee Role', 'View All Roles', 'Add Roles', 'View All Departments', 'Add Departments', 'Quit']
        // in the choices array, double check options and spelling, add next question at the end
    },
];

// const secondQuestion = [
//   {
//       type: 'list',
//       message: 'What is the name of the department?',
//       name: 'department',
//       choices: ['', '']
//   },
// ];

// const thirdQuestion = [
//   {
//       type: 'list',
//       message: 'What is the name of the department?',
//       name: 'department',
//       choices: ['', '']
//   },
// ];

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
  
    inquirer
  .prompt(mainQuestion)
  .then((response) => {
    console.log(response);
  }
  );
}

init();

//-------------------------- From Instructor
// const initialQuestion = [
//     {
//        type: 'list',
//      message: 'What would you like to do?',
//      choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit", "want to try again"],
//      name: 'option' 
//     }
// ]

// init();
// function init(){
//     initialQ();
// }

// function initialQ () {
// inquirer.prompt(initialQuestion)
// .then(ans=>{
//     console.log(ans);
//     // ans.option === "want to try again" ? initialQ() : process.exit();
//     switch (ans.option) {
//         case "want to try again":
//             initialQ()
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