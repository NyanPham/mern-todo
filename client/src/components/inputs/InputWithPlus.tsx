import { PlusSmallIcon } from '@heroicons/react/24/outline'
import { InputPlusProps, InputProps } from '../../types'
import { Input } from './Input'

type InputWithPlusProps = InputProps & InputPlusProps

const InputWithPlus: React.FC<InputWithPlusProps> = (props) => {
    return (
        <div className="flex flex-row items-center">
            <PlusSmallIcon className="h-5 w-5" onClick={props.onPlusIconClick} />
            <Input {...props} />
        </div>
    )
}

export default InputWithPlus
