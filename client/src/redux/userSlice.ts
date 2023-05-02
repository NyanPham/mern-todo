import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

type Task = {
    title: string,
    subtitle?: string,
    isComplete: boolean,
    createdAt: Date,
    modifiedAt: Date
}

interface UserState {
    value: {
        userInfo: {
            name: string, 
            email: string,
            id: string,
            tasks: Task[]
        } | null,
        isLoading: boolean,
        errors?: string,
        message?: string
    } | null
}   
          
// Define the initial state using that type
const initialState: UserState = {
    value: null,
}   

export const userSlice = createSlice({
  name: 'currentUser',

  initialState,
  reducers: {
    open: (state) => {

    },  
    close: (state) => {
      
    },
  },
  extraReducers: (builder) => {
  }
})
  
export const { open, close } = userSlice.actions
export const isOpen = (state: RootState) => state.currentUser.value

export default userSlice.reducer