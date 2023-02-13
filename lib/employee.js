class Employee {
    constructor (id, first_name, last_name, role, manger_name){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.manger_name = manger_name;
    }

    getId() {
        return this.id;
    }

    getFullName() {
        return this.first_name + ' ' + this.last_name;
    }

    getRole(){
        return this.role;
    }
    
    getManager() {
        return this.manager;
    }
};

module.exports = Employee;