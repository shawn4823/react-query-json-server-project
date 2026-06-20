import { createSlice } from "@reduxjs/toolkit"
import {employeeAllGetApi, employeePostApi, employeePutApi, employeeDeleteApi} from "../apis/employee.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const employeeAllGetSlice = createAsyncThunk(
    "employeeAllGetSlice",
     async (_, thunkAPI) => {
        try {
            return await employeeAllGetApi();
        }catch (error){
            return thunkAPI.rejectWithValue(error.message)
        }

    }
)  //middleware


export const employeeAllPostSlice = createAsyncThunk(
    "employeeAllPostSlice",
     async (dataObj, thunkAPI) => {
        try {
            return await employeePostApi(dataObj);
        }catch (error){
            return thunkAPI.rejectWithValue(error.message)
        }

    }
)

export const employeeAllPutSlice = createAsyncThunk(
    "employeeAllPutSlice",
     async (dataObj, thunkAPI) => {
        try {
            return await employeePutApi(dataObj);
        }catch (error){
            return thunkAPI.rejectWithValue(error.message)
        }

    }
)

export const employeeDeleteSlice = createAsyncThunk(
    "employeeDeleteSlice",
     async (id, thunkAPI) => {
        try {
            return await employeeDeleteApi(id);
        }catch (error){
            return thunkAPI.rejectWithValue(error.message)
        }

    }
)



const initialEmp = {
  id: '', name: '', email: '', job: '', pay:''
}
const initialState = {
  empTable: [],
  emp: initialEmp,
  mode: '',
  selectedId: "",
  loading : false,
  error : null
}

const employeeSlice = createSlice({
    name : "employeeSlice",
    initialState,
    reducers:{
        select: (state, action) => {
            // console.log();
            state.selectedId = action.payload
        },
        setEmp:(state, action) => {
            state.emp = action.payload
        },
       
        remove :(state, action) => {
            state.empTable = state.empTable.filter(emp=>(
                emp.id !== state.selectedId
            ))
        },
        setMode: (state, action) => {
            state.mode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
                 .addCase(employeeAllGetSlice.pending, (state) => {
                    state.loading = true 
                    state.error = null    //get 방식이라 //뭔가 로딩이 되는 과정 
                })
                .addCase(employeeAllGetSlice.fulfilled, (state, action) => {
                    state.empTable = action.payload    //get 방식이라 // 실행이 되는 과정
                    state.loading = false
                })
                .addCase(employeeAllGetSlice.rejected, (state, action) => {
                    state.error = action.payload    //get 방식이라
                    state.loading = false
                }) 
                .addCase(employeeAllPostSlice.fulfilled, (state, action) => {

                    state.empTable = [
                ...state.empTable,
                    action.payload
                ]
                    state.loading = false
                })
                .addCase(employeeAllPutSlice.fulfilled, (state, action) => {
                    state.empTable = state.empTable.map(emp => (
                        emp.id === action.payload.id ? action.payload : emp
                    ))
                    state.loading = false
                })
                .addCase(employeeDeleteSlice.fulfilled, (state) => {
                    state.empTable = state.empTable.filter(emp=>(
                emp.id !== state.selectedId
                    ))
                    state.loading = false
                })
                
    }
})

export const {setMode, remove, register, update, select, setEmp } = employeeSlice.actions;
export default employeeSlice.reducer;