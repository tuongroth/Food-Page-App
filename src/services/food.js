import axios from 'axios'

const baseUrl = '/api/foods'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newFood => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newFood, config)
  return response.data
}

const update = async (id, updatedFood) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedFood)
  return response.data
}

export default { getAll, create, update, setToken }
