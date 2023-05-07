interface HeadingProps {
    title: string
    subtitle?: string | null
    center?: boolean
    textDark?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center, textDark }) => {
    return (
        <div className={`${center && 'text-center'}`}>
            <h3 className={`text-2xl font-semibold ${textDark ? 'text-gray-900' : 'text-white'}`}>{title}</h3>
            {subtitle && <h4 className={`text-base ${textDark ? 'text-gray-700' : 'text-gray-200'}`}>{subtitle}</h4>}
        </div>
    )
}

export default Heading
