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
    console.log(`Connected to the employees_db database.`)
);

inquirer
    .prompt ([
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
        default: "View all employees",
        }
    ])
    .then((data) => {
        if (data.menu === "View all Employees"){
            viewEmployeesQuery;
        }else{
            console.log("not possible");
        };
    });

const viewEmployeesQuery = `
    db.query("SELECT * from employees", function (err, results) {
        console.log(results);
    });
`



// if(answers.options==="Show favorite books") {
//     db.query('SELECT * FROM favorite_books', function (err, results) {
//         console.log(results);
//       });
//       db.end();
//       console.log("Done");
// } else {
//     process.exit(0);
// }