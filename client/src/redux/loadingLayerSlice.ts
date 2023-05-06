import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface LoadingLayerState {
    showLoadingLayer: boolean
}

const initialState: LoadingLayerState = {
    showLoadingLayer: false,
}

export const loadingLayerSlice = createSlice({
    name: 'loadingLayer',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.showLoadingLayer = true
        },
        hideLoading: (state) => {
            state.showLoadingLayer = false
        },
    },
})

export const { showLoading, hideLoading } = loadingLayerSlice.actions
export const showLoadingLayer = (state: RootState) => state.loadingLayer.showLoadingLayer

export default loadingLayerSlice.reducer
