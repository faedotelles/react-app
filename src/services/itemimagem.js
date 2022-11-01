import axios from "axios";

const serverProd = '132.226.242.176:3001'
const serverDev = '192.168.89.99:3001'



// mudar este para serverProd
const serverAtual = (serverDev)

export default async function getImagem (iditem){
    try {
        const response = await axios.get(`http://${serverAtual}/itemimagem/1000/${iditem}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}