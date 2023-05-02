import { useState, useCallback } from 'react'

export default function useForm<T>(initialState : T) {
    const [form, setForm] = useState<T>(initialState)

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }   

    const validateIfEmpty = useCallback((value: any) => {
        if (value === "" || value == null) return {
            message: "Please fill in this field",
            isError: true,
        }

        return { message: "", isError: true }
    }, []) 

    return { form, onFormChange, validateIfEmpty }
}