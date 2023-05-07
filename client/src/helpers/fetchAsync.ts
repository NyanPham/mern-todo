import { useAppDispatch } from '../hooks/reduxHooks'
import { hideLoading, showLoading } from '../redux/loadingLayerSlice'
import { open as openToast, setToastInfo } from '../redux/toastSlice'
import { ResponseData } from '../types'

export default async function fetchAsync(url: string, options: RequestInit) {
    const dispatch = useAppDispatch()
    dispatch(showLoading())

    try {
        const res = await fetch(url, options)

        const data: ResponseData = await res.json()

        return data
    } catch (error: any) {
        dispatch(
            setToastInfo({
                title: 'Error',
                subtitle: error.message,
                type: 'error',
            })
        )

        dispatch(openToast())
    } finally {
        dispatch(hideLoading())
    }
}
