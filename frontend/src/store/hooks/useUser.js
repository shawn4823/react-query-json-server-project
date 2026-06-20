import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userAllGetApi, userLoginApi, userRegisterApi } from "../apis/user.api";



export const useAllGetUser = () => {
        return useQuery({
            queryKey : ["user"],
            queryFn : userAllGetApi
        })
}


export const useLoginUser = () => { //로그인 확인 , mutation(확인작업 후 가져옴) get방식으로 하면 화면에 뿌려지기 때문
    
    return useMutation({
        mutationFn: userLoginApi, 
        onSuccess:(user) => {
            localStorage.setItem("currentUser", JSON.stringify(user)); // 서버에 심어 user를 바로 확인
            
        }
        })
    
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn : userRegisterApi
    })
} 

export const logout = () => {
    localStorage.removeItem("currentUser") 
} 

export const getCurrentUser = () => {   //사용자의 데이터만 들어감 
    const user = localStorage.getItem("currentUser")    
    return user && JSON.parse(user)     //사용자가 있으면
}