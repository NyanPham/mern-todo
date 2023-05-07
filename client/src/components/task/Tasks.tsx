import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import InputWithPlus from '../inputs/InputWithPlus'
import Task from './Task'
import { setToastInfo, open as openToast } from '../../redux/toastSlice'
import { createTaskAsync, removeTasks, setTasksFromUsers } from '../../redux/taskSlice'
import CategoryHeading from '../category/CategoryHeading'
import useDraggableWithDatabase from '../../hooks/useDraggableWithDatabase'

const Tasks = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const tasks = useAppSelector((state) => state.task.tasks)
    // const currentTaskId = useAppSelector((state) => state.task.currentTaskId)
    const currentCategoryId = useAppSelector((state) => state.category.currentCategoryId)
    const tasksInCategory = tasks.filter((task) => task.categoryId === currentCategoryId)
    const dispatch = useAppDispatch()

    const { blocksContainerRef, handleDragStart, handleDragEnd, handleDragMove, handleDragDrop } =
        useDraggableWithDatabase([tasks, currentCategoryId], 'task')

    useEffect(() => {
        if (currentUser == null) {
            dispatch(removeTasks())
            return
        }

        if (currentUser.tasks == null) return

        dispatch(setTasksFromUsers({ tasks: currentUser.tasks }))
    }, [currentUser, dispatch, removeTasks, setTasksFromUsers])

    const [taskText, setTaskText] = useState<string>('')

    function onTaskTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskText(e.target.value)
    }

    function onCreateTask() {
        if (currentUser == null) {
            dispatch(
                setToastInfo({
                    title: 'Sorry',
                    subtitle: 'You have not logged in yet!',
                    type: 'error',
                })
            )

            dispatch(openToast())
            return
        }

        dispatch(createTaskAsync({ title: taskText, categoryId: currentCategoryId }))
        setTaskText('')
    }

    function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code !== 'Enter') return
        if (taskText === '') return

        onCreateTask()
    }

    return (
        <div className="w-full bg-white/20 rounded-lg backdrop-blur-lg shadow-white overflow-hidden md:w-2/3 lg:-3/5">
            <CategoryHeading />
            <hr />
            {currentCategoryId ? (
                <div className="max-h-96 overflow-y-auto" ref={blocksContainerRef}>
                    {currentUser && tasksInCategory?.length ? (
                        tasksInCategory.map((task) => (
                            <Task
                                key={task._id}
                                id={task._id}
                                title={task.title}
                                subtitle={task.subtitle}
                                isComplete={task.isComplete}
                                categoryId={task.categoryId}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragMove={handleDragMove}
                                onDragDrop={handleDragDrop}
                            />
                        ))
                    ) : (
                        <h3 className="p-4 text-rose-700 bg-rose-300">You have no tasks in this category. Add one!</h3>
                    )}
                </div>
            ) : (
                <h3 className="p-4 text-rose-700 bg-rose-300">Please select a category on the left.</h3>
            )}
            <hr />
            <div className="p-4">
                <InputWithPlus
                    id="add-task"
                    type="task"
                    name="task"
                    label="Add task"
                    value={taskText}
                    required={true}
                    disabled={false}
                    onChange={onTaskTextChange}
                    small
                    underlineOnly
                    bgTransparent
                    onPlusIconClick={onCreateTask}
                    onKeyPress={onEnterPress}
                />
            </div>
        </div>
    )
}

export default Tasks
