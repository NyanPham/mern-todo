import { useState } from 'react'
import Button from "../buttons/Button"
import { Input } from "../inputs/Input"
import Modal from "./Modal"
import { AcademicCapIcon } from "@heroicons/react/24/solid"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { open, close, signUp } from '../../redux/registerModalSlice'
import { RegisterData, RegisterModalState } from '../../redux/registerModalSlice'

const RegisterModal = () => {
    const { isOpen, isLoading }  = useAppSelector<RegisterModalState>(state => state.registerModal)
    const dispatch = useAppDispatch()
    const onClose = () => dispatch(close())
    const onOpen = () => dispatch(open())

    const [form, setForm] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })  

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Input 
                id="name"
                type="text"
                name="name"
                label="Username"
                disabled={false}
                value={form.name}
                onChange={handleFormChange}
            />
            <Input 
                id="email"
                type="email"
                name="email"
                label="Email"
                disabled={false}
                value={form.email}
                onChange={handleFormChange}
            />  
            <Input 
                id="password"
                type="password"
                name="password"
                label="Password"
                disabled={false}
                value={form.password}
                onChange={handleFormChange}
            />      
            <Input 
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                label="Confirm Password"
                disabled={false}    
                value={form.passwordConfirm}
                onChange={handleFormChange}
            />
        </div>
    )   

    const footerContent = (
        <>
            <hr />
                <div className="flex flex-col gap-3">
                    <Button 
                        label="Login with Google"
                        onClick={() => {}}
                        outline
                        icon={AcademicCapIcon}
                    />
                </div>
            <hr />
        </>
    )       

    async function handleRegister() {
        console.log('register now')
        await dispatch(signUp(form))
    }

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
        />
    )
}

export default RegisterModal