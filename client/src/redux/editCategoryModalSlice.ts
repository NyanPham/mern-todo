import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface EditCategoryModalState {
    isOpen: boolean
    isLoading: boolean
}

const initialState: EditCategoryModalState = {
    isOpen: false,
    isLoading: false,
}

export const editCategoryModalSlice = createSlice({
    name: 'editCategoryModal',
    initialState,
    reducers: {
        openCategoryModal: (state) => {
            state.isOpen = true
        },
        closeCategoryModal: (state) => {
            state.isOpen = false
        },
        setCategoryModalLoading: (state, { payload }) => {
            state.isLoading = payload
        },
    },
})

export const { openCategoryModal, closeCategoryModal, setCategoryModalLoading } = editCategoryModalSlice.actions
export const isOpen = (state: RootState) => state.editCategoryModal.isOpen
export const isLoading = (state: RootState) => state.editCategoryModal.isLoading

export default editCategoryModalSlice.reducer
