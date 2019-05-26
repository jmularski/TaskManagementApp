import axios from 'axios';
import { AsyncStorage } from 'react-native';

const BASE_URL = 'https://78ab880b.ngrok.io'

const request = async (options, addAuthHeader = true) => {
    
    let authHeader = null;
    if(addAuthHeader) {
      authHeader = await AsyncStorage.getItem("Auth");
    }

    const client = axios.create({
        baseURL: BASE_URL,
        headers: { 'Authorization': authHeader }
    });

    return client(options)
};

export default request;

