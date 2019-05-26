import request from '../helpers/api-handler';

function login({username, password}) {
    console.log(username, password)
    return request({
        url: '/api-token-auth/',
        method: 'POST',
        data: {
            'username': username,
            'password': password
        }
    }, false);
};

function register({emailText, passwordText}) {
    return request({
        url: '/user/create',
        method: 'POST',
        data: {
            'Email': emailText,
            'Password': passwordText
        }
    }, false);
};

const AuthService = {
    login, register
};

export default AuthService;