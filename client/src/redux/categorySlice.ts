import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { CategoryData, ResponseData } from '../types'

export const createCategory = createAsyncThunk('categories/create', async (body: CategoryData, thunkApi) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/myCategories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    const data: ResponseData = await response.json()
    return data
})

interface CategoryState {
    categories: any[]
    currentCatgoryId: string | null
    isLoading: boolean
    error: string | null | undefined
    message: string | null
}

const initialState: CategoryState = {
    categories: [],
    currentCatgoryId: null,
    isLoading: false,
    error: '',
    message: '',
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategoryToStore: (state, { payload }) => {
            state.categories.push(payload.category)
        },
        setCategoriesFromUser: (state, { payload }) => {
            state.categories = payload.categories

            if (state.currentCatgoryId && state.categories.some((category) => category._id === state.currentCatgoryId))
                return

            state.currentCatgoryId = state.categories[0]._id
        },
        removeCategories: (state) => {
            state.categories = []
        },
        selectCategory: (state, { payload }) => {
            state.currentCatgoryId = payload.categoryId
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(createCategory.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload.status === 'success') {
                state.categories.push(payload.data.data)
                state.currentCatgoryId = payload.data.data._id
            } else {
                state.error = payload.message
            }
        })
        builder.addCase(createCategory.rejected, (state) => {
            state.isLoading = false

            state.error = 'Something went so wrong!'
        })
    },
})
export const { setCategoriesFromUser, removeCategories, selectCategory } = categorySlice.actions
export const categories = (state: RootState) => state.category.categories
export const currentCategoryId = (state: RootState) => state.category.currentCatgoryId

export default categorySlice.reducer
