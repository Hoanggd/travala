import instance from 'axios'

const axios = instance.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default axios
