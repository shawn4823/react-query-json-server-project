import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    productAllGetApi,
    productGetApi,
    productPostApi,
    productPutApi,
    productDeleteApi

} from "../../apis/sales/product.api";

export const useAllProduct = () => {
    return useQuery({
        queryKey: ["product"], //endpoint (여러개가 될 수 있으니)
        queryFn: productAllGetApi
    })
}   //thunk를 거치지 않는다. 데이터를 api에서 바로 가져온다

export const useGetProduct = (id) => { //하나만 받을 때
    return useQuery({
        queryKey: ["product", id], 
        queryFn: () => productGetApi(id),
        enabled: !!id     //id가 있을 때만 실행하라
    })
}

export const useRegisterProduct = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : productPostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["product"],
                (old=[]) => [
                    ...old, dataObj
                ]
                
            )
            // 캐쉬 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["product"]
            })
        }
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : productPutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData( // set함수
                ["product"],
                (old=[]) => old.map(item=>
                    item.id === dataObj.id ?
                    dataObj : item 
                )
            );
            queryClient.setQueryData(
                ["product", dataObj.id],
                dataObj
            );
        }
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();       //mutation 방식
    return useMutation ({
        mutationFn : productDeleteApi,
        onSuccess: (id) => {                            
            queryClient.setQueryData( 
                ["product"],
                (old=[]) => old.filter(item=>      //filter함수
                    item.id !== id 
                    
                )
            );
            queryClient.removeQueries(
                ["product", id]
            );
        }
    })
}