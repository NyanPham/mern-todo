import { PencilIcon } from '@heroicons/react/24/outline'

interface EditButtonProps {
    onOpenEditModal: () => void
}

const EditButton: React.FC<EditButtonProps> = ({ onOpenEditModal }) => {
    return (
        <button
            className="w-6 h-6 transition duration-200 rounded-md flex items-center justify-center hover:-translate-y-1 hover:shadow-md hover:bg-cyan-300 hover:text-cyan-700"
            type="button"
            onClick={onOpenEditModal}
        >
            <PencilIcon className="w-4 h-4" />
        </button>
    )
}

export default EditButton
