import { useQuery } from "@tanstack/react-query"
import { useAllGetUser } from "../useUser"
import { useAllProduct } from "./useProduct"
import { salesAllGetApi } from "../../apis/sales/sales.api"

export const useAllGetSales = () => {
    return useQuery({
        queryKey: ["sales"], 
        queryFn: salesAllGetApi
    })
} 

export const useGetSales = () => {
    
    const {data: userList=[]} = useAllGetUser()
    const {data: productList=[]} = useAllProduct()
    const {data: salesList=[]} = useAllGetSales()

    //조인작업 (실제정보를 넣기 위해)
    const userObj = {}
    userList?.forEach(item => {
        console.log(userList)
        userObj[item.id] = item
    })
    console.log(userObj)
    const productObj = {}
    productList?.forEach(item => {
        productObj[item.id] = item
    })

    const rowData = salesList.map(item => ({                                                //item 속에 외래키가 있다.
        ...item,                                                                            //오브젝트이니 복제한 다음 
        user_name: userObj[String(item.user_id)]?.name ?? "알 수 없음",                     //오브젝트 row데이터 한줄에서 name만 가져옴 오브젝트는 키값만 가져오면 된다.
        product_name: productObj[String(item.product_id)]?.product_name ?? "알 수 없음"
    }
    ))
    return rowData;
}