// EmployeeTable.jsx

import React from 'react'
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import { EmployeeContext } from '../../no0_context/EmployeeContext';
// import { setEmp } from '../../no3_store/slices/employeeSlice';
import { useGetEmployee } from '../../store/hooks/useEmployee';

const EmployeeTable = ({selectedId}) => {
  // const {emp} = useSelector(state=>state.emp);
const {data: emp, isLoading, error} = useGetEmployee(selectedId)      //하나의 데이터를 넘김
if(isLoading) return <h3>loading...</h3>
if(error) return <h3>{error.message}</h3>
  return (
    <Table>

      <tbody>

        {emp &&
          Object.entries(emp).map(([key, value]) => (
            <tr key={key}>
              <Th>{key}</Th>
              <Td>{value}</Td>
            </tr>
          ))
        }

      </tbody>

    </Table>
  )
}

export default EmployeeTable


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  width: 140px;
  background: #e2e8f0;
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #cbd5e1;
`

const Td = styled.td`
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
`