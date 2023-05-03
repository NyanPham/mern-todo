import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { TaskData, ResponseData, Task, ToggleTaskData, TaskToToggle } from '../types'

export const createTask = createAsyncThunk('tasks/createTask', async (body: TaskData) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/myTasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    })

    const data: ResponseData = await res.json()
    return data
})

export const toggleCompleteAsync = createAsyncThunk('tasks/toggleTask', async (body: ToggleTaskData) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/me/myTasks/${body.taskId}`
    const taskTotoggle: TaskToToggle = {
        isComplete: body.isComplete,
    }

    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(taskTotoggle),
    })

    const data: ResponseData = await res.json()
    return data
})

interface TaskState {
    tasks: Task[]
    currentTaskId: string | null
    isLoading: boolean
    error: string | null | undefined
    message: string | null
}

const initialState: TaskState = {
    tasks: [],
    currentTaskId: null,
    isLoading: false,
    error: '',
    message: '',
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasksFromUsers: (state, { payload }) => {
            state.tasks = payload.tasks

            if (state.currentTaskId && state.tasks.some((task) => task._id === state.currentTaskId)) return
            state.currentTaskId = state.tasks[0]._id
        },
        removeTasks: (state) => {
            state.tasks = []
        },
        toggleTaskComplete: (state, { payload }) => {
            const task = state.tasks.find((task) => task._id === payload.taskId)
            if (task == null) return
            task.isComplete = !task.isComplete
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(createTask.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload.status === 'success') {
                state.tasks.push(payload.data.data)
                state.currentTaskId = payload.data.data._id
            } else {
                state.error = payload.message
            }
        })
        builder.addCase(createTask.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when adding task'
        })
        builder.addCase(toggleCompleteAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(toggleCompleteAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload.status === 'success') {
                console.log(payload.data.data)
            } else {
                state.error = payload.message
            }
        })
        builder.addCase(toggleCompleteAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when toggle the task'
        })
    },
})

export const { setTasksFromUsers, removeTasks, toggleTaskComplete } = taskSlice.actions
export const tasks = (state: RootState) => state.task.tasks
export const currentTaskId = (state: RootState) => state.task.currentTaskId

export default taskSlice.reducer
