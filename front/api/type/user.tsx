export type UserResponse = {
    id: number,
    name: string;
    email: string;
    introduction: string;
    icon: string;
}

export type UserUpdateReqest = {
    icon: string,
    userName: string,
    introduction: string,
}

export type UserLoginReqest = {
    password: string,
    email: string,
}

export type PasswordResetReqest = {
    email: string,
}

export type SignupReqest = {
    userName: string,
    password: string,
    email: string,
}

export type PasswordUpdateReqest = {
    password: string,
}