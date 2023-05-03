import { useState, useCallback, useEffect } from 'react'

export default function useForm<T>(initialState: T, dependencies: any[]) {
    const [form, setForm] = useState<T>(initialState)

    useEffect(() => {
        setForm(initialState)
    }, [...dependencies])

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }))
    }

    const validateIfEmpty = useCallback((value: any) => {
        if (value === '' || value == null)
            return {
                message: 'Please fill in this field',
                isError: true,
            }

        return { message: '', isError: true }
    }, [])

    return { form, onFormChange, validateIfEmpty }
}
