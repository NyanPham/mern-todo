import { useState } from 'react'
import FileInput, { FileInputProps } from './FileInput'
import { IFile } from '../../types'
import Avatar from '../Avatar'

type ImageInputProps = FileInputProps & { onImageChosen: (file: File) => void }

const ImageInput: React.FC<ImageInputProps> = ({ onImageChosen, ...props }) => {
    const [currentImage, setCurrentImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const [message, setMessage] = useState<string>('')

    const [imageInfos, setImageInfos] = useState<Array<IFile>>([])

    const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files as FileList
        setCurrentImage(selectedFiles?.[0])
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]))
        setProgress(0)

        if (selectedFiles[0]) {
            onImageChosen(selectedFiles[0])
        }
    }

    return (
        <div className="flex flex-row items-center">
            {previewImage && (
                <div className="">
                    <Avatar imageSrc={previewImage} medium isPreview />
                </div>
            )}
            <FileInput {...props} onChange={selectImage} />
        </div>
    )
}

export default ImageInput
