import React from "react"

interface InputProps {
    id: string,
    type: string,
    name: string,
    label?: string,
    required?: boolean,
    disabled?: boolean,
    value?: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onError?: () => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
    id,
    type,
    name,
    onChange,
    onBlur,
    onError,
    disabled,
    label,
    required,
    value,
    ...rest
 }) => {
  return (
    <div
        className="relative w-full"
    >
        <input 
            className="peer w-full outline-none border border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 rounded-md py-3 px-5 transition duration-250"
            type={type}
            id={id}
            name={name}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onError={onError}
            placeholder=" "
            required={required}
            value={value}
            {...rest}
        />  
        <label 
            className="absolute top-3 left-5 scale-75 -translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 origin-[0] transition duration"
            htmlFor={id}
        >   
            {label || name}
        </label>
    </div>
  )
}
