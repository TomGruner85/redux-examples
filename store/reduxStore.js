import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import taskSlice from "../slices/taskSlice";
import vehicleSlice from "../slices/vehicleSlice";

const reduxStore = configureStore({
    reducer: {
        auth: authSlice,
        vehicle: vehicleSlice,
        task: taskSlice
    }
})

export default reduxStore