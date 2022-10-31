import axios from "axios";

export default async function getImagem (iditem){
    try {
        const response = await axios.get(`http://132.226.242.176:3001/itemimagem/${iditem}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}