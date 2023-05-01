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
    currentUser: IUser
}