import axios from 'axios'
const instance = axios.create({
	baseURL: 'https://gentle-badlands-44846.herokuapp.com/'
})
export default instance
