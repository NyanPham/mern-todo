import { useState, useEffect } from 'react'
import { InputProps, InputValidateResult } from '../../types'

export const Input: React.FC<InputProps> = ({
    id,
    type,
    name,
    disabled,
    label,
    required,
    value,
    onChange,
    onBlur,
    onError,
    validate,
    small,
    underlineOnly,
    bgTransparent,
}) => {
    const [error, setError] = useState<string>('')
    const [blur, setOnBlur] = useState<boolean>(false)

    useEffect(() => {
        if (validate == null) return
        if (typeof validate !== 'function') return

        const validateResult: InputValidateResult | void = validate(value)

        if (validateResult) setError(validateResult.message)
    }, [value, validate])

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (blur) return

        setOnBlur(true)
        if (onBlur) onBlur(e)
    }

    return (
        <div className="relative w-full">
            <input
                className={`peer w-full outline-none transition duration-250
                    ${blur && error ? 'focus:ring-red-400 border-red-300' : 'focus:ring-cyan-400 border-gray-500'}
                    ${small ? 'py-1 px-3' : 'py-3 px-5'}
                    ${
                        underlineOnly
                            ? 'focus:ring-0 relative before:content-[""] before:fixed before:block before:top-full before:left-0 before:bg-white before:w-full before:h-0.5 before:origin-right before:scale-x-0 focus:before:scale-x-100'
                            : 'border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'
                    }       
                    ${bgTransparent ? 'bg-transparent text-white placeholder:text-white' : 'bg-white/70 text-gray-800'}
                `}
                type={type}
                id={id}
                name={name}
                disabled={disabled}
                onChange={onChange}
                onBlur={handleBlur}
                onError={onError}
                placeholder={small ? label : ' '}
                required={required}
                value={value}
            />
            {!small && (
                <label
                    className={`absolute top-3 left-5 scale-75 -translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 origin-[0] transition duration
                    ${blur && error ? 'text-red-700/80' : 'text-gray-800/80'}
                `}
                    htmlFor={id}
                >
                    {label || name}
                </label>
            )}

            {blur && error && <div className="text-red-600 text-sm pt-1 px-3">{error}</div>}
        </div>
    )
}
