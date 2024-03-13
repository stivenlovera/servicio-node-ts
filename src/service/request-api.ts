import AxiosDigestAuth from '@mhoc/axios-digest-auth'
import axios from 'axios'
//import DigestClient from 'digest-fetch'
import urllib, { Dispatcher } from 'urllib'

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
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const agentSelector = function (_parsedURL: any) {
        if (_parsedURL.protocol == 'http:') {
            return httpAgent;
        } else {
            return httpsAgent;
        }
    }
    try {
        console.log('cuerpo', data)
        const client = new DigestClient(usuario, password, { algorithm: 'MD5' });
        const response = await client.fetch(
            `http://${host}/${url}`,
            {
                method: method,
                contentType: contentType,
                body: JSON.stringify(data),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Connection": "Keep-Alive",
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept': '/*/',
                    //"X-Content-Type-Options": 'nosniff',
                    //'Content-Type': 'multipart/form-data',
                    //'Content-length': '5000',
                    //'Connection': 'max'
                },
                agent: agentSelector
                //headers: {},
            }
        );
        response
        //console.log('try', data, files)
        /* const authorization = `Digest "${usuario}:"${password}"`;
        const response = await axios.get(`http://${host}/${url}`, {
            method: method,
            timeout: 500000,
            //dataType: 'json',
            headers: {
                'WWW-Authenticate': 'Digest',
                Authorization: authorization
            },
            data: data,
    
        }); */


        /*  const digestAuth = new AxiosDigestAuth({
             username: usuario,
             password: password,
         });
    
         const response = await digestAuth.request({
             headers: {
                 'Content-Type': 'application/json',
                 'WWW-Authenticate': 'Digest',
                 Connection: 'keep-alive',
                 Accept: 'application/json',
             },
             method: 'POST',
             url: `http://${host}/${url}`,
             data: data,
         }); */
        //urllib.USER_AGENT = 'PostmanRuntime/7.36.3'

        /* const mockAgent = new MockAgent();
        setGlobalDispatcher(mockAgent);

        const mockPool = mockAgent.get('http://localhost:7001');

        mockPool.intercept({
            path: '/foo',
            method: 'POST',
            headers: {

            }
        }).reply(400, {
            message: 'mock 400 bad request',
        });

        const response = await request(`http://${host}:80/${url}`, {
            method: method,
            contentType: contentType,
            timeout: [10000, 15000],
            dataType: 'json',
            headers: {
                //'Content-Type': 'multipart/form-data;',
                //'Content-Length': '3555444566',
                //'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate',
                'Accept': '*',
                //'Cache-Control':'no-cache',
                'Connection': 'keep-alive',
                //'Keep-Alive:': 'timeout=5',
                'X-Frame-Options': 'SAMEORIGIN',
                'X-Content-Type-Options': 'nosniff',
                'Content-Type': 'multipart/form-data',
                'Host': '192.168.1.246',
                'Content-length': '5000',
                //'Transfer-Encoding': 'chunked'
            },

            digestAuth: `${usuario}:${password}`,
            //timing:true,
            data: data,
            files: files
        });

        console.log(response)
        assert.equal(response.status, 400); */

        /* const response = await urllib.request(`http://${host}:80/${url}`, {
            method: method,
            contentType: contentType,
            timeout: [10000, 15000],
            dataType: 'json',
            headers: {
                //'Content-Type': 'multipart/form-data;',
                //'Content-Length': '3555444566',
                //'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate',
                'Accept': '*',
                //'Cache-Control':'no-cache',
                'Connection': 'keep-alive',
                //'Keep-Alive:': 'timeout=5',
                'X-Frame-Options': 'SAMEORIGIN',
                'X-Content-Type-Options': 'nosniff',
                'Content-Type': 'multipart/form-data',
                'Host': '192.168.1.246',
                'Content-length': '5000',
                //'Transfer-Encoding': 'chunked'
            },

            digestAuth: `${usuario}:${password}`,
            //timing:true,
            data: data,
            files: files
        }); */

        console.log('api respuesta', response)
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
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });



    const agentSelector = function (_parsedURL: any) {
        if (_parsedURL.protocol == 'http:') {
            return httpAgent;
        } else {
            return httpsAgent;
        }
    }
    try {

        const formData = new FormData()
        const absolutePath = path.join(__dirname, '../' + '../' + 'nueva_imagen.jpeg');
        const absoluteText = path.join(__dirname, '../' + '../' + 'text.txt');
        console.log('ruta imagen', absolutePath)
        const blob = new Blob([await readFile(absolutePath)], { type: "image/jpeg" });

        const blobText = new Blob([await readFile(absoluteText)], { type: "text/plain" });


        /* formData.set('FaceDataRecord', new Blob([JSON.stringify({
            FaceDataRecord: { faceLibType: "blackFD", FDID: "1", FPID: "15" } 
        })])); */
        
        formData.append("FaceDataRecord", '{ faceLibType: "blackFD", FDID: "1", FPID: "15" }')
        formData.append('img', (blob), 'nueva_imagen.jpeg');
        /* formData.set('FaceDataRecord',new Blob([JSON.stringify({"faceLibType":"blackFD","FDID":"1","FPID":"15"})], {
            type: "application/json"
        })) */

 
        console.log('cuerpo formData', formData)

        console.log('img', formData.getAll('img'))
        console.log('FaceDataRecord', formData.getAll('FaceDataRecord'))
        /*   for (const value of formData.values()) {
              console.log(value);
          } */
        const client = new DigestClient(usuario, password, { algorithm: 'MD5' });
        const response = await client.fetch(
            `http://${host}/${url}`,
            {
                method: method,
                contentType: contentType,
                redirect: "follow",
                body: formData,
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    "Content-Type": "application/json",
                    "Connection": " keep-alive",
                    'Accept': '*/*',
                    "Cache-Control": "no-cache",
                    "X-Requested-With": "XMLHttpRequest",
                    "Access-Control-Allow-Origin": "*",
                },
                //agent: agentSelector
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

