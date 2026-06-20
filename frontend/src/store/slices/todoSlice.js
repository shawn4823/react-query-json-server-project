import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { 
    todoAllGetApi, 
    todoPostApi, 
    todoPutApi,
    todoDeleteApi
} from "../apis/todo.api";


export const todoAllGetSlice = createAsyncThunk(
    "todoAllGetSlice",
    async (_, thunkAPI) => {
        try{
            return await todoAllGetApi();
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoPostSlice = createAsyncThunk(
    "todoPostSlice",
    async (dataObj, thunkAPI) => {
        try{
            return await todoPostApi(dataObj);
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoPutSlice = createAsyncThunk(
    "todoPutSlice",
    async (dataObj, thunkAPI) => {
        console.log("put", dataObj)
        try{
            return await todoPutApi(dataObj);
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const todoToggleSlice = createAsyncThunk(
    "todoToggleSlice",
    async (dataObj, thunkAPI) => {
        const newObj = {
            ...dataObj, 
            checked: !dataObj.checked
        }
        try{
            return await todoPutApi(newObj);
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const todoDeleteSlice = createAsyncThunk(
    "todoDeleteSlice",
    async (id, thunkAPI) => {
        // console.log("delete", id)
        try{
            return await todoDeleteApi(id);
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


const initialObj = {
    subject: "",
    checked: false
  }
const initialState = {
    todoList: [],
    todoObj: initialObj,
    loading: false,
    erorr: null,
  }
  
  
const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        change: (state, action) => {
            state.todoObj = {
                ...state.todoObj,
                [action.payload.name] : action.payload.value
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todoAllGetSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(todoAllGetSlice.fulfilled, (state, action) => {
                state.todoList = action.payload
                state.loading = false
            })
            .addCase(todoAllGetSlice.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(todoPostSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList = [
                    ...state.todoList, action.payload
                ]
                state.todoObj = initialObj
                state.loading = false
            })
            .addCase(todoPutSlice.fulfilled, (state, action) => {
                console.log("put", action.payload)
                const newObj = state.todoList.find(todo=>todo.id === action.payload.id)
                state.todoList = state.todoList.map(todo=>(
                        todo.id === action.payload.id ?
                        action.payload : todo
                    )
                )
                state.todoObj = newObj
            })
            .addCase(todoToggleSlice.fulfilled, (state, action) => {
                const newObj = state.todoList.find(todo => todo.id === action.payload.id)
                state.todoList = state.todoList.map(todo=>(
                    todo.id === action.payload.id ?
                        {...todo, checked: !todo.checked}
                        : todo
                ))
                state.todoObj = newObj
            })
            .addCase(todoDeleteSlice.fulfilled, (state, action) => {
                state.todoList = state.todoList.filter(todo=>
                    (todo.id !== action.payload)
                )
                state.loading = false
            })
        }
})

export const {remove, update, register, toggle, change} = todoSlice.actions;
export default todoSlice.reducer;
