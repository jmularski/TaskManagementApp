import request from '../helpers/api-handler';
import { APP_SECRET } from 'react-native-dotenv';
function login({username, password}) {
    return request({
        custom_base_url: APP_URL,
        url: '/oauth/token',
        method: 'POST',
        data: {
            'client_id': APP_ID,
            'client_secret': APP_SECRET,
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