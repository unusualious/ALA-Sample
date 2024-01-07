import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://alaatv.com/api/v2/' });

export default { axios, api };
