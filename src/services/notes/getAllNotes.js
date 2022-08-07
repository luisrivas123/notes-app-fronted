import axios from "axios"

export const getAllNotes = () => {
    return axios
        .get('http://localhost:3001/api/notes')
        // .get('https://aqueous-oasis-78089.herokuapp.com/api/notes')
        .then(response => {
            // console.log(response);
            const { data } = response
            return data 
        })
}