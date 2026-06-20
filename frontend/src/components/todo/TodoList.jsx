// TodoList.jsx

import React, { useEffect } from 'react'
import TodoListChild from './TodoListChild'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
// import { TodoContext } from '../../no0_context/TodoContext'

import { useAllGetTodo } from '../../store/hooks/useTodo';

const TodoList = () => {

const {data: todoList=[], isLoading, error} = useAllGetTodo()

if(isLoading) return <h3>loading...</h3>
if(error) return <h3>{error}</h3>

  // const {todoList} = useSelector(state=>state.todo);
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(todoAllGetSlice())
  // }, [dispatch, todoList])
  return (
    <Container>
      {
        todoList[0] && todoList.map(item => (
          <TodoListChild
            key={item.id}
            item={item}
          />
        ))
      }
    </Container>
  )
}

export default TodoList

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;
`