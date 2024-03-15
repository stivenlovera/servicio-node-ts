import AxiosDigestAuth from '@mhoc/axios-digest-auth'
import axios from 'axios'
//import DigestClient from 'digest-fetch'
import urllib, { Dispatcher } from 'urllib'
import Form_data from 'form-data'

import { strict as assert } from 'assert';
import { MockAgent, setGlobalDispatcher, request } from 'urllib';
import DigestClient from 'digest-fetch';

import http from 'node:http';
import https from 'node:https';
import * as fs from 'fs';
import path from 'path';
import { readFile } from "node:fs/promises";


interface CreateRequesProps {
    host: string
    url: string
    usuario: string
    password: string
    method: Dispatcher.HttpMethod | "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch" | undefined,
    data?: any
    files?: any
    contentType?: 'application/json' | 'multipart/form-data'
}

export async function CreateRequest({ host, password, url, usuario, method, data, files, contentType }: CreateRequesProps) {
    console.log(`api request => http://${host}/${url}`, `${usuario}:${password}`);
    console.log(`body`, data)
    try {
        const response = await urllib.request(`http://${host}/${url}`, {
            method: method,
            contentType: contentType,
            dataType: 'json',
            headers: {
            },
            digestAuth: `${usuario}:${password}`,
            data: data,
            files: files
        });
        //console.log('api', response.status)
        return {
            status: response.status,
            message: response.statusText,
            data: response.data
        }
    } catch (error) {
        //console.log('api error', error)
        return {
            status: 301,
            message: 'se encontro un error',
            data: null
        }
    }
}

interface CreateRequestFormDataProps {
    host: string
    url: string
    usuario: string
    password: string
    method: Dispatcher.HttpMethod | "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch" | undefined,
    data?: any
    files?: any
    contentType?: 'application/json' | 'multipart/form-data'
}

export async function CreateRequestFormData({ host, password, url, usuario, method, data, files, contentType }: CreateRequestFormDataProps) {
    console.log(`api request => http://${host}/${url}`, `${usuario}:${password}`);
    const httpAgent = new http.Agent({
        keepAlive: true,
        maxSockets: 10,
        timeout: 10000,
        autoSelectFamilyAttemptTimeout: 10000,
        keepAliveInitialDelay: 10000,
        maxFreeSockets: 100,
        maxTotalSockets: 100,

    });
    const httpsAgent = new https.Agent({
        keepAlive: true,
        maxSockets: 10,

        /* maxKeepAliveRequests: 0,
        maxKeepAliveTime: 240000 */
    });

    const agentSelector = function (_parsedURL: any) {
        /* if (_parsedURL.protocol == 'http:') {
            return httpAgent;
        } else {
            return httpsAgent;
        } */
        return httpAgent;
    }
    try {

        const formData = new Form_data()
        const absolutePath = path.join(__dirname, '../' + '../' + 'nueva_imagen.jpeg');
        const absoluteText = path.join(__dirname, '../' + '../' + 'text.txt');
        console.log('ruta imagen', absolutePath)
        const blob = new Blob([await readFile(absolutePath)], { type: "image/jpeg" });

        const blobText = new Blob([await readFile(absoluteText)], { type: "text/plain" });

        let imagen = fs.readFileSync(absolutePath);


        formData.append('FaceDataRecord', JSON.stringify({ faceLibType: "blackFD", FDID: "1", FPID: "15" }));
        formData.append('Img', imagen, {
            contentType: 'text/plain',
            filepath: absolutePath,
            filename: 'nueva_imagen.jpeg',
        });


        console.log('data', formData)
        console.log('header', formData.getBoundary())
        /*  const ContentLength = formData.getLengthSync();
         console.log('ContentLength', ContentLength) */
        const client = new DigestClient(usuario, password, { algorithm: 'MD5' });
        const response = await client.fetch(
            `http://localhost:3300/anime/portada`, //http://localhost:3300/anime/portada
            {
                method: 'PUT',
                contentType: 'multipart/form-data',
                redirect: "follow",
                body: formData,
                follow: 20,             // maximum redirect count. 0 to not follow redirect
                compress: true,         // support gzip/deflate content encoding. false to disable
                /* headers: {
                    //'Transfer-Encoding': 'gzip',
                    'Content-type': `multipart/form-data; boundary=${formData.getHeaders()}`,
                    'Accept-Encoding': 'gzip, deflate, br',
                    //'Content-Length': ContentLength
                }, */
                headers: {
                    /* acceptEncoding: "gzip, deflate, br",
                    connections: "keep-alive",
                    contentLength: 17818 */
                },
                agent: agentSelector
            }
        );

        console.log(
            "STATUS:",
            response.status,
            "\nCONTENT TYPE:",
            response.headers.get("content-type"),
        );
        console.log("RAW BODY:", await response.text());
        return {
            status: response.status,
            message: response.statusText,
            data: 'response.data'
        }
    } catch (error) {
        console.log('api error', error)
        return {
            status: 301,
            message: 'se encontro un error',
            data: null
        }
    }
}

