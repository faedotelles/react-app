import axios from "axios";

export default async function getImagem (iditem){
    try {
        const response = await axios.get(`http://192.168.89.99:3000/itemimagem/${iditem}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}