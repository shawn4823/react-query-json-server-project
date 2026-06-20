// EmployeeRegister.jsx

import React, { useState } from 'react'
import styled from 'styled-components';
// import { EmployeeContext } from '../../no0_context/EmployeeContext';
// import { useDispatch } from 'react-redux';
// import { employeeAllPostSlice } from '../../no3_store/slices/employeeSlice';

const initialEmp = {
    name: '',
    email: '',
    job: '',
    pay:''
}


import { usePostRegisterEmployee } from '../../store/hooks/useEmployee';



const EmployeeRegister = ({selectedId}) => {
    // const dispatch = useDispatch();
    const [emp, setEmp] = useState(initialEmp);
    const registerMutation = usePostRegisterEmployee();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setEmp(prev => (
            {...prev, [name]: value}
        ))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // if(!emp.name || )
        // registerMutation.mutateAsync(emp)) //외부 api를 부름 
        
        
    try {
        await registerMutation.mutate(emp);
        setEmp(initialEmp)
        alert("직원등록이 완료되었습니다.");

    }
    catch{
        alert("직원등록이 취소되었습니다.")
    }}

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Label>이름</Label>
                <Input
                    type="text"
                    name="name"
                    value={emp.name}
                    onChange={handleChange}
                    placeholder='이름'
                />
            </InputGroup>
            <InputGroup>
                <Label>이메일</Label>
                <Input
                    type="email"
                    name="email"
                    value={emp.email}
                    onChange={handleChange}
                    placeholder='이메일'
                />
            </InputGroup>
            <InputGroup>
                <Label>직업</Label>
                <Input
                    type="text"
                    name="job"
                    value={emp.job}
                    onChange={handleChange}
                    placeholder='직업'
                />
            </InputGroup>
            <InputGroup>
                <Label>급여</Label>
                <Input
                    type="number"
                    name="pay"
                    value={emp.pay}
                    onChange={handleChange}
                    placeholder='급여'
                />
            </InputGroup>
            <SubmitButton>
                등록
            </SubmitButton>
        </Form>
    )
}

export default EmployeeRegister


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: bold;
  color: #334155;
`

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  outline: none;
  font-size: 15px;

  &:focus{
    border-color: #3b82f6;
  }
`

const SubmitButton = styled.button`
  border: none;
  background: #10b981;
  color: white;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover{
    opacity: 0.85;
  }
`