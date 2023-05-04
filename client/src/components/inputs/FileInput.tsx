export interface FileInputProps {
    id: string
    name: string
    label: string
    disabled?: boolean
    required?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput: React.FC<FileInputProps> = ({ id, name, disabled, required, onChange, label }) => {
    return (
        <div className="relative w-full">
            <input
                type="file"
                id={id}
                name={name}
                disabled={disabled}
                onChange={onChange}
                placeholder=" "
                required={required}
            />
            <label
                className={`absolute top-3 left-5 scale-75 -translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 origin-[0] transition duration
                `}
                htmlFor={id}
            >
                {label || name}
            </label>
        </div>
    )
}

export default FileInput
