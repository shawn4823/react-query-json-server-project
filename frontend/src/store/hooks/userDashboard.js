import { useAllGetUser } from "./useUser";
import { useAllProduct } from "./sales/useProduct";
import { useAllGetSales } from "./sales/useSales";
import { useMemo } from "react";
import { queryOptions } from "@tanstack/react-query";

export const useDashboard = () => {
    const { data: salesList = [] } = useAllGetSales();
    const { data: productList = [] } = useAllProduct();
    const { data: userList = [] } = useAllGetSales();

    //핵심 성과 지표
    const kpi = useMemo(() => {
        //총매출액
        const totalSalesAmount = salesList.reduce((sum, item) => (        //총판매량
            sum + Number(item.total_price)
        ), 0)
        //판매건수
        const totalOrderCount = salesList.length;
        //판매수량         
        const totalQuantity = salesList.reduce((sum, item) => (
            sum + Number(item.quantity)
        ), 0)
        //고객 수
        const customerCount = userList.length;
        //상품 수 
        const productCount = productList.length;
        return {
            totalOrderCount, totalQuantity, totalSalesAmount,
            customerCount, productCount
        }
    }, [salesList, productList, userList])

        // 고객 랭킹 
    const userRanking = useMemo(() => {
        const obj = {}
        salesList.forEach(item => {
            obj[item.user_id] = (obj[item.user_id] || 0) + 1
        });
        const userRankingObj = Object.entries(obj).map(([userId, count]) => {
            const user = userList.find(user => String(user.id) === String(userId))
            return {
                name: user?.name || "unknown",
                count
            }
        })
            .sort((a, b) => b.count - a.count) // 내림차순
            .slice(0, 10)       // 랭킹 10명 , slices는 0~ 10 명 뽑는다.
            return userRankingObj
    }, [salesList, userList])

            // 상품 랭킹
      const productRanking = useMemo(() => {
        const obj = {}
        salesList.forEach(item => {
            obj[item.product_id] = (obj[item.product_id] || 0) + 1
        });
        const productRankingObj = Object.entries(obj).map(([productId, quantity]) => {
            const product = productList.find(product => String(product.id) === String(productId))
            return {
                name: product?.product_name || "unknown",
                quantity
            }
        })
            .sort((a, b) => b.quantity - a.quantity) // 내림차순
            .slice(0, 10)       // 랭킹 10명 , slices는 0~ 10 명 뽑는다.
            return productRankingObj
    }, [salesList, productList])
    return {
        kpi,
        userRanking,
        productRanking
    }
}