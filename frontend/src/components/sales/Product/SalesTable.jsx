import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';

import { useGetSales } from '../../../store/hooks/sales/useSales';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SalesTable = () => {
    const rowData = useGetSales();

    // 데이터 포맷팅 및 정렬을 포함한 컬럼 정의
    const columnDefs = useMemo(() => [
        { field: 'id', headerName: "주문번호", flex: 0.8 },
        { field: 'user_name', headerName: "회원명", flex: 1 },
        { field: 'product_name', headerName: "상품명", flex: 1.5 },
        { 
            field: 'quantity', 
            headerName: "수량", 
            flex: 0.7, 
            cellStyle: { textAlign: 'right' } 
        },
        { field: 'discount_rate', headerName: "할인율", flex: 0.7 },
        { 
            field: 'total_price', 
            headerName: "결제금액", 
            flex: 1, 
            cellStyle: { textAlign: 'right', fontWeight: '600' },
            valueFormatter: params => params.value.toLocaleString() + '원'
        },
        { field: 'create_at', headerName: "주문일자", flex: 1 },
    ], []);

    return (
        <Container>
            <Title>판매 내역 관리</Title>
            <GridWrapper className='ag-theme-alpine'>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={25}
                    paginationPageSizeSelector={[10, 25, 50, 100]}
                    rowHeight={50}
                    headerHeight={55}
                    animateRows={true}
                    suppressCellFocus={true} // 셀 클릭 시 파란 테두리 제거
                />
            </GridWrapper>
        </Container>
    );
};

export default SalesTable;

const Container = styled.div`
    width: 100%;
    padding: 30px;
    background-color: #f5f7fa;
    min-height: 100vh;
    box-sizing: border-box;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #1e293b;
`;

const GridWrapper = styled.div`
    width: 100%;
    height: 700px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    background-color: white;
    border: 1px solid #e2e8f0;

    /* AG Grid 테마 커스터마이징 */
    .ag-theme-alpine {
        --ag-header-background-color: #f8fafc;
        --ag-header-foreground-color: #475569;
        --ag-row-hover-color: #f1f5f9;
        --ag-font-family: inherit;
    }

    .ag-header-cell {
        font-weight: 700 !important;
    }

    .ag-row {
        border-bottom: 1px solid #f1f5f9 !important;
    }

    .ag-cell {
        display: flex;
        align-items: center;
        color: #334155;
    }

    .ag-paging-panel {
        background-color: #f8fafc;
        border-top: 1px solid #e2e8f0;
    }
`;