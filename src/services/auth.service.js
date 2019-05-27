import request from '../helpers/api-handler';

function login({username, password}) {
    console.log(username, password)
    return request({
        custom_base_url: 'https://dev-01434dhd.eu.auth0.com',
        url: '/oauth/token',
        method: 'POST',
        data: {
            'client_id': 'XFs8aMbXaOKlV679g2F1gw9vXLuF3MVP',
            'client_secret': 'ZvDT2zAyXNrBzIOL_oEH3yk7Rlzn-idUQI3Y2bgsDLIL-KVqxz2nPYa_Gx2HBvaz',
            'audience': 'https://bt-pay',
            'grant_type': 'client_credentials'
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