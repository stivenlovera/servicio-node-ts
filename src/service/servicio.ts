import urllib, { Dispatcher } from 'urllib'
interface CreateRequesProps {
    host: string
    url: string
    usuario: string
    password: string
    method: Dispatcher.HttpMethod | "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch" | undefined,
    data?: any
}
export async function CreateRequest({ host, password, url, usuario, method, data }: CreateRequesProps) {
    console.log(`http://${host}/${url}`)
    try {
        const response = await urllib.request(`http://${host}/${url}`, {
            method: method,
            contentType: 'application/json',
            headers: {
            },
            digestAuth: `${usuario}:${password}`,
            data: data
        });
        return {
            status: response.statusCode,
            message: response.statusText,
            data: response.data
        }
    } catch (error) {
        return {
            status: 301,
            message: 'se encontro un error',
            data: null
        }
    }
}