//lib modules
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//node modules
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const fileDirectory = path.resolve(__dirname, 'dist');
const filePath = path.join(fileDirectory, 'index.html');


const render = require('./lib/htmlRenderer')
const Employee = require('./lib/Employee');

//team array
const teamArr = [];

//Questions for all employees
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter employee name. ',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ('Please enter the employee name!');
            }
        }
    },
    {
       type: 'input',
       name: 'id',
       message: 'Please enter employee ID nubmer.',
       validate: idInput => {
           if (idInput) {
               return true;
           } else {
               console.log('Please enter the employee ID number!');
           }
       }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter employee email address.',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log ('Please enter employee email address!');
            }
        }
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select employee role.',
        choices: ['Engineer', 'Intern', 'Manager']

    }
];

//Manager questions
managerQuestions = [
    {
        type: 'input',
        name: 'officeNumber',
        messgae: "Please enter manager's office number (Required)",
        validate: officeNumberInput => {
            if (officeNumberInput) {
                return true;
            } else {
                console.log("Please enter an office number!");
                return false;
            }
        }
    }
]


//Engineer questions
engineerQuestions = [
    {
        type: 'input',
        name: 'github',
        message: "Please enter the engineer's GitHub username. (Required)",
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log("Please enter GitHub username!");
                return false;
            }
        }
    }
]

//Intern questions
internQuestions = [
    {
        type: 'input',
        name: 'school',
        message: " what school does the intern attend? (Required)",
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log("Please enter school name!");
                return false;
            }
        }
    }
]

    // Function to initialize the application
    const init = () => {
        if (fs.existsSync(filePath)) {
            inquirer.prompt({
                type: "confirm",
                message: "It looks like the index.html file in the 'dist' folder already exists. Do you want to overwrite it?",
                name: "overwrite"
            }).then(async (response) => {
    
                let overwrite = response.overwrite;
                if (await overwrite === true) {
                    console.log("Please enter your team information:")
                    newEmployee()
                } else if (await overwrite === false) {
                    console.log("Your index.html file in the 'dist' folder will not be overwritten. Please move the current index.html file to another folder before restarting.")
                }
            })
        } else {
            console.log("Welcome to the team profile generator. Please enter your team information below:")
            newEmployee()
        }
    };   


//new Employee function
const newEmployee = async () => {
    await inquirer.prompt(questions)
        .then((response) => {
            let name = response.name;
            let id = response.id;
            let email = response.id;
            let role = response.role;
            let officeNumber;
            let github;
            let school;

            if (role === "Manager") {
                inquirer.prompt(managerQuestions).then((response) => {
                    officeNumber = response.officeNumber;
                    let employee = new Manager(name, id, email, officeNumber);
                    teamArr.push(employee);
                    addEmployee(teamArr);
                });
            }
            else if (role === "Engineer") {
                inquirer.prompt(engineerQuestions).then((response) => {
                    github = response.github;
                    let employee = new Engineer(name, id, email, github);
                    teamArr.push(employee);
                    addEmployee(teamArr);
                });
            }
            else if (role === "Intern") {
                inquirer.prompt(internQuestions).then((response) => {
                    school = response.school;
                    let employee = new Intern(name, id, email, school);
                    teamArr.push(employee);
                    addEmployee(teamArr);
                });
            }
        });
}

//Fuction to add an employee
const addEmployee = async (array) => {
    await inquirer
     .prompt({
         type: "confirm",
         name: "addEmployee",
         message: "Would you like to add an employee? (Required)"

     }).then(async (response) => {
         var createEmployee = response.addEmployee;
         if (await createEmployee === true) {
             newEmployee();
         } 
         else if (await createEmployee === false) {
         // If the dist directory does not exist, then it creates the dist directory before creating the index.html file
         if (!fs.existsSync(fileDirectory)) {
             fs.mkdirSync(fileDirectory)
         }

         // calls the render function in the generateHTML.js file to create the index.html
         
         fs.writeFile(filePath, render(array), (err) => {
     
             if (err) {
                 return console.log(err);
             }
             
             // Success message
             console.log("Your index.html file has been generated in the 'dist' folder!");
         });

     }
 })
};
 // Function call to initialize app
 init();


