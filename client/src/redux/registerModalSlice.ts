import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'

export type RegisterData = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
}

type ResponseData = {
    status: string,
    data: any
}

export interface RegisterModalState {
  isOpen: boolean,
  isLoading: boolean,
} 

// Define the initial state using that type
const initialState: RegisterModalState = {
  isOpen: false,
  isLoading: false
}
  
export const signUp = createAsyncThunk('user/signIn',
  async (body : RegisterData) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`, {
      method: 'POST', 
      body: JSON.stringify(body)
    }) 

    const data : ResponseData = await response.json()
    console.log(data)

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