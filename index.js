const inquirer = require("inquirer");
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'Purple1!',
      database: 'employees_db'
    },
);

db.connect(function (err){
    if (err) throw err;
    console.log(`Connected to the employees_db database.`);
    startApp();
});

const menu = [
    {name: "menu",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all Employees",
        "Add Employee",
        "Update Employee Role",
        "View all Roles",
        "Add Role",
        "View all Departments",
        "Add Department",
        "Quit",
        ],
    default: "View all employees"
    }
]

async function startApp() {
    inquirer.prompt(menu).then(answers=>{
        if(answers.menu==="View all Employees") {
            db.query('SELECT * FROM employee', function (err, results) {
                console.table(results);
            });
            console.log("All Employees:");
            startApp();
        }else if(answers.menu==="Add Employee") {
            addEmployeeFnc();
        }else if(answers.menu==="Update Employee Role") {
            updateEmployeeRoleFnc();
        }else if(answers.menu==="View all Roles") {
            db.query('SELECT * FROM role', function (err, results) {
                console.table(results);
            });
            console.log("All Roles:");
        }else if(answers.menu==="Add Role") {
            addRoleFnc();
        }else if(answers.menu==="View all Departments") {
            db.query('SELECT * FROM department', function (err, results) {
                console.table(results);
            });
            console.log("All Departments:");
        }else if(answers.menu==="Add Department") {
            addDepartmentFnc();
        } else {
            console.log("exited successfully");
            process.exit(0);
        }
    })
};
