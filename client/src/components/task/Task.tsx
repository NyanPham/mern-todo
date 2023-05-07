import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
    deleteTaskAsync,
    removeTask,
    setCurrentTaskId,
    setHighlighted,
    toggleCompleteAsync,
    toggleTaskComplete,
} from '../../redux/taskSlice'
import TaskButtons from './TaskButtons'
import { openEditTaskModal } from '../../redux/editTaskModalSlice'

interface Task {
    id: string
    title: string
    subtitle?: string
    categoryId: string
    isComplete: boolean
    imageSrc?: string
    createdAt?: Date
    modifiedAt?: Date
    dueDate?: Date

    onDragStart: (e: React.DragEvent<HTMLInputElement>) => void
    onDragMove: (e: React.DragEvent<HTMLInputElement>) => void
    onDragEnd: (e: React.DragEvent<HTMLInputElement>) => void
    onDragDrop: (e: React.DragEvent<HTMLInputElement>) => void
}

const Task: React.FC<Task> = ({ title, id, isComplete, dueDate, onDragStart, onDragMove, onDragEnd, onDragDrop }) => {
    const currentTaskId = useAppSelector((state) => state.task.currentTaskId)
    const isHighlighted = useAppSelector((state) => state.task.isHighlighted)
    const dispatch = useAppDispatch()

    const currentIsHighlighted = isHighlighted && currentTaskId === id

    useEffect(() => {
        if (currentIsHighlighted) {
            setTimeout(() => {
                dispatch(setHighlighted(false))
            }, 2000)
        }
    }, [isHighlighted, currentTaskId])

    function handleToggleComplete() {
        dispatch(toggleTaskComplete({ taskId: id }))
    }

    function handleDeleteTask() {
        dispatch(removeTask({ taskId: id }))
        dispatch(deleteTaskAsync({ taskId: id }))
    }

    function handleOpenEditModal() {
        dispatch(setCurrentTaskId({ taskId: id }))
        dispatch(openEditTaskModal())
    }

    useEffect(() => {
        dispatch(
            toggleCompleteAsync({
                taskId: id,
                isComplete,
            })
        )
    }, [isComplete, dispatch, toggleCompleteAsync])

    return (
        <div
            className={`select-none flex flex-row items-center justify-between py-3 px-4 hover:bg-gray-900/30 cursor-pointer transition text-white ${
                currentIsHighlighted ? 'bg-yellow-500 duration-200 text-white' : 'duration-500'
            }`}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragMove}
            onDrop={onDragDrop}
            data-drag-item={id}
        >
            <div className="flex flex-row items-center justify-start gap-3">
                <div
                    className={`peer w-7 h-7 rounded-full border-2 inline-grid place-items-center transition duration-200 cursor-pointer ${
                        isComplete ? 'border-cyan-200' : 'border-white-800'
                    }`}
                    onClick={handleToggleComplete}
                >
                    <div
                        className={`w-4 h-4 rounded-full transition duration-200 text-white ${
                            isComplete ? 'bg-cyan-200' : 'bg-transparent'
                        }`}
                    ></div>
                </div>
                <h3
                    className={`relative before:content-[""] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-full before:h-[2px] before:bg-gray-900 before:transition before:duration-500
                    ${isComplete ? 'before:scale-x-100 before:origin-left' : 'before:scale-x-0 before:origin-right'}
                `}
                >
                    {title}
                </h3>
            </div>
            {dueDate && <p>{dueDate.toString()}</p>}
            <TaskButtons
                isComplete={isComplete}
                onToggleComplete={handleToggleComplete}
                onTaskDelete={handleDeleteTask}
                onOpenEditModal={handleOpenEditModal}
            />
        </div>
    )
}

export default Task
