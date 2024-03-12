import urllib, { Dispatcher } from 'urllib'
interface CreateRequestWebProps {
    url: string
    method: Dispatcher.HttpMethod | "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch" | undefined,
    data?: any
    contentType: 'application/json' | 'multipart/form-data'
}
export async function CreateRequestWeb({ url, method, data, contentType }: CreateRequestWebProps) {
    //console.log(`web request => ${process.env.URL_WEB}/${url}`)
    try {
        const response = await urllib.request(`${process.env.URL_WEB}/${url}/`, {
            method: method,
            contentType: contentType,
            dataType: 'buffer',
            headers: {
            },
            data: data,
        });
        //console.log(`web response => ${response.statusCode, response.data}`)
        return {
            status: response.statusCode,
            message: response.statusText,
            data: response.data
        }

    } catch (error) {
        //console.log(`web response => ${error}`)
        return {
            status: '500',
            message: 'error',
            data: 'error'
        }
    }
}
