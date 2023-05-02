import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { CurrentUser } from '../types'

interface UserState {
    userInfo: CurrentUser | null,
    isLoading: boolean,
    errors?: string,
    message?: string
}       

const initialState: UserState = {
    userInfo: null,
    isLoading: false,
    errors: "",
    message: "",
}   

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
        state.userInfo = action.payload
    },  
    removeCurrentUser: (state => {
        state.userInfo = null
    })
  },    
})
    
export const { setCurrentUser, removeCurrentUser } = userSlice.actions
export const currentUser = (state: RootState) => state.currentUser.userInfo

export default userSlice.reducer