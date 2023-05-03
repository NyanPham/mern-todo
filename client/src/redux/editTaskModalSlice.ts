import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface EditTaskModalState {
    isOpen: boolean
    isLoading: boolean
}

const initialState: EditTaskModalState = {
    isOpen: false,
    isLoading: false,
}

export const editTaskModalSlice = createSlice({
    name: 'editTaskModal',
    initialState,
    reducers: {
        openEditTaskModal: (state) => {
            state.isOpen = true
        },
        closeEditTaskModal: (state) => {
            state.isOpen = false
        },
        setEditTaskModalLoading: (state, { payload }) => {
            state.isLoading = payload
        },
    },
})

export const { openEditTaskModal, closeEditTaskModal, setEditTaskModalLoading } = editTaskModalSlice.actions
export const isOpen = (state: RootState) => state.editTaskModal.isOpen

export default editTaskModalSlice.reducer
