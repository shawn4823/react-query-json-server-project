// EmployeeList.jsx

import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
// import { EmployeeContext } from '../../no0_context/EmployeeContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { select } from '../../no3_store/slices/employeeSlice';
// import { employeeAllGetSlice } from '../../no3_store/slices/employeeSlice';
import { useAllGetEmployee,
 } from "../../store/hooks/useEmployee";
const EmployeeList = ({selectedId, setSelectedId}) => {
  
  // const {empTable, selectedId} = useSelector(state=>state.emp);
  // const dispatch = useDispatch();
  // useEffect (() =>{
  //   dispatch(employeeAllGetSlice())
  // }, [dispatch])

const {data: empTable=[], isLoading, error} = useAllGetEmployee(); //slice를 거치지 않고 바로 서버에서 가져온다
if(isLoading)return <h3>loading...</h3>
if(error) return <h3>{error.message}</h3>
  return (
    <Container>
      {/* {console.log(empTable)} */}
      {
        empTable?.map(item => (
          <EmployeeButton
            key={item.id}
            $active={selectedId === item.id}
            onClick={() => setSelectedId(Number(item.id))}  //클릭을 하면 id가 변한다,
          >
            {item.name}
          </EmployeeButton>
        ))
      }
    </Container>
  )
}

export default EmployeeList


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EmployeeButton = styled.button`
  border: none;
  padding: 14px;
  border-radius: 10px;

  background: ${({$active}) =>
    $active ? "#3b82f6" : "#e2e8f0"};

  color: ${({$active}) =>
    $active ? "white" : "#1e293b"};

  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;

  &:hover{
    opacity: 0.85;
  }
`