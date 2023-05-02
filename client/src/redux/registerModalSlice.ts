import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { RegisterData, ResponseData } from '../types'


export interface RegisterModalState {
  isOpen: boolean,
  isLoading: boolean,
} 

const initialState: RegisterModalState = {
  isOpen: false,
  isLoading: false
}

export const signUp = createAsyncThunk('user/signIn',
  async (body : RegisterData) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`, {
      method: 'POST', 
      credentials: "include",
      headers: {  
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(body)
    }) 

    const data : ResponseData = await res.json()
    return data
  }
)

export const registerModalSlice = createSlice({
  name: 'registerModal',

  initialState,
  reducers: {
    open: (state) => {
        state.isOpen = true
    },  
    close: (state) => {
      state.isOpen = false
    },
  },  
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, state => {
      state.isLoading = true
    });
    builder.addCase(signUp.fulfilled, state => {
      state.isLoading = false
    });
    builder.addCase(signUp.rejected, state => {
      state.isLoading = false
    }); 
  }
})

export const { open, close } = registerModalSlice.actions
export const isOpen = (state: RootState) => state.registerModal.isOpen
export const isLoading = (state: RootState) => state.registerModal.isLoading
  
export default registerModalSlice.reducer