import Button from "../buttons/Button"
import { Input } from "../inputs/Input"
import Modal from "./Modal"
import { AcademicCapIcon } from "@heroicons/react/24/solid"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { open, close } from '../../redux/loginModalSlice'

const LoginModal = () => {
    const isOpen = useAppSelector<boolean>(state => state.loginModal.value)
    const dispatch = useAppDispatch()
    const onClose = () => dispatch(close())
    const onOpen = () => dispatch(open())

    const bodyContent = (
        <div className="flex flex-col gap-3">
            <Input 
                id="email"
                type="email"
                name="email"
                label="Email"
                disabled={false}
                onChange={(e) => {}}
            />  
            <Input 
                id="password"
                type="password"
                name="password"
                label="Password"
                disabled={false}
                onChange={(e) => {}}
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
      
    return (
        <Modal 
            isOpen={isOpen}
            title="Sign In"
            subtitle="Welcome back to Nyan MERN"
            onOpen={onOpen}
            onClose={onClose}
            buttonLabel="Login"
            buttonAction={() => {}}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal