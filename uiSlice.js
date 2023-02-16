import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    notification: false,
    status: '',
    title: '',
    message: ''
}

const showNotificationReducer = (state, action) => {
    state.notification = true
    state.status = action.payload.status
    state.title = action.payload.title
    state.message = action.payload.message
}

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        showNotification: showNotificationReducer
    }
})

export const notification = (state) => state.ui.notification
export const uiState = (state) => state.ui

export const { showNotification } = uiSlice.actions

export default uiSlice.reducer