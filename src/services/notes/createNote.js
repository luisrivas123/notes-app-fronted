import axios from 'axios'

export const createNote = ({ title, body, userId, important }) => {
  return axios
    .post('http://localhost:3001/api/notes',
      // .post('https://aqueous-oasis-78089.herokuapp.com/api/notes',
      { title, body, userId, important })
    .then(response => {
      const { data } = response
      return data
    })
}
