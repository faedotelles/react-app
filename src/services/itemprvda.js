import axios from "axios";

const serverProd = '132.226.242.176:3001'
const serverDev = '192.168.89.99:3001'



// mudar para serverProd
const serverAtual = (serverDev)

export default async function getPrice (iditem){
    try {
        const response = await axios.get(`http://${serverAtual}/itemprvda/1000/${iditem}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
}

