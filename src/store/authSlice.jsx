import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
}
export const AuthSlice = createSlice ({
    name : "auth",
    initialState,
    reducers :{
        login : (state,action)=>{
            state.status = true
            // state.userData = action.payload.userData
            state.userData = action.payload
        },

        logout : (state,action)=>{
            state.status = false
            state.userData = null
        }

    }
})

export const {login , logout} = AuthSlice.actions

export default AuthSlice.reducer