import axios from "axios";

// const serverProd = '132.226.242.176:3001'
const serverDev = '192.168.89.99:3000'

export default async function getImagem (iditem){
    try {
        const response = await axios.get(`http://${serverDev}/itemimagemb/${iditem}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}