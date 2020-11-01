import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Authorization': api_key,
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        language: 'en'
      },

});

export default instance;