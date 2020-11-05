import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://apis.justwatch.com/content',
    headers: {
        // 'Authorization': api_key,
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        language: 'en'
      },

});

export default instance;