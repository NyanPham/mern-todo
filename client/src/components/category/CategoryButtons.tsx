import DeleteButton from '../buttons/DeleteButton'
import EditButton from '../buttons/EditButton'

interface CategoryButtonsProps {
    onOpenEdit: () => void
    onDelete: () => void
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ onOpenEdit, onDelete }) => {
    return (
        <div className="flex gap-2 text-white">
            <EditButton onOpenEditModal={onOpenEdit} />
            <DeleteButton onDelete={onDelete} />
        </div>
    )
}

export default CategoryButtons
