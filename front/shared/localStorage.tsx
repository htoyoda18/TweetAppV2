export const GetToken = () => {
    if (typeof window !== 'undefined') {
        const token: string = localStorage.getItem('token')
        return token
    }

    return null
}

export const GetUserID = () => {
    if (typeof window !== 'undefined') {
        const userID: number =parseInt(localStorage.getItem('userID'), 10);
        return userID
    }

    return null
}