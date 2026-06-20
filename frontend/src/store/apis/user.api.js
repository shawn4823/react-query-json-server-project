import {rootApi} from "./root.api.js";

export const userAllGetApi = async () => {
    try {
        const response = await rootApi.get("/user")
        console.log(response.data)
        return response.data
    } catch (error) {
        return error
    }
}

export const userLoginApi = async (loginUser) => {
    try {
        
        const response = await rootApi.get(`
            /user?name=${loginUser.username}`);
             console.log("users", response.data)
            
         const users = response.data;
        if (!users.length){
            throw  Error("존재하지 않는 사용자입니다.")
        }
        const founderUser = users[0];
       
        if (founderUser.password !== loginUser.password){
              throw  Error("비밀번호가 일치하지 않습니다.");
            
        }
        return founderUser;
    } catch (error) {
        throw error

    }
}


export const userRegisterApi = async (userObj) => {
    try {
        const response = await rootApi.get(`/user?name=${userObj.username}`)
        const users = response.data
        if(users.length){
            throw new Error("이미 존재하는 사용자입니다.")

        }
         return await rootApi.post(`/user`, userObj)
       
     
    } catch (error) {
        throw new error

    }
}




export const userPostApi = async (dataObj) => {
    try {
        const response = await rootApi.post("/user", dataObj)
        return response.data
    } catch (error) {
        throw new error
    }
}

// export const userPutApi = async (dataObj) => {
//     try {
//         const reponse = await axios.put(`http://localhost:3001/user/${dataObj.id}`, dataObj)
//         return response.data
//     } catch (error) {
//         return error
//     }
// }

// export const userDeleteApi = async (id) => {
//     try {
//         const reponse = await axios.delete(`http://localhost:3001/user/1/${id}`)
//         return response.data
//     } catch (error) {
//         return error
//     }
// }


