import axios from 'axios'

export const create = ({ title, content, userId }) => {
  return axios
    .post('https://jsonplaceholder.typicode.com/posts',
      { title, content, userId })
    .then(response => {
      const { data } = response
      return data
    })
}

export const getAll = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      // console.log(response);
      const { data } = response
      return data
    })
}
