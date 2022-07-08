import { publicRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("auth/login", user)
        dispatch(loginSuccess(res.data))
        localStorage.setItem('ACCESS_TOKEN', res.data.accessToken)
    }catch(err){
        dispatch(loginFailure())
    }

}