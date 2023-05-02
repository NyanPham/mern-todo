interface HeadingProps {
    title: string,
    subtitle?: string | null,
    center?: boolean
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center}) => {
  return (  
    <div className={`${center && 'text-center'}`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        {subtitle && (
            <h4 className="text-lg">{subtitle}</h4>
        )}
    </div>
  )
}

export default Heading