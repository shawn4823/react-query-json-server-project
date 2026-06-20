import React from 'react'
import ProductTable from '../../components/sales/Product/ProductTable';
import styled from 'styled-components';
import { getCurrentUser } from '../../store/hooks/useUser';
import AuthControl from '../../components/layout/AuthControl';


const ProductPage = () => {
  const user = getCurrentUser();
  if(!user){
    return(
      <AuthControl
        massage='로그인 후 상품 정보를 조회 및 관리할 수 있습니다.'
      />
    )
  }
  return (
    <div>
      <ProductTable/>
    </div>
  )
}

export default ProductPage;


