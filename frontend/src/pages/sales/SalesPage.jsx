import React from 'react'
import SalesTable from '../../components/sales/Product/SalesTable';
import { getCurrentUser } from '../../store/hooks/useUser';
import AuthControl from '../../components/layout/AuthControl';

const SalesPage = () => {
    const user = getCurrentUser();
      if(!user){
        return(
          <AuthControl
            massage='로그인 후 판매 정보를 조회할 수 있습니다.'
          />
        )
      }
    
    return (
        <div>
            <SalesTable />
        </div>
    )
}

export default SalesPage;

