import React, { createContext, useReducer } from 'react'

export const TodoContext = createContext();

const initialState = {
    todoList: [
        { id: 1, subject: "HTML 공부", checked: true },
        { id: 2, subject: "css 공부", checked: false },
        { id: 3, subject: "React 공부", checked: true },
        { id: 4, subject: "Python 공부", checked: true },
    ],
    todoObj: { id: "", subject: "", checked: false }
}

const reducer = (state, action) => {
    switch (action.type) {
        



        case "change":
            return {
                ...state,
                todoObj: {
                    ...state.todoObj,
                    [action.payload.name]:
                        action.payload.value

                }
            }

        case "insert":
            return {
                ...state,

                todoList: [
                    ...state.todoList,

                    {
                        ...state.todoObj,

                        id:
                            state.todoList.length > 0
                                ?
                                Math.max(
                                    ...state.todoList.map(
                                        item => item.id
                                    )
                                ) + 1
                                :
                                1
                    }
                ],
                todoObj: {
                    id: "",
                    subject: "",
                    checked: false
                }
            }
        case "toggle":
            return {
                ...state,
                todoList: state.todoList.map(todo => (
                    todo.id === action.payload
                        ?
                        {
                            ...todo,
                            checked: !todo.checked
                        }
                        :
                        todo
                )
                )
            }
        case "update":

            return {
                ...state,

                todoList: state.todoList.map(todo => (

                    todo.id === action.payload.id
                        ?
                        {
                            ...todo,
                            subject: action.payload.value
                        }
                        :
                        todo
                ))
            }
            case "delete":

            return {
                ...state,

                todoList: state.todoList.filter(todo => (
                    todo.id !== action.payload
                ))
            }


        default:
            return state;
    }
}









            const TodoProvider = ({children}) => {
                  const [state, dispatch]=useReducer(reducer, initialState); 
                const {todoObj, todoList} = state;

               

                return (
                    <TodoContext.Provider value={{state, dispatch}}>
                     {children}

                    </TodoContext.Provider>
                )
            }

            export default TodoProvider
