import { useState, useCallback } from 'react'
import Button from '../buttons/Button'
import { Input } from '../inputs/Input'
import Modal from './Modal'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { open, close, signUp, RegisterModalState } from '../../redux/registerModalSlice'
import { setToastInfo, open as openToast } from '../../redux/toastSlice'
import { RegisterData } from '../../types'
import useForm from '../../hooks/useForm'
import { setCurrentUser } from '../../redux/userSlice'

const RegisterModal = () => {
    const { isOpen, isLoading } = useAppSelector<RegisterModalState>((state) => state.registerModal)
    const dispatch = useAppDispatch()
    const onClose = () => dispatch(close())
    const onOpen = () => dispatch(open())

    const { form, onFormChange, validateIfEmpty } = useForm<RegisterData>(
        {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        []
    )

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Input
                id="name"
                type="text"
                name="name"
                label="Username"
                disabled={false}
                value={form.name}
                required={true}
                onChange={onFormChange}
                validate={validateIfEmpty}
            />
            <Input
                id="email"
                type="email"
                name="email"
                label="Email"
                disabled={false}
                value={form.email}
                required={true}
                onChange={onFormChange}
                validate={validateIfEmpty}
            />
            <Input
                id="password"
                type="password"
                name="password"
                label="Password"
                disabled={false}
                required={true}
                value={form.password}
                onChange={onFormChange}
                validate={validateIfEmpty}
            />
            <Input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                label="Confirm Password"
                disabled={false}
                required={true}
                value={form.passwordConfirm}
                onChange={onFormChange}
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

    const handleRegister = useCallback(async () => {
        const { payload }: { payload: any } = await dispatch(signUp(form))

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
    }, [dispatch, signUp, form, openToast, setToastInfo, setCurrentUser])

    return (
        <Modal
            isLoading={isLoading}
            isOpen={isOpen}
            title="Register"
            subtitle="Create an account"
            onOpen={onOpen}
            onClose={onClose}
            buttonLabel="Submit"
            buttonAction={handleRegister}
            body={bodyContent}
            footer={footerContent}
            buttonLabelOnLoading="Submiting..."
        />
    )
}

export default RegisterModal
