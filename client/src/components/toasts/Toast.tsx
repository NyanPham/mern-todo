import { useState, useEffect, useRef, useCallback } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
    isOpen: boolean
    type: 'success' | 'error' | 'warning'
    title: string
    subtitle?: string
    icon: any
    colorClasses: string

    onClose: () => void
    onOpen?: () => void
}

type timeoutType = ReturnType<typeof setTimeout>

const Toast: React.FC<ToastProps> = ({ isOpen, title, subtitle, onClose, icon: Icon, colorClasses }) => {
    const [show, setShow] = useState(isOpen)
    const timeoutRef = useRef<timeoutType | null>(null)

    useEffect(() => {
        setShow(isOpen)
    }, [isOpen, setShow])

    const handleClose = useCallback(() => {
        setShow(false)
        setTimeout(onClose, 300)
    }, [])

    useEffect(() => {
        if (show) {
            timeoutRef.current = setTimeout(handleClose, 3000)
        }

        return () => {
            if (timeoutRef.current == null) return
            clearTimeout(timeoutRef.current)
        }
    }, [show, handleClose])

    if (!isOpen) return null

    return (
        <div
            className={`fixed top-10 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 lg:w-80 z-30 py-3 px-5 rounded-lg shadow-md flex flex-row items-center gap-4 transition duration-300 ${colorClasses} ${
                show ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
            }`}
        >
            <XMarkIcon className="w-3 h-3 absolute top-5 right-5 cursor-pointer" onClick={handleClose} />
            <div className="">
                <Icon className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold text-lg">{title}</h3>
                {subtitle && <h4 className="font-normal text-sm">{subtitle}</h4>}
            </div>
        </div>
    )
}

export default Toast
