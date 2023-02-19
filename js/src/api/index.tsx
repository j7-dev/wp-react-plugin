import axios, {AxiosInstance} from 'axios';

const baseURL = process.env.API_URL || wpApiSettings.root || '';
const timeout = process.env.API_TIMEOUT || '30000';

console.log('baseURL', baseURL);

const instance:AxiosInstance  = axios.create({
  baseURL,
  timeout: parseInt(timeout, 10),
  headers: {'X-WP-Nonce': wpApiSettings.nonce}
});

export default instance;