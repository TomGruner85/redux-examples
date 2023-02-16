import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    isAuthenticated: false,
    token: null,
    expiresIn: null,
}

const loginReducer = (state, action) => {
    return {
        ...action.payload,
        isAuthenticated: true,
    }
}

const logoutReducer = () => {
    return initialState
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: loginReducer,
        logout: logoutReducer,
    }
})

export const { login, logout } = authSlice.actions
export const isAuthenticated = (state) => state.auth.isAuthenticated
export const getUserToken = (state) => state.auth.token
export const getUser = (state) => state.auth

export default authSlice.reducer