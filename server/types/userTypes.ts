import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
    _id?: string,
    name: string,
    email: string,
    password?: string,
    favorites?: string[],
    role: string | "user",
    imageSrc?: string,
    location?: string,
    active: boolean,
    tasks?: any[] | null
    comparePassword?: (candidatePassword: string, password: string) => Promise<boolean>,
    createResetPasswordToken?: () => string,
    passwordResetToken?: string,
    passwordResetExpires?: Date,
}

export interface IUserForClient {
    userId: string,
    name: string,
    email: string,
    role: string,
    imageSrc?: string,
    favorites?: string[]
    location?: string,
    tasks?: any[]
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
    
export interface ICategoryToUpdate {
    title?: string,
    subtitle?: string,
    imageSrc?: boolean,
    userId?: string | number | null
}