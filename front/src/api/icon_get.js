import { GenerateImageUrl } from "../component/icon"
import { client } from '../libs/axios'

export const UserIconGet = async (icon) => {
    const token = localStorage.getItem('token')
    const url = 'v1/icon/' + icon
    try {
        const res = await client
            .get(url, {
                headers: { Authorization: token },
                responseType: 'arraybuffer',
            })
        const iconUrl = GenerateImageUrl(res.data)
        return iconUrl
    } catch (err) {
        console.log("err", err.response)
    }
}