import axios from 'axios';

export const baseUrl = 'https://medinclude-api.onrender.com/api';
export const localUrl = 'http://localhost:4000';

// export const baseUrl = 'http://localhost:4000';

export const localUrlIns = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});