import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    employeeAllGetApi,
    employeeGetApi,
    employeePostApi,
    employeePutApi,
    employeeDeleteApi,

} from "../apis/employee.api"

export const useAllGetEmployee = () => {
    return useQuery({
        queryKey: ["employees"], //endpoint (여러개가 될 수 있으니)
        queryFn: employeeAllGetApi
    })
}   //thunk를 거치지 않는다. 데이터를 api에서 바로 가져온다

export const useGetEmployee = (id) => { //하나만 받을 때
    return useQuery({
        queryKey: ["employees", id], 
        queryFn: () => employeeGetApi(id),
        enabled: !!id     //id가 있을 때만 실행하라
    })
}

export const usePostRegisterEmployee = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : employeePostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["employees"],
                (old=[]) => [
                    ...old, dataObj
                ]
                
            )
            // 캐쉬 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            })
        }
    })
}

export const usePutUpdateEmployee = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : employeePutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["employees"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item 
                )
            );
            queryClient.setQueryData(
                ["employees", dataObj.id],
                employeePutApi
            );
        }
    })
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : employeeDeleteApi,
        onSuccess: (id) => {                            
            queryClient.setQueryData( 
                ["employees"],
                (old=[]) => old.filter(item=>      //filter함수
                    item.id === id 
                    
                )
            );
            queryClient.removeQueries(
                ["employees", id]
            );
        }
    })
}