import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    todoAllGetApi,
    todoGetApi,
    todoPostApi,
    todoPutApi,
    todoDeleteApi

}from "../apis/todo.api"

export const useAllGetTodo = () => {
        return useQuery({
            queryKey : ["todos"],
            queryFn : todoAllGetApi
        })
}


export const useGetTodo = (id) => {
        return useQuery({
            queryKey : ["todos", id],
            queryFn : todoGetApi(id),
            enabled: !!id
        })
}

export const usePostTodo = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : todoPostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["employees"],
                (old=[]) => [
                    ...old, dataObj
                ]
                
            )
            // 캐쉬 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["todos"]
            })
        }
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : todoPutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["todos"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item 
                )
            );
                
            
            // 캐쉬 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            })
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : todoDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData( // set함수
                ["todos"],
                (old=[]) => old.filter(item=>      //filter함수
                    item.id === id 
                    
                )
                
            )
            // 캐쉬 제거, 데이터 다시 불러오기
             queryClient.removeQueries(
                ["todos", id]
            );
        }
    })
}


export const usePutToggleTodo = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : todoPutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["todos"],
                (old=[]) => [old.map(item=>
                    item.id === dataObj.id ? 
                    {...dataObj, checked: !dataObj.checked}
                    :item
                )
                ]
            );
            // 캐쉬 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            })
        }
    })
}