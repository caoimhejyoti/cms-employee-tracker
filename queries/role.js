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


