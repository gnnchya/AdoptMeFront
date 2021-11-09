import axios from 'axios'
import {data} from '../pages/readAllPostAdopt'

export const createPost = (data) => axios.post("http://127.0.0.1:8080/AdoptMe/LostPetPost", data)
export const readAllPostAdopt = (type,limit,page) => axios.get(`http://127.0.0.1:8080/AdoptMe/AdoptionPost?keyword=${type}&limit=${limit}&page=${page}`)
export const readAllPostLost = (type,limit,page) => axios.get(`http://127.0.0.1:8080/AdoptMe/LostPetPost?keyword=${type}&limit=${limit}&page=${page}`)
// export const searchPostAdopt = (keyword,limit,page) => axios.get(`http://127.0.0.1:8080/posts/adopt?keyword=${keyword}limit=${limit}&page=${page}`)
// export const searchPostLost = (keyword,limit,page) => axios.get(`http://127.0.0.1:8080/posts/lost?keyword=${keyword}limit=${limit}&page=${page}`)
export const readPostAdopt = (id) => axios.get(`http://127.0.0.1:8080/AdoptMe/AdoptionPost/${id}`)
export const readPostLost = (id) => axios.get(`http://127.0.0.1:8080/AdoptMe/LostPetPost/${id}`)
export const updatePost = (data) => axios.put("http://127.0.0.1:8080/AdoptMe/updatePost", data)
export const deletePost = (id) => axios.delete(`http://127.0.0.1:8080/AdoptMe/post/${id}`)
export const uploadPic = (url, file, option) => axios.put(url, file, option)