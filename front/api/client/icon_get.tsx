import { GenerateImageUrl } from "../../component/icon"
import { AxiosResponse } from 'axios';
import { privateClient } from './axios'

export const UserIconGet = async (icon: string) => {
    const url: string = 'v1/icon/' + icon
    try {
        const res: AxiosResponse<ArrayBuffer> = await privateClient
            .get(url, {
                responseType: 'arraybuffer',
            })
        const iconUrl = GenerateImageUrl(res.data)
        return iconUrl
    } catch (err) {
        console.log("err", err)
    }
}