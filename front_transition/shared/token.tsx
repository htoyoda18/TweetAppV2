export const GetToken = () => {
    if (typeof window !== 'undefined') {
        const token: string = localStorage.getItem('token')
        return token
    }

    return null
}