// TodoInsert.jsx

import React from 'react'
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
// import { TodoContext } from '../../no0_context/TodoContext'
// import { change, todoPostSlice } from '../../no3_store/slices/todoSlice';

import { usePostTodo } from '../../store/hooks/useTodo';


const initialState =
{
  "subject": "할일",
  "checked": false
}


const TodoInsert = () => {

  const [todo, setTodo] = useState(initialState)
  const registerMutation = usePostTodo();

  // const {todoObj} = useSelector(state=>state.todo);
  // const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({
      ...prev, [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerMutation.mutateAsync(todo)
      alert("등록성공")
    } catch {
      alert("등록실패")
    }

  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="subject"
        value={todo.subject}
        onChange={handleChange}
        required
        placeholder='할 일을 입력하세요'
      />
      <Button>
        입력
      </Button>
    </Form>
  )
}

export default TodoInsert

const Form = styled.form`
  display: flex;

  gap: 10px;
`

const Input = styled.input`
  flex: 1;

  padding: 14px;

  border: 1px solid #d1d5db;
  border-radius: 12px;

  font-size: 16px;

  outline: none;

  &:focus{
    border-color: #3b82f6;
  }
`

const Button = styled.button`
  padding: 14px 24px;

  border: none;
  border-radius: 12px;

  background: #3b82f6;

  color: white;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;

  &:hover{
    background: #2563eb;
  }
`