import request from '../helpers/api-handler';

function login({emailText, passwordText}) {
    return request({
        url: '/user/login',
        method: 'POST',
        data: {
            'Email': emailText,
            'Password': passwordText
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