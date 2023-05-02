interface ButtonProps {
    label: string,
    onClick: () => any,
    type?: 'button' | 'submit' | 'reset'
    outline?: boolean,
    small?: boolean,
    disabled?: boolean,
    icon?: any,
    labelOnDisabled?: string
}   

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    outline,
    small,
    type,
    disabled,
    icon: Icon,
    labelOnDisabled
}) => { 
  return (
    <button 
        type={type}
        onClick={onClick}
        className={`    
            block shrink-0 grow rounded-lg hover:-translate-y-1 hover:shadow-md transition duration-200 border relative disabled:bg-gray-400 disabled:text-gray-600 disabled:border-none disabled:cursor-not-allowed
            ${small ? "text-sm font-light py-1 px-4": "text-lg font-semibold py-2 px-5"}
            ${outline ? "bg-white border-gray-700 text-gray-800": "bg-cyan-500 border-cyan-500 text-white"}
        `}
        disabled={disabled}
    >   
        {Icon && (
            <Icon className="w-7 h-7 absolute top-1/2 -translate-y-1/2 left-3" />
        )}  
        {disabled && labelOnDisabled ? labelOnDisabled : label}
    </button>
  )
}

export default Button