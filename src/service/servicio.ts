import { convertXML } from 'simple-xml-to-json'
import urllib from 'urllib'

export async function MakeARequest() {

    let authorizationUser = 'admin'
    let authorizationPassword = 'molomix654'

    const data = await urllib.request('http://192.168.88.30/ISAPI/System/deviceinfo', {
        method: 'GET',
        contentType: 'application/json',
        headers: {

        },
        digestAuth: `${authorizationUser}:${authorizationPassword}`
    })

    console.log("🚀 ~ file: test.mjs:26 ~ data:", data.data.toString())
    const Json = convertXML(data.data.toString())
    console.log(Json.DeviceInfo.children)
    console.log("🚀 ~ file: test.mjs:26 ~ data:", data.status.toString())

    return Json.DeviceInfo.children;
}