const inquirer = require("inquirer");
const mysql = require('mysql2');

// DESCRIPTION: links to JavaScript files for exported packages.
const Employee = require(`./lib/employee`)
const Role = require(`./lib/role`)
const Department = require(`./lib/department`)

//DESCRIPTION: Global Variables
const allEmployees = [];
const allRoles = [
    "Sales Team Manager",
    "Salesperson",
    "Leagal Team Manager",
    "Lawyer",
    "Engineering Team Manager",
    "Software Engineer",
    "Finance Team Manager",
    "Accountant"
];
const allManagers = [
    "Rory Gilmore",
    "Lorelai Gilmore",
    "Leagal Team Manager",
    "Sookie St.James",
    "Richard Gilmore",
    "NULL"
];
const allDepartments = [
    "HR",
    "Sales",
    "Legal",
    "Finance",
    "Engineering"
]

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

function startApp() {
    inquirer.prompt(menu).then(answers=>{
        if(answers.menu==="View all Employees") {
            db.query('SELECT * FROM employee', function (err, results) {
                if (err) throw err;
                console.log("All Employees:");
                console.table(results);
                startApp();
            });
        }else if(answers.menu==="Add Employee") {
            addEmployeeFnc();
        }else if(answers.menu==="Update Employee Role") {
            updateEmployeeRoleFnc();
        }else if(answers.menu==="View all Roles") {
            db.query('SELECT * FROM role', function (err, results) {
                if (err) throw err;
                console.log("All Roles:");
                console.table(results);
                startApp();
            });
        }else if(answers.menu==="Add Role") {
            addRoleFnc();
        }else if(answers.menu==="View all Departments") {
            db.query('SELECT * FROM department', function (err, results) {
                if (err) throw err;
                console.log("All Departments:");
                console.table(results);
                startApp();
            });
        }else if(answers.menu==="Add Department") {
            addDepartmentFnc();
        } else {
            console.log("exited successfully");
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


//WORKING!
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

