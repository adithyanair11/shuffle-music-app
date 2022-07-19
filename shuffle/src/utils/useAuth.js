import { useState,useEffect } from "react"
import axios from 'axios'
export const useAuth = (code) => {
    const [accessToken,setAccessToken] = useState();
    const [refreshToken,setRefreshToken]= useState();
    const [expiresIn,setExpiresIn] = useState();

    useEffect(() => {
        if(!code) return 
        axios.post('http://localhost:3001/login',{
            code,
        })
        .then((res) => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({},null,'/')
        })
        .catch((err) => {
            console.log(err)
        })
    },[code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return 
        axios.post('http://localhost:3001/refresh',{
            refreshToken,
        })
        .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
            window.location = '/'
        })

    },[refreshToken,expiresIn]);


    return accessToken;
}