const inquirer = require("inquirer");
const mysql = require('mysql2');
const chalk = require('chalk');

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

module.exports = {
    addDepartmentFnc,
    departmentArr,
    allDepartmentsFnc
}