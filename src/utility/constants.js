const AUTH = {
    LOGIN: 'http://localhost:5000/v1/auth/login',
    REGISTER: 'http://localhost:5000/v1/auth/register',
    VALIDATE: 'http://localhost:5000/v1/auth/validate',
}

const EMPLOYEE = {
    LIST: 'http://localhost:5000/v1/employee/list',
    CREATE: 'http://localhost:5000/v1/employee/create',
    BULK: 'http://localhost:5000/v1/employee/bulk',
}

const IMMIGRATION = {
    LIST: 'http://localhost:5000/v1/employee/immigration/list',
    BULK: 'http://localhost:5000/v1/employee/immigration/bulk',

}

export {
    AUTH,
    EMPLOYEE,
    IMMIGRATION
}

