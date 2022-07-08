import axios from 'axios'

const BASE_URL = "http://localhost:3001/api/";
// const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjlmM2Y3NWQ0NmY5MWNkMjMwZDJhZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzkwODQyNSwiZXhwIjoxNjQ0MTY3NjI1fQ.pFOvmsABmH7QU_hEgNI79gv-iuqHYzCF9K3dV2IIzxo'
// const Token =  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
const Token = localStorage.getItem('ACCESS_TOKEN')

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    //headers: {token: "Bearer "+Token }
    headers: {token: `Bearer ${Token}` }
})