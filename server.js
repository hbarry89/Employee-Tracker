const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost', // will not work on mac, use ip: '127.0.0.1' instead
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: '_db' // Database name here
  },
  console.log(`Connected to the _db database.`) // Database name here
);

// Query database
db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'do',
        choices: ['View All Employees', 'Add Employees', 'Update Employee Role', 'View All Roles', 'Add Roles', 'View All Departments', 'Add Departments', 'Quit', 'View All Employees']
    },
];

function init() {
    inquirer
  .prompt(questions)
  .then((response) => {
    console.log(response);
  }
  );
}

init();