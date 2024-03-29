export const GetToken = () => {
    if (typeof window !== 'undefined') {
        const token: string = localStorage.getItem('token')
        return token
    }
}

export const GetSelfUserID = () => {
    if (typeof window !== 'undefined') {
        const userID: number = parseInt(localStorage.getItem('userID'), 10);
        return userID
    }

    return null
}