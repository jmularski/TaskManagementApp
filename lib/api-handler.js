import axios from 'axios';
import { AsyncStorage } from 'react-native';

const BASE_URL = 'http://landing.wesale.pl'

const request = async (options, addAuthHeader = true) => {
    
    let authHeader = null;
    if(addAuthHeader) {
      authHeader = await AsyncStorage.getItem("Auth");
    }

    const client = axios.create({
        baseURL: BASE_URL,
        headers: { 'Authorization': authHeader }
    });

    const onSuccess = (response) => {
        return response.data;
    };

    const onFailure = (error) => {
        return Promise.reject(error.response || error.message);
    };

    return client(options)
        .then(onSuccess)
        .catch(onFailure)
};

export default request;

