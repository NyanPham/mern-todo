import { useCallback } from 'react'
import Toast from './Toast'
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { close } from '../../redux/toastSlice'

const ToastContainer = () => {
    const state = useAppSelector((state) => state.toast)
    const dispatch = useAppDispatch()

    const handleClose = useCallback(() => {
        dispatch(close())
    }, [dispatch, close])

    let colorClasses = 'bg-amber-200 text-amber-700'
    let Icon = ExclamationCircleIcon

    if (state.type === 'success') {
        colorClasses = 'bg-green-200 text-green-600'
        Icon = CheckCircleIcon
    }

    if (state.type === 'error') {
        colorClasses = 'bg-red-200 text-red-700'
        Icon = XCircleIcon
    }

    return (
        <div className="z-30">
            <Toast {...state} onClose={handleClose} icon={Icon} colorClasses={colorClasses} />
        </div>
    )
}

export default ToastContainer
