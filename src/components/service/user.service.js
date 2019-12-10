
// import { authHeader } from '../helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    saveNewTransaction,
    getAllUsers,
    getUser,
    getAllProducts,
    getAllTransactions,
    getTransactionsUser,
    action,


};

const config= {
    apiUrl: 'http://localhost:8080'
}


function action(id, action) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };

    return fetch(`${config.apiUrl}/api/transaction/${id}/${action}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getTransactionsUser(user) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };

    return fetch(`${config.apiUrl}/api/user/${user+2}/transactions`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getAllTransactions() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        "cache-control": "no-cache",},
        "processData": false,
    };

    return fetch(`${config.apiUrl}/api/transaction/all`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
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
            "number": Math.floor(Math.random() * 10001),  
            "status": "WAITING",
            "user": user,
            "prescriptionRequired": prescription,
            "prescriptions": null, 
            "productIds": Ids
        })
    };

    return fetch(`${config.apiUrl}/api/transaction/add`, requestOptions)
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