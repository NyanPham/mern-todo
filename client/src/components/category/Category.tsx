interface CategoryProps {
    title: string
    id: string
    isSelected: boolean
    onClick: (categoryId: string) => void
    isHighlighted?: boolean

    onDragStart: (e: React.DragEvent<HTMLInputElement>) => void
    onDragMove: (e: React.DragEvent<HTMLInputElement>) => void
    onDragEnd: (e: React.DragEvent<HTMLInputElement>) => void
    onDragDrop: (e: React.DragEvent<HTMLInputElement>) => void
}

const Category: React.FC<CategoryProps> = ({
    title,
    id,
    isSelected,
    onClick,
    isHighlighted,
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragDrop,
}) => {
    return (
        <div
            className={`selec-none px-4 py-2 cursor-pointer hover:opacity-70 transition duration-250 w-full truncate text-gray-900 ${
                isSelected ? 'bg-white font-semibold text-gray-900' : 'hover:bg-gray-300'
            } ${isHighlighted && isSelected ? 'bg-yellow-500 duration-200 text-white' : 'duration-500'}`}
            onClick={() => onClick(id)}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragMove}
            onDrop={onDragDrop}
            data-drag-item={id}
        >
            {title}
        </div>
    )
}

export default Category
