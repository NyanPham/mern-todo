export interface IUser {
    _id?: string,
    name: string,
    email: string,
    password?: string,
    favorites?: string[],
    location?: string,
    role?: string | "user"
    active: boolean,
    comparePassword?: (candidatePassword: string, password: string) => Promise<boolean>,
    createResetPasswordToken?: () => string,
}
    
export interface IGetUserAuthInfoRequest extends Request {
    currentUser?: IUser | null | undefined,
    params?: IRequestParams
}

export interface IUpdateItemRequestBody {
    userId?: string | number | null
}

export interface IRequestParams {
    id?: string | number | null
}

export interface ITaskToUpdate {
    title?: string,
    subtitle?: string,
    isComplete?: boolean,
    imageSrc?: boolean,
    userId?: string | number | null
}