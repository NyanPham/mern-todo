import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { LoginData, ResponseData } from '../types'
import { hideLoading, showLoading } from './loadingLayerSlice'
import { setToastInfo, open as openToast } from './toastSlice'

export const signIn = createAsyncThunk('user/signIn', async (body: LoginData, { dispatch }) => {
    dispatch(showLoading())

    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })

        const data: ResponseData = await res.json()

        return data
    } catch (error: any) {
        dispatch(
            setToastInfo({
                title: 'Error',
                subtitle: error.message,
                type: 'error',
            })
        )

        dispatch(openToast())
    } finally {
        dispatch(hideLoading())
    }
})

interface LoginModalState {
    isOpen: boolean
    isLoading: boolean
}

const initialState: LoginModalState = {
    isOpen: false,
    isLoading: false,
}

export const loginModalSlice = createSlice({
    name: 'loginModal',

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
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signIn.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(signIn.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const { open, close } = loginModalSlice.actions
export const isOpen = (state: RootState) => state.loginModal.isOpen
export const isLoading = (state: RootState) => state.loginModal.isLoading

export default loginModalSlice.reducer
