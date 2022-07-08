import axios from 'axios'

const BASE_URL = "http://localhost:3001/api/";
// const BASE_URL = "http://54.89.199.107:6389/api/";
// const Token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
const Token = localStorage.getItem('ACCESS_TOKEN')

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header: {token: `Bearer ${Token}` }
})