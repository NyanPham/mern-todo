import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { CurrentUser, ResponseData, UpdatePasswordData } from '../types'
import { hideLoading, showLoading } from './loadingLayerSlice'
import { setToastInfo, open as openToast } from './toastSlice'

export const signOut = createAsyncThunk('users/signOut', async (_, { dispatch }) => {
    dispatch(showLoading())

    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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

export const updateAccount = createAsyncThunk('users/updateAccount', async (body: FormData, { dispatch }) => {
    dispatch(showLoading())

    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/myAccount`, {
            method: 'PATCH',
            headers: {},
            credentials: 'include',
            body: body,
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

export const updatePassword = createAsyncThunk(
    'users/updatePassword',
    async (body: UpdatePasswordData, { dispatch }) => {
        dispatch(showLoading())

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/updatePassword`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
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
    }
)

export const checkLoggedIn = createAsyncThunk('users/checkLoggedIn', async (_, { dispatch }) => {
    dispatch(showLoading())

    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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

interface IUserAsyncState {
    signOut: string
    updateAccount: string
    updatePassword: string
}

interface UserState {
    userInfo: CurrentUser | null
    isLoading: boolean
    errors: IUserAsyncState
    messages: IUserAsyncState
}

const initialState: UserState = {
    userInfo: null,
    isLoading: false,
    errors: { signOut: '', updateAccount: '', updatePassword: '' },
    messages: { signOut: '', updateAccount: '', updatePassword: '' },
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
            state.userInfo = action.payload

            state.userInfo = {
                ...action.payload,
                categories: [...action.payload.categories].sort(
                    (cate1, cate2) => cate1.displayOrder - cate2.displayOrder
                ),
                tasks: [...action.payload.tasks].sort((task1, task2) => task1.displayOrder - task2.displayOrder),
            }
        },

        removeCurrentUser: (state) => {
            state.userInfo = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signOut.pending, (state) => {
            state.isLoading = true
            state.errors.signOut = ''
            state.messages.signOut = ''
        })
        builder.addCase(signOut.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload?.status === 'success') {
                state.userInfo = null
            } else {
                state.errors.signOut = payload?.message || ''
            }
        })
        builder.addCase(signOut.rejected, (state) => {
            state.isLoading = false
            state.errors.signOut = 'Something went so wrong when logging you out!'
        })

        builder.addCase(updateAccount.pending, (state) => {
            state.isLoading = true
            state.errors.updateAccount = ''
            state.messages.updateAccount = ''
        })
        builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
            state.isLoading = false
            if (payload?.status === 'success') {
                state.userInfo = payload?.data.data

                state.messages.updateAccount = 'Profile is updated successfully!'
            } else {
                state.errors.updatePassword = payload?.message || ''
            }
        })
        builder.addCase(updateAccount.rejected, (state) => {
            state.isLoading = false
            state.errors.updateAccount = 'Something went so wrong when updating your info!'
        })

        builder.addCase(updatePassword.pending, (state) => {
            state.isLoading = true
            state.errors.updatePassword = ''
            state.messages.updatePassword = ''
        })
        builder.addCase(updatePassword.fulfilled, (state, { payload }) => {
            state.isLoading = false
            if (payload?.status === 'success') {
                state.messages.updatePassword = 'Your password has been updated!'
            } else {
                state.errors.updatePassword = payload?.message || ''
            }
        })
        builder.addCase(updatePassword.rejected, (state) => {
            state.isLoading = false
            state.errors.updatePassword = 'Something went so wrong when updating your password!'
        })

        builder.addCase(checkLoggedIn.pending, (state) => {
            state.isLoading = true
            state.errors = {
                signOut: '',
                updateAccount: '',
                updatePassword: '',
            }
            state.messages = {
                signOut: '',
                updateAccount: '',
                updatePassword: '',
            }
        })
        builder.addCase(checkLoggedIn.fulfilled, (state, { payload }) => {
            state.isLoading = false
            if (payload?.status === 'success') {
                state.userInfo = {
                    ...payload?.data.currentUser,
                    categories: [...payload?.data.currentUser.categories].sort(
                        (cate1, cate2) => cate1.displayOrder - cate2.displayOrder
                    ),
                    tasks: [...payload?.data.currentUser.tasks].sort(
                        (task1, task2) => task1.displayOrder - task2.displayOrder
                    ),
                }
            } else {
                state.errors.updatePassword = payload?.message || ''
            }
        })
        builder.addCase(checkLoggedIn.rejected, (state) => {
            state.isLoading = false
            state.errors.updatePassword = 'Something went so wrong when relogging you in the app'
        })
    },
})

export const { setCurrentUser, removeCurrentUser } = userSlice.actions
export const currentUser = (state: RootState) => state.currentUser.userInfo
export const isLoading = (state: RootState) => state.currentUser.isLoading
export const message = (state: RootState) => state.currentUser.messages
export const errors = (state: RootState) => state.currentUser.errors

export default userSlice.reducer
