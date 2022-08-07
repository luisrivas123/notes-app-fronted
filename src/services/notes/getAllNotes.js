import axios from "axios"

export const getAllNotes = () => {
    return axios
        .get('http://localhost:3001/api/notes')
        .then(response => {
            // console.log(response);
            const { data } = response
            return data 
        })
}