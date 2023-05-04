import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import useForm from '../../hooks/useForm'
import { updatePassword } from '../../redux/userSlice'
import { UpdatePasswordData } from '../../types'
import Button from '../buttons/Button'
import { Input } from '../inputs/Input'

const UpdatePassword = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const { isLoading, errors, messages } = useAppSelector((state) => state.currentUser)
    const dispatch = useAppDispatch()

    const { form, onFormChange } = useForm<UpdatePasswordData>(
        {
            currentPassword: '',
            password: '',
            passwordConfirm: '',
        },
        [currentUser]
    )

    function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        dispatch(updatePassword(form))
    }

    return (
        <div className="">
            <form className="space-y-3" onSubmit={handleUpdatePassword}>
                {errors.updatePassword && (
                    <h3 className="text-red-700 bg-red-300/70 py-2 px-3 rounded-md">{errors.updatePassword}</h3>
                )}
                {messages.updatePassword && (
                    <h3 className="text-green-700 bg-green-300/70 py-2 px-3 rounded-md">{messages.updatePassword}</h3>
                )}

                <Input
                    id="currentPassword"
                    type="password"
                    name="currentPassword"
                    label="Current Password"
                    required={true}
                    disabled={isLoading}
                    onChange={onFormChange}
                    value={form.currentPassword}
                />
                <Input
                    id="password"
                    type="password"
                    name="password"
                    label="New Password"
                    required={true}
                    disabled={isLoading}
                    onChange={onFormChange}
                    value={form.password}
                />
                <Input
                    id="passwordConfirm"
                    type="password"
                    name="passwordConfirm"
                    label="New Password Confirm"
                    required={true}
                    disabled={isLoading}
                    onChange={onFormChange}
                    value={form.passwordConfirm}
                />
                <Button
                    type="submit"
                    onClick={() => {}}
                    label={isLoading ? 'Changing...' : 'Change Password'}
                    disabled={isLoading}
                />
            </form>
        </div>
    )
}

export default UpdatePassword
