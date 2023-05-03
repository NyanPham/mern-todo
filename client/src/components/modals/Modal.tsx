import { useState, useEffect, useCallback } from 'react'
import Heading from '../Heading'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../buttons/Button'

interface ModalProps {
    isOpen: boolean
    title: string
    subtitle?: string | null
    onClose: () => void
    onOpen?: () => void
    body: React.ReactNode
    footer?: React.ReactNode | null
    buttonLabel: string
    buttonAction: () => void
    secondaryButtonLabel?: string
    secondaryButtonAction?: () => void
    isLoading?: boolean
    buttonLabelOnLoading?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    subtitle,
    onClose,
    body,
    footer,
    buttonLabel,
    buttonAction,
    secondaryButtonAction,
    secondaryButtonLabel,
    isLoading,
    buttonLabelOnLoading,
}) => {
    const [show, setShow] = useState<boolean>(isOpen)

    useEffect(() => {
        setShow(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        setShow(false)

        setTimeout(onClose, 300)
    }, [isOpen, setShow])

    if (!isOpen) return null

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-900/70 grid place-items-center transition duration-300 ${
                show ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                className={`w-2/3 md:w-1/2 lg:w-[450px] bg-white py-4 px-6 rounded-lg shadow-lg flex flex-col gap-4 transition duration-300 ${
                    show ? 'translate-y-0' : '-translate-y-5'
                }`}
            >
                {/* Header */}
                <div className="relative">
                    <Heading title={title} subtitle={subtitle} />
                    <XMarkIcon
                        className="w-5 h-5 absolute top-5 right-1 text-gray-600 cursor-pointer"
                        onClick={handleClose}
                    />
                </div>
                <hr />
                {/* Body */}
                {body}
                {/* Footer */}
                {footer}

                {/* Actions */}
                <div className="flex flex-row gap-2 w-full">
                    {secondaryButtonLabel && secondaryButtonAction && (
                        <Button
                            label={secondaryButtonLabel}
                            onClick={secondaryButtonAction}
                            type="submit"
                            disabled={isLoading}
                            outline
                        />
                    )}
                    <Button
                        label={buttonLabel}
                        onClick={buttonAction}
                        type="submit"
                        disabled={isLoading}
                        labelOnDisabled={buttonLabelOnLoading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Modal
