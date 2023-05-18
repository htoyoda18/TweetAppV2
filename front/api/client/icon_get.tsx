import { GenerateImageUrl } from "../../component/icon"
import { client } from '../../libs/axios'
import { GetToken } from '../../shared/localStorage'

export const UserIconGet = async (icon: string) => {
    const token = GetToken()
    const url: string = 'v1/icon/' + icon
    try {
        const res = await client
            .get(url, {
                headers: { Authorization: token },
                responseType: 'arraybuffer',
            })
        const iconUrl = GenerateImageUrl(res.data)
        return iconUrl
    } catch (err) {
        console.log("err", err)
    }
}