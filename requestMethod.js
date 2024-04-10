import axios from 'axios';

export const LDEXPLAINED_API = "https://ld-explained.navgurukul.org"; 
export const userRequestLdExplained = axios.create({
    baseURL: LDEXPLAINED_API,
})
