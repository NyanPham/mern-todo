import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useForm from '../../hooks/useForm'
import Modal from './Modal'
import { closeEditTaskModal, setEditTaskModalLoading } from '../../redux/editTaskModalSlice'
import { Input } from '../inputs/Input'
import { updateTask, updateTaskAsync } from '../../redux/taskSlice'

const EditTaskModal = () => {
    const isOpen = useAppSelector((state) => state.editTaskModal.isOpen)
    const isLoading = useAppSelector((state) => state.editTaskModal.isLoading)
    const tasks = useAppSelector((state) => state.task.tasks)
    const currentTaskId = useAppSelector((state) => state.task.currentTaskId)
    const currentTask = tasks.find((task) => task._id === currentTaskId)
    const dispatch = useAppDispatch()

    const { form, onFormChange, validateIfEmpty } = useForm(
        {
            title: currentTask?.title || '',
            subtitle: currentTask?.subtitle || '',
            dueDate: currentTask?.dueDate,
        },
        [currentTask]
    )

    const onClose = useCallback(() => {
        dispatch(closeEditTaskModal())
    }, [])

    const onEdit = useCallback(async () => {
        dispatch(setEditTaskModalLoading(true))

        await dispatch(
            updateTaskAsync({
                taskId: currentTaskId,
                title: form.title,
                subtitle: form.subtitle,
                dueDate: form.dueDate,
            })
        )
        dispatch(setEditTaskModalLoading(false))
    }, [setEditTaskModalLoading, dispatch, updateTask, form])

    if (currentTask == null) return null

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Input
                id="title"
                type="text"
                name="title"
                label="Title"
                required={true}
                disabled={isLoading}
                onChange={onFormChange}
                value={form.title}
                validate={validateIfEmpty}
            />
            <Input
                id="subtitle"
                type="text"
                name="subtitle"
                label="Subtitle"
                required={false}
                disabled={isLoading}
                onChange={onFormChange}
                value={form.subtitle}
            />
            <Input
                id="dueDate"
                type="date"
                name="dueDate"
                label="Due Date."
                required={false}
                disabled={isLoading}
                onChange={onFormChange}
                value={form.dueDate}
            />
        </div>
    )

    return (
        <Modal
            isOpen={isOpen}
            isLoading={isLoading}
            title="Edit Task"
            subtitle={`You're editing ${currentTask.title}`}
            onClose={onClose}
            buttonLabel="Edit"
            buttonAction={onEdit}
            secondaryButtonLabel="Cancel"
            secondaryButtonAction={onClose}
            body={bodyContent}
        />
    )
}

export default EditTaskModal
