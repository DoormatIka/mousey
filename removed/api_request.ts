import axios from "axios"
import { osuapi } from "../src/config.json"

export async function request(url: string, query: object = {}) {
    const token = await get_token();

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token.token_type} ${token.access_token}`
    }

    const osu_data = await axios.get(`${osuapi.API_URL}${url}`, {headers: headers, params: query})
    return osu_data.data
}



async function get_token() {
    let data = {
        "client_id": osuapi.client_id,
        "client_secret": osuapi.client_secret,
        "grant_type": osuapi.grant_type,
        "scope": osuapi.scope
    }

    let response = await axios.post(osuapi.TOKEN_URL, data)
    return response.data
}