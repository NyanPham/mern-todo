export type ResponsePayload = {
    status: string,
    data: object | string | number | any
}

export interface RegisterData {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
}   

export interface LoginData {
    email: string,
    password: string,
}

export interface FormError {
    name: string,
    value: any
}

export interface ResponseData {
    status: string,
    data: any
}

export interface InputValidateResult {
    message: string,
    isError: boolean
}

export interface Task {
    title: string,
    subtitle?: string,
    isComplete: boolean,
    createdAt: Date,
    modifiedAt: Date
}

export interface CurrentUser {
    userId: string,
    name: string, 
    email: string,
    role: string,
    imageSrc?: string,
    tasks: Task[],  
    favorites: string[], 
} 