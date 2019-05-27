import request from '../helpers/api-handler';

function login({username, password}) {
    return request({
<<<<<<< HEAD
        url: '/api-token-auth/',
        method: 'POST',
        data: {
            'username': username,
            'password': password
=======
        custom_base_url: APP_URL,
        url: '/oauth/token',
        method: 'POST',
        data: {
            'client_id': APP_ID,
            'client_secret': APP_SECRET,
            'audience': 'https://bt-pay',
            'grant_type': 'client_credentials'
>>>>>>> e3b182f... fix(env): switched some data
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