
// import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    saveNewProject,
    saveNewTransaction,
    addUserToProject,
    getAllProjects,
    getAllUsers,
    getProjectsForUser,
    saveNewActivity,
    getUser,
    getActivitiesForProject,
    addUserToActivity,
    getUsersForActivity,
    getUsersForProject,
    getFinishedActivitiesForUser,
    getAcitveActivitiesForUser,
    getAllProducts
};

const config= {
    apiUrl: 'http://localhost:8080'
}

function getAllProducts() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };

    return fetch(`${config.apiUrl}/api/product/all`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}
function login(login, password) {
    console.log(login, password)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
        body: JSON.stringify({
            "login": login,
            "password": password,
        }),
    };

    return fetch(`${config.apiUrl}/api/account/login`, requestOptions)
        .then(handleResponse)
        .catch(function() {
            console.log("error")
        })

        .then(user => {
            console.log("user", user)
            if (user) {
                if(user.accountId == -1) {
                    return
                }
                user.authdata = window.btoa(login + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                
            }
            return user;
        });
}

function register(login, password, email, name, surname, role) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "login": login,
            "password": password,
            "email": email,
            "name": name,
            "surname": surname,
            "role": role,
           })
    };
    return fetch(`${config.apiUrl}/api/account/register`, requestOptions)
        .then(()=>console.log(handleResponse))
        
        .then(user => {
            console.log(user)
            if (user) {
                console.log("Register succesful");
                user.authdata = window.btoa(login + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
        
}

function saveNewTransaction(prescription, user, products) {
    const Ids = [] 
    products.map(product => {
        for(let i =0; i < product.count; i++){
            Ids.push(product.id)
        }
    })
    console.log(prescription, user,Ids)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
        body: JSON.stringify({
            "number": Math.floor(Math.random() * 101),  
            "status": "WAITING",
            "user": user,
            "prescriptionRequired": prescription,
            "prescriptions": null, 
            "products": Ids
        })
    };

    return fetch(`${config.apiUrl}/api/transaction/add`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function saveNewProject(name, description, startDate, endDate, img, maxUsers) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
        body: JSON.stringify({
            "name":name, 
            "description":description, 
            "startingDate":startDate, 
            "finishDate":endDate, 
            "photo":img, 
            "maxUsers":parseInt(maxUsers), 
            "actualUsers":0, 
            "stage":"REGISTRATION"
        })
    };

    return fetch(`${config.apiUrl}/api/project/add`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}



function addUserToProject(projectId, userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/user/`+userId+`/addToProject/`+projectId, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getAllProjects() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };

    return fetch(`${config.apiUrl}/api/project/all`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getAllUsers() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    console.log("EEEEEEEEE")
    return fetch(`${config.apiUrl}/api/user/all`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response)
            return response;            
        })
        .catch(error => {
            console.error('Wypluj to powiedzialem:', error);
          });
}

function getProjectsForUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/user/`+userId+`/projects`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}

function getFinishedActivitiesForUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/acitivity/user/`+userId+`/finished`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}

function getAcitveActivitiesForUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/activity/user/`+userId+`/notFinished`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}

function saveNewActivity(name, description, startDate, endDate, img, maxUsers, points, projectId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
        body: JSON.stringify({"name":name, "description":description, "startingDate":startDate, "finishDate":endDate, "photo":img, "maxUsers":parseInt(maxUsers), "actualUsers":0,"projectId":projectId ,"points":parseInt(points), "type":"temporary", "id":"40"})
    };
    return fetch(`${config.apiUrl}/api/activity/add`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}

function addUserToActivity(activityId, userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/user/`+userId+`/addToActivity/`+activityId, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}

function getActivitiesForProject(projectId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/activity/`+projectId+`/activities`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}



function getUsersForProject(projectId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    console.log("VVVVVVVVv")
    console.log(projectId)
    return fetch(`${config.apiUrl}/api/project/`+projectId+`/users`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;            
        })
        .catch(error => {
            console.error(error);
          });
}

function getUsersForActivity(activityId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };
    return fetch(`${config.apiUrl}/api/activity/`+activityId+`/users`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;            
        })
        .catch(error => {
            console.error(error);
          });
}

function getUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false
    };

    return fetch(`${config.apiUrl}/api/user/`+userId, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                console.log(response);
            }
            return response;
        });
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}

function handleResponse(response) {
    console.log('handling response');
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}