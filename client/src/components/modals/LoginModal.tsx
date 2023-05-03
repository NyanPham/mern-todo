import { useCallback } from 'react'
import Button from '../buttons/Button'
import { Input } from '../inputs/Input'
import Modal from './Modal'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { open, close, signIn } from '../../redux/loginModalSlice'
import useForm from '../../hooks/useForm'
import { LoginData } from '../../types'
import { open as openToast, setToastInfo } from '../../redux/toastSlice'
import { setCurrentUser } from '../../redux/userSlice'

const LoginModal = () => {
    const isOpen = useAppSelector<boolean>((state) => state.loginModal.isOpen)
    const isLoading = useAppSelector<boolean>((state) => state.loginModal.isLoading)

    const dispatch = useAppDispatch()
    const onClose = () => dispatch(close())
    const onOpen = () => dispatch(open())

    const { form, onFormChange, validateIfEmpty } = useForm<LoginData>(
        {
            email: '',
            password: '',
        },
        []
    )

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Input
                id="email"
                type="email"
                name="email"
                label="Email"
                required={true}
                disabled={false}
                onChange={onFormChange}
                value={form.email}
                validate={validateIfEmpty}
            />
            <Input
                id="password"
                type="password"
                name="password"
                label="Password"
                required={true}
                disabled={false}
                onChange={onFormChange}
                value={form.password}
                validate={validateIfEmpty}
            />
        </div>
    )

    const footerContent = (
        <>
            <hr />
            <div className="flex flex-col gap-3">
                <Button label="Login with Google" onClick={() => {}} outline icon={AcademicCapIcon} />
            </div>
            <hr />
        </>
    )

    const handleSignIn = useCallback(async () => {
        const { payload }: { payload: any } = await dispatch(signIn(form))

        if (payload.status === 'success') {
            dispatch(
                setToastInfo({
                    title: 'Success',
                    subtitle: payload.message,
                    type: 'success',
                })
            )

            dispatch(openToast())
            dispatch(setCurrentUser(payload.currentUser))
            dispatch(close())
            return
        }

        dispatch(
            setToastInfo({
                title: 'Error',
                subtitle: payload.message,
                type: 'error',
            })
        )

        dispatch(openToast())
    }, [form, dispatch, openToast, setToastInfo, signIn, setCurrentUser])

    return (
        <Modal
            isOpen={isOpen}
            title="Sign In"
            subtitle="Welcome back to Nyan MERN"
            onOpen={onOpen}
            onClose={onClose}
            buttonLabel="Login"
            buttonAction={handleSignIn}
            body={bodyContent}
            footer={footerContent}
            isLoading={isLoading}
        />
    )
}

export default LoginModal
