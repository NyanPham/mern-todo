import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface LoginModalState {
  value: boolean
}

// Define the initial state using that type
const initialState: LoginModalState = {
  value: false,
}

export const loginModalSlice = createSlice({
  name: 'loginModal',

  initialState,
  reducers: {
    open: (state) => {
        state.value = true
    },  
    close: (state) => {
      state.value = false
    },
  },
})
  
export const { open, close } = loginModalSlice.actions
export const isOpen = (state: RootState) => state.loginModal.value

export default loginModalSlice.reducer