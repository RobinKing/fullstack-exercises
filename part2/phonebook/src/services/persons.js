import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    // console.log(`${id} removed!`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.status)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const personService = {
    getAll,
    create,
    remove,
    update
}

export default personService