import { useState, useEffect } from 'react'
import { InputValidateResult } from '../types'

export default function useInput<T>(initialValue: T, validate?: (value: any) => InputValidateResult) {
    const [input, setInput] = useState<T>(initialValue)
    const [error, setError] = useState<string>('')
    const [blur, setBlur] = useState<boolean>(false)
}
