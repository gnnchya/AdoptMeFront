import axios from 'axios'
import {data} from '../pages/readAllPostAdopt'

export const createPost = (data) => axios.post("http://127.0.0.1:8080/createPost", data)
export const readAllPost = (type, keyword,limit,page) => axios.get(`http://127.0.0.1:8080/posts?type=${type}keyword=${keyword}limit=${limit}&page=${page}`)
export const readPost = (id) => axios.get(`http://127.0.0.1:8080/post/${id}`)
export const updatePost = (data) => axios.put("http://127.0.0.1:8080/updatePost", data)
export const deletePost = (id) => axios.delete(`http://127.0.0.1:8082/post/${id}`)
export const uploadPic = (url, file, option) => axios.put(url, file, option)