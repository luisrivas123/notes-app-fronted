import axios from "axios"
const baseUrl = 'http://localhost:3001/api/notes'

export const update = (id, newObject) => {
  
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}