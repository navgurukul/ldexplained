import axios from 'axios';

export const LDEXPLAINED_API = "http://ld_explained.navgurukul.org";

export const userRequestLdExplained = axios.create({
    baseURL: LDEXPLAINED_API,
})
