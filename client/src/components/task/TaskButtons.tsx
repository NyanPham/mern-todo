import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'

interface TaskButtonsProps {
    isComplete: boolean
    onToggleComplete: () => void
    onTaskDelete: () => void
    onOpenEditModal: () => void
}

const TaskButtons: React.FC<TaskButtonsProps> = ({ isComplete, onToggleComplete, onTaskDelete, onOpenEditModal }) => {
    return (
        <div className="flex gap-2">
            <button
                className={`w-6 h-6 transition duration-200 rounded-md flex items-center justify-center hover:-translate-y-1 hover:shadow-md
                    ${
                        isComplete
                            ? 'hover:bg-yellow-200 hover:text-yellow-600 peer-hover:bg-yellow-200/60 peer-hover:text-yellow-600'
                            : 'hover:bg-green-300 hover:text-green-600'
                    }
                `}
                type="button"
                onClick={onToggleComplete}
            >
                {isComplete ? <XMarkIcon className="w-5 h-5" /> : <CheckIcon className="w-5 h-5" />}
            </button>
            <EditButton onOpenEditModal={onOpenEditModal} />
            <DeleteButton onDelete={onTaskDelete} />
            {/* <button type="button">
                <XMarkIcon className="w-5 h-5" />
            </button> */}
        </div>
    )
}

export default TaskButtons
