import { TrashIcon } from '@heroicons/react/24/outline'

interface DeleteButtonProps {
    onDelete: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
    return (
        <button
            className="w-6 h-6 transition duration-200 rounded-md flex items-center justify-center hover:-translate-y-1 hover:shadow-md hover:bg-rose-300 hover:text-rose-700 "
            type="button"
            onClick={onDelete}
        >
            <TrashIcon className="w-4 h-4" />
        </button>
    )
}

export default DeleteButton
