import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { IUpdateAccount } from '../../types'
import ImageInput from '../inputs/ImageInput'
import { Input } from '../inputs/Input'
import Button from '../buttons/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { updateAccount } from '../../redux/userSlice'

interface UpdateAccountProps {}

const UpdateAccount: React.FC<UpdateAccountProps> = ({}) => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)

    const { isLoading, errors, messages } = useAppSelector((state) => state.currentUser)
    const dispatch = useAppDispatch()

    const { form, onFormChange } = useForm<IUpdateAccount>(
        {
            name: currentUser?.name,
            email: currentUser?.email,
        },
        [currentUser]
    )

    const [image, setImage] = useState<File>()

    function onImageChosen(file: File) {
        setImage(file)
    }

    async function handleUpdateAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', form.name as string)
        formData.append('email', form.email as string)
        if (image != null) formData.append('imageSrc', image as File)

        await dispatch(updateAccount(formData))
    }

    return (
        <div className="">
            <form className="space-y-3" onSubmit={handleUpdateAccount}>
                {errors.updateAccount && (
                    <h3 className="text-red-700 bg-red-300/70 py-2 px-3 rounded-md">{errors.updateAccount}</h3>
                )}
                {messages.updateAccount && (
                    <h3 className="text-green-700 bg-green-300/70 py-2 px-3 rounded-md">{messages.updateAccount}</h3>
                )}

                <Input
                    id="name"
                    type="text"
                    name="name"
                    label="Username"
                    required={false}
                    // disabled={false}
                    onChange={onFormChange}
                    value={form.name}
                />
                <Input
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    required={false}
                    // disabled={false}
                    onChange={onFormChange}
                    value={form.email}
                />
                <ImageInput
                    id="image"
                    name="avatar"
                    label="Avatar"
                    required={false}
                    // disabled={false}
                    onImageChosen={onImageChosen}
                    onChange={() => {}}
                />
                <Button
                    type="submit"
                    onClick={() => {}}
                    label={isLoading ? 'Updating...' : 'Update'}
                    disabled={isLoading}
                />
            </form>
        </div>
    )
}

export default UpdateAccount
