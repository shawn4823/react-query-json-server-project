import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import ProductModal from './ProductModal';
import { AgGridReact } from 'ag-grid-react';
import React from 'react'
import { useState, useMemo } from 'react';
import styled from 'styled-components';

import {
    useAllProduct,
    useDeleteProduct,
    useRegisterProduct,
    useUpdateProduct
}
from '../../../store/hooks/sales/useProduct';

const ProductTable = () => {

    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState(null);

    const {
        data: productList = [],
        isLoading,
        error
    } = useAllProduct();

    const registerMutation = useRegisterProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const handleUpdate = (item) => {
        setNewProduct(item);        
        setOpen(true);
    }

    const handleDelete = async (id) => {

        if(window.confirm("정말 삭제하시겠습니까?")){

            await deleteMutation.mutateAsync(id);
        }
    }

    const handleRegister = () => {

        setNewProduct(null);
        setOpen(true);
    }

    const defaultColDef = useMemo(() => (
        {
            sortable: true,
            filter: true,
            resizable: true
        }
    ), []);

    const columnDefs = useMemo(() => [ //useMemo는 자료를 최적화 하기 위해 씀

        {
            field:"product_name",
            headerName:"상품명",
            flex:1
        },

        {
            field:"color",
            headerName:"색상",
            flex:1
        },

        {
            field:"cost_price",
            headerName:"원가",
            flex:1
        },

        {
            field:"sale_price",
            headerName:"판매가",
            flex:1
        },

        {
            field:"category_code",
            headerName:"카테고리 코드",
            flex:1
        },

        {
            headerName:"상품관리",

            cellRenderer: (params) => (             //params --> row 데이터를 의미

                <div>

                    <EditButton
                        onClick={() => handleUpdate(params.data)}
                    >
                        수정
                    </EditButton>

                    <DeleteButton
                        onClick={() => handleDelete(params.data.id)}        //delete라 id필요
                    >
                        삭제
                    </DeleteButton>

                </div>
            ),

            flex:1
        }

    ], [handleDelete, handleUpdate]); //빈칸은 한번만 실행되도록 서버에서 받아오는 것이 아니라서 

    if(isLoading) return <div>Loading...</div>;

    if(error) return <div>{error?.message}</div>;

    return (

        <Wrapper>

            <Header>

                <Title>
                    상품 관리
                </Title>

                <RegisterButton
                    onClick={handleRegister}
                >
                    + 상품 등록
                </RegisterButton>

            </Header>

            <GridWrapper>

                <div                                        //aGrid는 반드시 태그를 감아줘야함   
                    className='ag-theme-alpine' style={{height: "800px, width100%"}}        
                >

                    <AgGridReact                              
                        theme="legacy"                  
                        rowData={productList}                       // row데이터는 리스트를 심는다. 아이디도 있음 
                        columnDefs={columnDefs}                         
                        defaultColDef={defaultColDef}                   
                        pagination={true}                               
                        paginationPageSize={25}                      
                        animateRows={true}                                  
                        getRowId={(params)=>params.data.id.toString()}   
                    />

                </div>

            </GridWrapper>

            <ProductModal
                open={open}
                setOpen={setOpen}
                initialValues={newProduct}          //input태그안에 들어갈 오브젝트들

                onSubmit = {async (productObj) => {                   
                    console.log("productObj", productObj)
                    if(newProduct){                //new가 product면   / 데이터가 있으면 업데이트 없으면 등록       
                        
                        await updateMutation.mutateAsync({
                            ...productObj,
                            id: newProduct.id
                        });

                    }else{

                        await registerMutation.mutateAsync(productObj);
                    }
                }}
            />

        </Wrapper>
    )
}

export default ProductTable;

const Wrapper = styled.div`

    padding: 32px;

    width: 100%;

    min-height: 100vh;

    background: #f8fafc;

    display: flex;

    flex-direction: column;

    gap: 24px;
`;

const Header = styled.div`

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 20px 24px;

    background: white;

    border-radius: 18px;

    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
`;

const Title = styled.h3`

    font-size: 28px;

    font-weight: bold;

    color: #0f172a;

    margin: 0;
`;

const RegisterButton = styled.button`

    border: none;

    background: linear-gradient(
        135deg,
        #3b82f6,
        #2563eb
    );

    color: white;

    padding: 14px 24px;

    border-radius: 12px;

    font-size: 15px;

    font-weight: 600;

    cursor: pointer;

    transition: 0.25s;

    box-shadow: 0 8px 20px rgba(59,130,246,0.35);

    &:hover{

        transform: translateY(-2px);

        box-shadow: 0 12px 24px rgba(59,130,246,0.45);
    }

    &:active{

        transform: scale(0.97);
    }
`;

const GridWrapper = styled.div`

    width: 100%;

    height: 600px;

    background: white;

    border-radius: 20px;

    padding: 16px;

    box-shadow: 0 4px 20px rgba(0,0,0,0.06);

    overflow: hidden;

    .ag-theme-alpine{

        width: 100%;

        height: 100%;
    }

    .ag-header{

        border-bottom: none;
    }

    .ag-header-cell-label{

        font-weight: bold;

        font-size: 15px;

        color: #0f172a;
    }

    .ag-row{

        font-size: 14px;
    }

    .ag-row:hover{

        background: #eff6ff;
    }
`;

const ActionButton = styled.button`

    border: none;

    padding: 8px 14px;

    border-radius: 8px;

    font-size: 13px;

    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

    margin-right: 8px;

    &:hover{

        transform: translateY(-1px);
    }
`;

const EditButton = styled(ActionButton)`

    background: #3b82f6;

    color: white;
`;

const DeleteButton = styled(ActionButton)`

    background: #ef4444;

    color: white;
`;