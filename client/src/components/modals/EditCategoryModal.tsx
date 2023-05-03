import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useForm from '../../hooks/useForm'
import Modal from './Modal'
import { closeCategoryModal, setCategoryModalLoading } from '../../redux/editCategoryModalSlice'
import { Input } from '../inputs/Input'
import { updateCategory, updateCategoryAsync } from '../../redux/categorySlice'

const EditCategoryModal = () => {
    const isOpen = useAppSelector((state) => state.editCategoryModal.isOpen)
    const isLoading = useAppSelector((state) => state.editCategoryModal.isLoading)
    const categories = useAppSelector((state) => state.category.categories)
    const currentCategoryId = useAppSelector((state) => state.category.currentCategoryId)

    const currentCategory = categories.find((category) => category._id === currentCategoryId)

    const dispatch = useAppDispatch()

    const { form, onFormChange, validateIfEmpty } = useForm(
        {
            title: currentCategory?.title || '',
            description: currentCategory?.description || '',
        },
        [currentCategory]
    )

    const onClose = useCallback(() => {
        dispatch(closeCategoryModal())
    }, [])

    const onEdit = useCallback(async () => {
        dispatch(setCategoryModalLoading(true))

        await dispatch(
            updateCategoryAsync({
                categoryId: currentCategoryId,
                title: form.title,
                description: form.description,
            })
        )
        dispatch(setCategoryModalLoading(false))
    }, [setCategoryModalLoading, dispatch, updateCategory, form])

    if (currentCategory == null) return null

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
                id="description"
                type="text"
                name="description"
                label="Description"
                required={false}
                disabled={isLoading}
                onChange={onFormChange}
                value={form.description}
            />
        </div>
    )

    return (
        <Modal
            isOpen={isOpen}
            isLoading={isLoading}
            title="Edit Task"
            subtitle={`You're editing ${currentCategory.title}`}
            onClose={onClose}
            buttonLabel="Edit"
            buttonAction={onEdit}
            secondaryButtonLabel="Cancel"
            secondaryButtonAction={onClose}
            body={bodyContent}
        />
    )
}

export default EditCategoryModal
