import { configureStore } from '@reduxjs/toolkit'
import registerModalSlice from './registerModalSlice'
import loginModalSlice from './loginModalSlice'
import userSlice from './userSlice'
import toastSlice from './toastSlice'
import categorySlice from './categorySlice'
import taskSlice from './taskSlice'

export const store = configureStore({
    reducer: {
        registerModal: registerModalSlice,
        loginModal: loginModalSlice,
        currentUser: userSlice,
        toast: toastSlice,
        category: categorySlice,
        task: taskSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
