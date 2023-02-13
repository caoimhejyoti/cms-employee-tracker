INSERT INTO department (department_name)
VALUES  ('HR'),
        ('Sales'),
        ('Legal'),
        ('Finance'),
        ('Engineering');


INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Team Manager', 100000.00, 2),
        ('Salesperson', 80000.00, 2),
        ('Leagal Team Manager', 250000.00, 3),
        ('Lawyer', 190000.00, 3),
        ('Engineering Team Manager', 150000.00, 4),
        ('Software Engineer', 120000.00, 4),
        ('Finance Team Manager', 160000.00, 5),
        ('Accountant', 120000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Rory', 'Gilmore', 1, NULL),
        ('Lane', 'Kim', 2, 1),
        ('Lorelai', 'Gilmore', 3, NULL ),
        ('Luke', 'Danes', 4, 3),
        ('Sookie', 'St.James', 5, NULL),
        ('Kirk', 'Gleason', 6, 5),
        ('Richard', 'Gilmore', 7, NULL),
        ('Emily', 'Gilmore', 8, 7);


-- INSERT INTO manager (first_name, last_name, role_id)
-- VALUES  ('Rory', 'Gilmore', 1);,
--         ('Lorelai', 'Gilmore', 3),
--         ('Sookie', 'St.James', 5),
--         ('Richard', 'Gilmore', 7);
        
