import axios from "axios";


export default async function getPrice (iditem){
    try {
        const response = await axios.get(`http://192.168.89.99:3000/itemprvda/1000/${iditem}`);
        return response.data
    } catch (error) {
        console.error(error)
    }
}

