export type ResponsePayload = {
    status: string
    data: object | string | number | any
}

export interface RegisterData {
    name: string
    email: string
    password: string
    passwordConfirm: string
}

export interface LoginData {
    email: string
    password: string
}

export interface FormError {
    name: string
    value: any
}

export interface ResponseData {
    status: string
    data: any
    message?: string | null | undefined
}

export interface InputValidateResult {
    message: string
    isError: boolean
}

export interface Task {
    _id: string
    categoryId: string
    title: string
    subtitle?: string
    isComplete: boolean
    createdAt: Date
    modifiedAt: Date
}

export interface Category {
    _id: string
    title: string
    description?: string
    createdAt: Date
    modifiedAt: Date
}

export interface CurrentUser {
    userId: string
    name: string
    email: string
    role: string
    imageSrc?: string
    tasks: Task[]
    categories: Category[]
    favorites: string[]
}

export interface InputProps {
    id: string
    type: string
    name: string
    value: any
    label?: string
    required?: boolean
    disabled?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onError?: () => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    validate?: (value: any) => InputValidateResult
    small?: boolean
    bgTransparent?: boolean
    underlineOnly?: boolean
    inputRef?: unknown
}

export interface InputPlusProps {
    onPlusIconClick: () => void
}

export interface CategoryData {
    title: string
    description?: string
    imageSrc?: string
    createdAt?: Date
    modififedAt?: Date
}

export interface TaskData {
    categoryId: string | null
    title: string
    subtitle?: string
    imageSrc?: string
    createdAt?: Date
    modififedAt?: Date
}

export interface TaskToToggle {
    isComplete: boolean
}

export interface ToggleTaskData {
    taskId: string
    isComplete: boolean
}
