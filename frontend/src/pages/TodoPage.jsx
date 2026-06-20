
import TodoTemplate from '../components/todo/TodoTemplate'
import TodoInsert from '../components/todo/TodoInsert'
import TodoList from '../components/todo/TodoList'
import TodoListChild from '../components/todo/TodoListChild'



const TodoPage = () => {

 
  return (
    <TodoTemplate>
      <TodoInsert />
        <TodoList />
      
    </TodoTemplate>
  )
}

export default TodoPage
