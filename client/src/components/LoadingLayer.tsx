import { useAppSelector } from '../hooks/reduxHooks'

interface LoadingLayerProps {}

const LoadingLayer: React.FC<LoadingLayerProps> = ({}) => {
    const showLoadingLayer = useAppSelector((state) => state.loadingLayer.showLoadingLayer)

    if (!showLoadingLayer) return null

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-sky-900/90 grid place-items-center">
            <div className="loader-icon inline-block relative w-20 h-20">
                <div className="absolute top-8 left-2 w-3 h-3 rounded-full bg-white animate-loaderIconFirst"></div>
                <div className="absolute top-8 left-2 w-3 h-3 rounded-full bg-white animate-loaderIconSecond"></div>
                <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-white animate-loaderIconThird"></div>
                <div className="absolute top-8 left-14 w-3 h-3 rounded-full bg-white animate-loaderIconFourth"></div>
            </div>
        </div>
    )
}

export default LoadingLayer
