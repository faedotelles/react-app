import axios from "axios";

const serverProd = '132.226.242.176:3001'
const serverDev = '192.168.89.99:3001'



// mudar para serverProd
const serverAtual = (serverDev)

export default async function getPrice (iditem){
    try {
        const [getPrice, getImagem] = await Promise.all([
            axios.get(`http://${serverAtual}/itemprvda/1000/${iditem}`),
            axios.get(`http://${serverAtual}/itemimagem/1000/${iditem}`)
        ])
        return(
            [getPrice.data[0], getImagem.data]
        )
    } catch (err) {
    }
}

