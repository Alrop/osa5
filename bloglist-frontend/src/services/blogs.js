import axios from 'axios'
const baseUrl = '/api/blogs';

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const req = axios.get(baseUrl)
  const res = await req;
  return res.data;
}

async function createBlog(newObject) {
  const config = {
    headers: { authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data;
}

async function updateBlog(id, newObject) {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  const res = await req;
  return res.data;
}

async function deleteBlog(id) {
  const config = {
    headers: { Authorization: token }
  }
  const req = axios.delete(`${baseUrl}/${id}`, config)
  const res = await req;
  return console.log(res);
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }