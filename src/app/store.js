import { configureStore } from '@reduxjs/toolkit'
import modeReducer from "./mode/modeSlice";

export default configureStore({
    reducer: {
        mode: modeReducer,
    },
})