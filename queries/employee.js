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


function updateEmployeeRoleFnc() {
    inquirer
        .prompt([
            // questions required:
            // 1 - Which employee's role do you want to update? - provide list of all employees
            // 2 - Which role do you want to assign to the selected employee? - provide list of all roles
            //added to the database
        ])
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