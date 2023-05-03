import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { toggleCompleteAsync, toggleTaskComplete } from '../../redux/taskSlice'

interface Task {
    id: string
    title: string
    subtitle?: string
    categoryId: string
    isComplete: boolean
    imageSrc?: string
    createdAt?: Date
    modifiedAt?: Date
}

const Task: React.FC<Task> = ({ title, id, subtitle, categoryId, isComplete, imageSrc, createdAt, modifiedAt }) => {
    const dispatch = useAppDispatch()

    function handleTaskClick() {
        dispatch(toggleTaskComplete({ taskId: id }))
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
            className={`py-3 px-4 hover:bg-gray-900/30 cursor-pointer relative before:content-[""] before:absolute before:top-1/2 before:left-4 before:-translate-y-1/2 before:w-11/12 before:h-[2px] before:bg-gray-900 before:transition before:duration-500
                ${isComplete ? 'before:scale-x-100 before:origin-left' : 'before:scale-x-0 before:origin-right'}
            }`}
            onClick={handleTaskClick}
        >
            <h3 className="">{title}</h3>
        </div>
    )
}

export default Task
