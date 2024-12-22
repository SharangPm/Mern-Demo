
import { commonAPI } from "./commonAPI"
import { server_url } from "./serverurl"



// registerAPI


export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${server_url}/register`,user,"")
}

// loginAPI


export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${server_url}/login`,user,"")
}



// addProjectAPI


export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${server_url}/add-project`,reqBody,reqHeader)
}

// getHomeProjectAPI


export const getHomeProjectAPI = async()=>{
    return await commonAPI('GET',`${server_url}/home-project`,"","")
}

// getAllProjectAPI


export const getAllProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/all-project`,"",reqHeader)
}

// getUserProjectAPI


export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/user-project`,"",reqHeader)
}