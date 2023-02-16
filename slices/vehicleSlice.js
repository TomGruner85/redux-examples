import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vehicles: [],
    activeVehicleId: 0
}

const populateStoreReducer = (state, action) => {
    state.vehicles = []
    const vehicles = action.payload
    vehicles.forEach((vehicle) => {
        state.vehicles.push(vehicle)
    })
}

const removeVehicleReducer = (state, action) => {
    const _id = action.payload
    state.vehicles = state.vehicles.filter((vehicle) => vehicle._id !== _id)
}

const editVehicleReducer = (state, action) => {
    let vehicle = action.payload

    const vehicleIndex = state.vehicles.findIndex((element) => element._id === vehicle._id)
    if(vehicleIndex === -1){
        state.vehicles.push(vehicle)
    } else {
        state.vehicles[vehicleIndex] = {
            ...vehicle
        }
    }
}

const setActiveVehicleIdReducer = (state, action) => {
    state.activeVehicleId = action.payload
}

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers:{
        populateStore: populateStoreReducer,
        removeVehicle: removeVehicleReducer,
        editVehicle: editVehicleReducer,
        setActiveVehicleId: setActiveVehicleIdReducer
    }
})

export const {populateStore, removeVehicle, editVehicle, setActiveVehicleId} = vehicleSlice.actions

export const getAllVehicles = (state) => state.vehicle.vehicles
export const getVehicleById = (state, vehicleId) => state.vehicle.vehicles.find((vehicle) => vehicle._id === vehicleId)
export const getActiveVehicleId = (state) => state.vehicle.activeVehicleId
export const getActiveVehicle = (state) => state.vehicle.vehicles.find((vehicle) => vehicle._id === state.vehicle.activeVehicleId)

export const uploadVehicleAvatar = (file) => {
    return async (dispatch) => {
        
    }
}

export default vehicleSlice.reducer