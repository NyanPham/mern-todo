interface CategoryProps {
    title: string
    id: string
    onClick: (categoryId: string) => void
}

const Category: React.FC<CategoryProps> = ({ title, id, onClick }) => {
    return (
        <div
            className="cursor-pointer hover:opacity-70 transition duration-250 py-2 w-full truncate"
            onClick={() => onClick(id)}
        >
            {title}
        </div>
    )
}

export default Category
