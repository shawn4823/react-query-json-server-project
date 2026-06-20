import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLoginApi, userRegisterApi } from "../apis/user.api"


export const userLoginSlice = createAsyncThunk(
    "userLoginSlice",
    async (userObj, thunkAPI) => {
        try{
            const user = await userLoginApi(userObj)
            // console.log("user", user)
            localStorage.setItem("user", JSON.stringify(user))  //로그인만 심어라
            // console.log("user", user)
            return user
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
    }
}
)


export const userRegisterSlice = createAsyncThunk(
    "userRegisterSlice",
    async (userObj, thunkAPI) => {
        try{
            const user = await userRegisterApi(userObj)
            return user
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
    }
}
)





export const userLogoutSlice = createAsyncThunk(
    "userLogoutSlice",
    async (_, thunkAPI) => {
        try{
            localStorage.removeItem("user")
            
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
    }
}
)


export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}


const initialState = {
    userList: [],
    user: {},
    isLogin: false,
    loading : false,        
    error : null    
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {       // api를 받으면 아래 처럼 설정 get 방식이다.
        builder
            .addCase(userLoginSlice.pending, (state) => {
                state.loading = true 
                state.error = null    //get 방식이라 //뭔가 로딩이 되는 과정 
            })
            .addCase(userLoginSlice.fulfilled, (state, action) => {
                const user = getUser();
                if(user.username === action.payload.username
                    && user.password === action.payload.password

                ){
                    state.isLogin = true
                    state.user = action.payload 
                }
                state.loading = false
            })
            .addCase(userLoginSlice.rejected, (state, action) => {
                state.error = action.payload    //get 방식이라
                state.loading = false
            })
            .addCase(userRegisterSlice.fulfilled, (state, action) => {
                state.userList = [
                ...state.userList, action.payload]   
                state.isLogin = false
                state.loading = false
            })

            .addCase(userLogoutSlice.fulfilled, (state, action) => {
                state.user = {}
                state.isLogin = false
                state.loading = false
            })
    }
})

export default userSlice.reducer;