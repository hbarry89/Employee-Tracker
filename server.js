const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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