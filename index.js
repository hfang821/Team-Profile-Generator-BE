//const {writeFile, copyFile} = require('./utils/generate-site');
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const allEmployees = [];

const directoryPrompt = () =>{
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Select an appropriate employee type to continue.',
            choices: ['Engineer','Intern',"I'm done with adding employees"]
        }
    ])
    .then ((data)=> {
        switch(data.option) {
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            default:
                finished();
                break;
        }
    });
};

const getManager =()=>{
   inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the Manager? (Required)',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                } 
                console.log("You need to enter a name to proceed!");
                return false;
            }
        },

        {
            type: 'input',
            name: 'id',
            message: 'What is his/her Manager id? (Required)',
            validate: idInput => {
                if(idInput) {
                    return true;
                }
                console.log('You need to enter a Manager id to proceed!');
                return false;
            }

        },

        {
            type: 'input',
            name: 'email',
            message: 'What is his/her email address?',
            validate: emailInput => {
                if(emailInput) {
                    return true;
                }
                console.log('You need to enter the email address to proceed!');
                return false;
            }
        },

        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter the office number of the manager.',
            validate: officeNumberInput => {
                if(officeNumberInput) {
                    return true;
                }
                console.log('You need to enter the office number to proceed!');
                return false;
            }
        }
    ])
    .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        manager.role = manager.getRole();
        allEmployees.push(manager);
        directoryPrompt();
    })
};

const addEngineer = ()  => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the Engineer? (Required)',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                } 
                console.log("You need to enter a name to proceed!");
                return false;
            }
        },

        {
            type: 'input',
            name: 'id',
            message: 'What is his/her Engineer id? (Required)',
            validate: idInput => {
                if(idInput) {
                    return true;
                }
                console.log('You need to enter a Engineer id to proceed!');
                return false;
            }

        },

        {
            type: 'input',
            name: 'email',
            message: 'What is his/her email address? (Required)',
            validate: emailInput => {
                if(emailInput) {
                    return true;
                }
                console.log('You need to enter the email address to proceed!');
                return false;
            }
        },

        {
            type: 'input',
            name: 'github',
            message: 'Enter the Github Username of the Engineer. (Required)',
            validate: githubInput => {
                if(githubInput) {
                    return true;
                }
                console.log('You need to enter the github username to proceed!');
                return false;
            }
        }
    ])
    .then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        engineer.role = engineer.getRole();
        allEmployees.push(engineer);
        directoryPrompt();
    })
}

const addIntern = ()  => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the Intern? (Required)',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                } 
                console.log("You need to enter a name to proceed!");
                return false;
            }
        },

        {
            type: 'input',
            name: 'id',
            message: 'What is his/her Intern id? (Required)',
            validate: idInput => {
                if(idInput) {
                    return true;
                }
                console.log('You need to enter a Intern id to proceed!');
                return false;
            }

        },

        {
            type: 'input',
            name: 'email',
            message: 'What is his/her email address? (Required)',
            validate: emailInput => {
                if(emailInput) {
                    return true;
                }
                console.log('You need to enter the email address to proceed!');
                return false;
            }
        },

        {
            type: 'input',
            name: 'school',
            message: 'Enter the School name of the Intern. (Required)',
            validate: schoolInput => {
                if(schoolInput) {
                    return true;
                }
                console.log('You need to enter the school name to proceed!');
                return false;
            }
        }
    ])
    .then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        intern.role = intern.getRole();
        allEmployees.push(intern);
        directoryPrompt();
    })
}

getManager();

const finished = () => {
    console.log(allEmployees);
    const html = generatePage(allEmployees);

    const writeFile = html => {
        return new Promise((resolve, reject) => {
            fs.writeFile('./dist/index.html', html, err=> {
                if(err){
                    //if error: reject the promise and send the error to the promise's catch method.
                    reject(err);
                    return;
                }
    
                //resolve the promise if everything went fine.
                resolve({
                    ok: true,
                    message: 'file created successfully!'
                });
            });
        });
    };
    
    const copyFile = () => {
        return new Promise((resolve, reject) => {
            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if(err){
                    reject(err);
                    return;
                }
                resolve({
                    ok: true,
                    message: 'stylesheet attached successfully!'
                }); 
            });
        });
    };
    //the '.then' will execute the resolve function the promise is resolved. 
    //The '.catch' will execute if the promise has an error and is rejected.
    writeFile(html).then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });


    copyFile().then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });
}



/*
const promptGithub = employeeInfo =>{

    if(!employeeInfo.github) {
        employeeInfo.github =[];
    }

    console.log(`
    ================================================
    This is the info entered for an permanent employee
    Please enter his/her github username.
    ================================================
    `);

    return inquirer
    .prompt(
        {
            type: 'input',
            name: 'username',
            message: 'What is his/her github username? (Required)',
            validate: userNameInput => {
                if(userNameInput) {
                    return true;
                }
                console.log('You need to input a github username to proceed!');
                return false;
            }
        })
    .then(usernameData => {
        employeeInfo.github.push(usernameData);

        return employeeInfo;
    });
};

const promptSchool = employeeInfo =>{
    if(!employeeInfo.school) {
        employeeInfo.school =[];
    }

    console.log(`
    ================================================
    This is the info entered for an intern employee
    Please enter his/her school name.
    ================================================
    `);

    return inquirer
    .prompt( 
        {
            type: 'input',
            name: 'school',
            message: 'Enter a school name of this Intern.',
            validate: schoolInput => {
                if(schoolInput) {
                    return true;
                }
                console.log("You need to input the intern's school name to proceed!");
                return false;
            }
        })
    .then(schoolData => {
            employeeInfo.school.push(schoolData);
    
            return employeeInfo;
        });
};


promptUser()
.then(employeeInfo => {
    if(employeeInfo.option === 'Intern') {
        return promptSchool(employeeInfo);
    } 
    return promptGithub(employeeInfo);
})
.then(employeeInfo => {
    return generatePage(employeeInfo);
}) 
.then(pageHTML => {
    return writeFile(pageHTML);
})
.then(writeFileResponse => {
    console.log(writeFileResponse);
    //copy the pre-written style.css
    return copyFile();
})
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
.catch(err => console.log(err));

*/


