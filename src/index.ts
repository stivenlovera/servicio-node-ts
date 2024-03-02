import { io } from "socket.io-client";
import { MakeARequest } from "./service/servicio";


const info = MakeARequest();

const socket = io("http://localhost:3000");

socket.emit("store:data", async () => { await info });
console.log('inciando worker')





