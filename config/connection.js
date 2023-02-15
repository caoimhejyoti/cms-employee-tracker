// TODO: 
    // format all displayed tables!  
    // add descriptions to all code
    // remove dead code
    // remove all HIGHLIGHTED working notes!

const inquirer = require("inquirer");
const mysql = require('mysql2/promise');
const chalk = require('chalk');

// COMPLETE!
// DESCRIPTION: Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      password: 'Purple1!',
      database: 'employees_db',
    //   port: 3000
    },
    );
    
    //COMPLETE!
    // DESCRIPTION: Triggers connection to database and welcomes user to app.
    function connection () {
        db.connect(function (err){
            if (err) throw err;
            console.log("connected! ")
    });
};

module.exports = db;