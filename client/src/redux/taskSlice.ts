import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {
    TaskData,
    ResponseData,
    Task,
    ToggleTaskData,
    TaskToToggle,
    DeleteTaskData,
    UpdateTaskData,
    TaskToUpdate,
    UpdateOrder,
} from '../types'
import { setToastInfo, open as openToast } from './toastSlice'
import { hideLoading, showLoading } from './loadingLayerSlice'

export const createTaskAsync = createAsyncThunk('tasks/createTask', async (body: TaskData, { dispatch }) => {
    dispatch(showLoading())

    try {
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

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (body: DeleteTaskData, { dispatch }) => {
    try {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/me/myTasks/${body.taskId}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
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

export const updateTaskAsync = createAsyncThunk('tasks/updateTask', async (body: UpdateTaskData, { dispatch }) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/me/myTasks/${body.taskId}`

    const taskToUpdate: TaskToUpdate = {
        title: body.title,
        subtitle: body.subtitle,
        dueDate: body.dueDate,
    }

    dispatch(showLoading())
    try {
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(taskToUpdate),
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

export const changeTaskOrdersAsync = createAsyncThunk('tasks/updateTaskOrder', async (body: UpdateOrder[]) => {
    const promises = body.map((info) => {
        return fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/me/myTasks/${info.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ displayOrder: info.displayOrder }),
        })
    })

    const responses = await Promise.all(promises)
    const data: ResponseData[] = await Promise.all(responses.map((res) => res.json()))

    return data
})

interface TaskState {
    tasks: Task[]
    currentTaskId: string
    isLoading: boolean
    error: string | null | undefined
    message: string | null
    isHighlighted: boolean
}

const initialState: TaskState = {
    tasks: [],
    currentTaskId: '',
    isLoading: false,
    error: '',
    message: '',
    isHighlighted: false,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasksFromUsers: (state, { payload }) => {
            state.tasks = payload.tasks

            if (state.currentTaskId && state.tasks?.some((task) => task._id === state.currentTaskId)) return
            if (state.tasks?.length > 0) {
                state.currentTaskId = state.tasks[0]._id
            }
        },
        removeTasks: (state) => {
            state.tasks = []
        },
        toggleTaskComplete: (state, { payload }) => {
            const task = state.tasks.find((task) => task._id === payload.taskId)
            if (task == null) return
            task.isComplete = !task.isComplete
        },
        removeTask: (state, { payload }) => {
            state.tasks = state.tasks.filter((task) => task._id !== payload.taskId)
        },
        updateTask: (state, { payload }) => {
            const task = state.tasks.find((task) => task._id === payload.taskId)
            if (task == null) return

            task.title = payload.title
            task.subtitle = payload.subtitle
            task.dueDate = payload.dueDate
        },
        setCurrentTaskId: (state, { payload }) => {
            state.currentTaskId = payload.taskId
        },
        setHighlighted: (state, { payload }: { payload: boolean }) => {
            state.isHighlighted = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTaskAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(createTaskAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload?.status === 'success') {
                state.tasks.push(payload.data.data)
                state.currentTaskId = payload.data.data._id
            } else {
                state.error = payload?.message
            }
        })
        builder.addCase(createTaskAsync.rejected, (state) => {
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
            } else {
                state.error = payload.message
            }
        })
        builder.addCase(toggleCompleteAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when toggling the task'
        })
        builder.addCase(deleteTaskAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(deleteTaskAsync.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(deleteTaskAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when deleting the task'
        })
        builder.addCase(updateTaskAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(updateTaskAsync.fulfilled, (state, { payload }) => {
            state.isLoading = false

            if (payload?.status === 'success') {
                const task = state.tasks.find((task) => task._id === payload?.data.data._id)
                if (task == null) return

                task.title = payload?.data.data.title
                task.subtitle = payload?.data.data.subtitle
                task.dueDate = payload?.data.data.dueDate
            } else {
                state.error = payload?.message
            }
        })
        builder.addCase(updateTaskAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when updating the task'
        })

        builder.addCase(changeTaskOrdersAsync.pending, (state) => {
            state.isLoading = true
            state.error = ''
            state.message = ''
        })
        builder.addCase(changeTaskOrdersAsync.fulfilled, (state) => {
            state.isLoading = false
            state.message = 'Changed the order of tasks'
        })
        builder.addCase(changeTaskOrdersAsync.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong when updating the task'
        })
    },
})

export const {
    setTasksFromUsers,
    removeTasks,
    toggleTaskComplete,
    updateTask,
    removeTask,
    setCurrentTaskId,
    setHighlighted,
} = taskSlice.actions
export const tasks = (state: RootState) => state.task.tasks
export const currentTaskId = (state: RootState) => state.task.currentTaskId

export default taskSlice.reducer
