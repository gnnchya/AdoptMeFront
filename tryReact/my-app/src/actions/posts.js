import axios from 'axios'
import {data} from '../pages/readAllPost'

export const createPost = (data) => axios.post("http://127.0.0.1:8080/createPost", data)
export const readAllPost = (keyword,limit,page) => axios.get(`http://127.0.0.1:8080/posts?keyword=${keyword}limit=${limit}&page=${page}`)
export const readPost = (id) => axios.get(`http://127.0.0.1:8080/post/${id}`)
export const updatePost = (data) => axios.put("http://127.0.0.1:8080/updatePost", data)
export const deletePost = (id) => axios.delete(`http://127.0.0.1:8082/post/${id}`)
