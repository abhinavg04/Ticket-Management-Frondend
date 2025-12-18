import api from "./axios";

export const createTicket = async ( payload )=>{
    const response = await api.post("/tickets",payload)
    return response.data
}