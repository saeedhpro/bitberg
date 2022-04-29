import { createSlice } from '@reduxjs/toolkit'

export const modeSlice = createSlice({
    name: 'mode',
    initialState: {
        isDark: false,
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.isDark = !state.isDark
        },
    },
})

export const { toggleDarkMode } = modeSlice.actions

export default modeSlice.reducer