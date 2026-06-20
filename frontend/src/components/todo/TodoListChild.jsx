// TodoListChild.jsx

import React, { useContext, useState } from 'react'
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from "react-icons/md"
// import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { toggle, update, remove } from '../../store/slices/todoSlice'
// import { TodoContext } from '../../no0_context/TodoContext'
// import { todoPutSlice, todoToggleSlice, todoDeleteSlice } from '../../no3_store/slices/todoSlice'
import {  usePutUpdateTodo, useDeleteTodo } from '../../store/hooks/useTodo'

import { useGetTodo } from '../../store/hooks/useTodo'

const TodoListChild = ({item}) => {
 
 
  const updateMutation = usePutUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const {data: newTodo, isLoading, error} = useGetTodo(item.id)

  const [editing, setEditing] = useState(false)
  const [todo, setTodo] = useState(item)

  const handleUpdate = () => {
    if(todo.subject.trim() !== ""){
    try{
updateMutation.mutateAsync(todo)
    setEditing(false)
    alert("수정 성공")
  }catch{
    alert("수정 실패")

  }
  }}

const handleToggle = async () => {
   if(todo.subject.trim() !== ""){
  try{
    setTodo(prev => ({...prev, checked: !todo.checked}))
     await updateMutation.mutateAsync({...todo, checked: !todo.checked});
    setEditing(false)
    alert("토글성공")
  }catch{
    alert("토글 실패")
  }
  }}
  

  return (
    <Container>
      <CheckBoxArea onClick={()=> handleToggle()}>
        {
          todo.checked
            ? <MdCheckBox />
            : <MdCheckBoxOutlineBlank />
        }
      </CheckBoxArea>

      <ContentArea>
        {
          editing ? (
            <EditInput
              type="text"
              name = "subject"
              value={todo.subject}
              onChange={(e) => setTodo(prev => ({...prev, [e.target.name] : e.target.value}))}
              onBlur={handleUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur()
                }
              }}
              autoFocus
            />
          ) : (
            <Checked
              $checked={todo.checked}
              onDoubleClick={() => {setTodo(item); 
                setEditing(true)}}
            >
              {item.subject}
            </Checked>
          )
        }
      </ContentArea>

      <DeleteButton onClick={()=>deleteMutation.mutateAsync(item.id)}>
        <MdRemoveCircleOutline />
      </DeleteButton>

    </Container>
      
  )
}



export default TodoListChild


const Container = styled.div`
  display: flex;
  align-items: center;

  gap: 16px;

  padding: 16px;

  border-radius: 16px;

  background: #ffffff;

  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  transition: 0.2s;

  &:hover{
    transform: translateY(-2px);
  }
`

const CheckBoxArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;

  color: #3b82f6;

  cursor: pointer;
`

const ContentArea = styled.div`
  flex: 1;
`

const Checked = styled.div`
  font-size: 18px;

  color: ${({ $checked }) =>
    $checked ? "#999" : "#222"};

  text-decoration: ${({ $checked }) =>
    $checked ? "line-through" : "none"};

  transition: 0.2s;

  cursor: pointer;
`

const EditInput = styled.input`
  width: 100%;

  padding: 10px 14px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  font-size: 16px;

  outline: none;

  &:focus{
    border-color: #3b82f6;
  }
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;

  color: #ef4444;

  cursor: pointer;

  transition: 0.2s;

  &:hover{
    transform: scale(1.1);
  }
`