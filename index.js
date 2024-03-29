// TODO: 
    // format all displayed tables!  
    // add descriptions to all code
    // remove dead code
    // remove all HIGHLIGHTED working notes!

const inquirer = require("inquirer");
const mysql = require('mysql2');
const chalk = require('chalk');
// const db = require('./config/connection');
// const department = require('./queries/department');
// const employee = require('./queries/employee');
// const role = require('./queries/role');

// COMPLETE!
// DESCRIPTION: Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      password: 'Purple1!',
      database: 'employees_db'
    },
);



//COMPLETE!
// DESCRIPTION: Triggers connection to database and welcomes user to app.
db.connect(function (err){
    if (err) throw err;
    console.log(chalk.magentaBright('------------------------------\n' +
        'Welcome to the CMS Employee Tracker\n' +
        '--------------------------------\n'));
    startApp();
});

//WORKING!
// DESCRIPTION: Root menu for app.
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


function startApp() {
    inquirer.prompt(menu).then(answers=>{
        //WORKING! FIXME: add department name! 
        if(answers.menu==="View all Employees") {
            
            // db.query('SELECT employee.id AS "Employee ID", CONCAT_WS (" ", employee.first_name, employee.last_name) AS "Full Name", r.title AS "Job Title", r.salary AS "Salary", d.department_name AS "Department Name" FROM employee INNER JOIN role as r on employee.role_id = r.id INNER JOIN department as d on role.department_id = d.id LEFT JOIN employee as e on employee.manager_id=e.id', function (err, results) {
            db.query('SELECT employee.id AS "Employee ID", CONCAT_WS (" ", employee.first_name, employee.last_name) AS "Full Name", r.title AS "Job Title", r.salary AS "Salary", CONCAT(e.first_name, " " , e.last_name) AS Manager FROM employee INNER JOIN role as r on employee.role_id = r.id LEFT JOIN employee as e on employee.manager_id=e.id', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright("All Employees:"));
                console.table(results);
                startApp();
            });
        }else if(answers.menu==="Add Employee") {
            addEmployeeFnc();
        }else if(answers.menu==="Update Employee Role") {
            // updateEmployeeRoleFnc();JOIN department ON role.department_id = department.department_name;
        //WORKING! 
        }else if(answers.menu==="View all Roles") {
            db.query('SELECT role.id as "Role ID", role.title AS "Job Title", d.department_name AS "Department Name", salary AS "Salary" FROM role join department as d on role.department_id = d.id', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright("All Roles:"));
                console.table(results);
                startApp();
            });
        }else if(answers.menu==="Add Role") {
            addRoleFnc();
            
        //WORKING! FIXME: need to format table.
        }else if(answers.menu==="View all Departments") {
            db.query('SELECT id AS "Department ID", department_name AS "Department Name" FROM department', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright("All Departments:"));
                console.table(results);
                startApp();
            });
        //WORKING!
        }else if(answers.menu==="Add Department") {
            addDepartmentFnc();
        } else {
            console.log(chalk.magentaBright('------------------------------\n' +
            'Thank you for using the CMS Employee Tracker\n' +
            '--------------------------------\n'));
            process.exit(0);
        }
    })
};


function addEmployeeFnc() {
    inquirer
        .prompt([
            {name: "firstName",
            type: "string",
            message: "What is the First Name of the Employee?"
            },
            {name: "lastName",
            type: "string",
            message: "What is the Last Name of the Employee?"
            },
            {name: "role",
            type: "list",
            message: "What is the Employees Role?",
            choices: allRolesFnc()
            },
            {name: "manager",
            type: "list",
            message: "Who is Employee's Manager?",
            choices: allManagersFnc()            
            },          
        ])
        .then((data)=>{
            console.log(data);

            // RESULTS FROM TEST RUN
            //{
            //     firstName: 'Barbra',
            //     lastName: 'Jean',
            //     role: 'Sales Team Manager',
            //     manager: 'NULL'
            // }
            //
            
            //Creating new employeed for prompts in startApp();
            
            // const newEmployee = new Employee(
            //     data.firstName,
            //     data.lastName,
            //     data.role,
            //     data.manager
            // );
            // allEmployees.push(newEmployee);
                
            // //creating query to add new employee to employee table. 
            // const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_name) VALUES ?";
            // const userAddedEmployee = [[data.firstName], [data.lastName], [data.role], [data.manager]];

            // db.query(sql, [userAddedEmployee], function (err, result) {
            //     console.log(result);
            //     if (err) throw err;
            //     console.log(`Added ${data.firstName} ${data.lastName} to the database` );
            // });

            //triggering main function to continue app.
            startApp();
        })
};


function addRoleFnc() {
    inquirer
        .prompt([
            {name: "roleName",
            type: "string",
            message: "What is the name of the Role?"
            },
            {name: "salary",
            type: "string",
            message: "What is the salary of the Role?"
            },
            {name: "department",
            type: "list",
            message: "Which Department does the Role belong to?",
            choices: allDepartmentsFnc()
            },
        ])
        .then((data)=>{
            console.log(data); //used for debugging

            const departmentID = departmentArr.indexOf(data.department);
            const userAddedRole = [[data.roleName], [data.salary], [departmentID]]; //WORKING! 
            const sql = "INSERT INTO role (title, salary, department_id) VALUES ('" + `${data.roleName}` + "', '" + `${data.salary}` + "', " + `${data.departmentID}` + ")";
            
            console.log(userAddedRole); //used for debugging
            
            //creating query to add new Role to Role table. 
            db.query(sql, function (err, result) {
                console.log(result);
                if (err) throw err;
                console.log(`Added ${data.title} role to the database` );
                //triggering main function to continue app.
                startApp();
            });
        })

        // questions required:
        // 1 - what is the name of the role?
        // 2 - what is the salary of the role?
        // 3 - which department does the role belong to?
        //added to the database
}


function updateEmployeeRoleFnc() {
    inquirer
        .prompt([
            // questions required:
            // 1 - Which employee's role do you want to update? - provide list of all employees
            // 2 - Which role do you want to assign to the selected employee? - provide list of all roles
            //added to the database
        ])
}


//COMPLETE! WORKING!
function addDepartmentFnc() {
    inquirer
        .prompt([
            {name: "departmentName",
            type: "string",
            message: "What is the name of the Department?"
            },
        ])
        .then((data)=>{
            //Creating new Department for prompts in startApp();
                           
            //creating query to add new Department to Department table. 
            const sql = "INSERT INTO Department (department_name) VALUES ?";
            const userAddedDepartment = [[data.departmentName]];

            db.query(sql, [userAddedDepartment], function (err, result) {
                if (err) throw err;
                console.log(`Added ${data.departmentName} Department to the database` );
                //triggering main function to continue app.
                startApp();
            });
        })
}

let managerArr = ['NULL'];
function allManagersFnc() {
    db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            managerArr.push(results[i].first_name);          
        }
    })
    return managerArr;
};

let roleArr = [];
function allRolesFnc() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);          
        }
    })
    return roleArr;
};

let departmentArr = [];
function allDepartmentsFnc() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            departmentArr.push(results[i].department_name);          
        }
    })
    return departmentArr;
};


// //DESCRIPTION: Function to initialize app
// function initFnc() {
//     console.log(chalk.magentaBright('------------------------------\n' +
//         'Welcome to the CMS Employee Tracker\n' +
//         '--------------------------------\n'));
//     startApp();
// }

// //DESCRIPTION: Function call to initialize app
// initFnc();