import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { uploadPic, createPostAdopt, createPostLost} from '../actions/posts'
import {generateUploadURL} from '../s3.js'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


function Login() {
    const [postInfo, setPostInfo] = useState({}) 
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 
    const history = useHistory();

    useEffect(() => {
        setDefault()
    }, [])

    const setDefault = async(e) => {
        setSpay((oldValue) => ({ ...oldValue, ["spay"]: false}))
        setSpay((oldValue) => ({ ...oldValue, ["postType"]: 'adopt'}))
    }

    const handlePostInput = (e) =>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setPostInfo((oldValue) => ({ ...oldValue, [name]: value }))
    }
   
    const handleSpayInput = (e) =>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setSpay((oldValue) => ({ ...oldValue, [name]: value }))
    }

    const fileSelectedHandler = event => {
        event.preventDefault()
        const value = event.target.files[0]
        setFile(value)  
        // setFile(value[0])
    }

    const postUploadHandler = async (event) =>{
        // try {
            event.preventDefault()
            const url =  await generateUploadURL()
            var options = {
                headers: {
                'Content-Type': "multipart/form-data"
                }
            };
            console.log(url)
            // const picURL = await uploadPic(url, file.picFile, options) 
            axios.put(url, file, options).then((response) => {
                console.log("response")
                console.log(response)
            })
            const picURL = url.split('?')[0]
            console.log(picURL)
            const tempAnimal = {type: String(postInfo.type), age: +postInfo.age, species: String(postInfo.species)
                , gender: String(postInfo.gender), general_information: String(postInfo.general_information),  spay: Boolean(spay.spay)
                ,image: String(picURL), medical_condition: String(postInfo.medical_condition)}
            const temp = {animal:tempAnimal, UID: "", location: String( postInfo.lost_location)}
            console.log(String(postInfo.postType))
            if (String(postInfo.postType) === 'adopt'){
                await createPostAdopt(temp)
            }else{
                await createPostLost(temp)
            }
    
            // history.push({pathname: "/posts/lost/all"})
            
        // } catch (error) {
     
        //     alert( error)
        // }

    }


    return (
        <div>
           <body>
            
           <header class="header">
            
           {<Link to={{pathname:"/home"}}> 
            <a class="logo"> <i class="fas fa-paw"></i> Adopt </a>
            </Link>}
        
            <nav class="navbar">
                        {<Link to={{pathname:"/home"}}> 
                        <a>home</a>
                        </Link>}
                        {<Link to={{pathname:"/posts/adopt/all"}}> 
                        <a>Adoption</a>
                        </Link>}
                        {<Link to={{pathname:"/posts/lost/all"}}> 
                        <a>Lost</a>
                        </Link>}
            </nav>
        
            <div class="icons">
                <div class="fas fa-bars" id="menu-btn" ></div>
                {<Link to={{pathname:"/createPost"}}> 
                    <div class="fas fa-pen" id="create-btn" ></div>
                </Link>}
                    <div href="#" class="fas fa-user" id="login-btn" ></div>

            </div>            
        
        </header>
            
            
            <h1 class="heading"> <span>login</span> now </h1>
            <section class="login" id="login">
            
                <h1 class="heading"> <span>login</span> now </h1>
            
                <div class="row">
                    
                    <div class="image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAunfoVrQZQn0yUL5rY8PgTX9LVZPq1HMhSA&usqp=CAU" alt=""/>
                    </div>
            
                    <form action="">
            
                        <div class="inputBox">
                            <input type="email" placeholder="email"/>
                        </div>
            
                        <div class="inputBox">
                            <input type="text" placeholder="password"/>
                        </div>
            
                        <input type="submit" value="login now" class="btn"/>
                        

                        
                        <h2 class="links" >Do not have an account? create one</h2>

                        {<Link to={{pathname:"/register"}}> 
                            <input type="submit" value="Sign Up" class="btn"/>
                        </Link>}
            
                    </form>                 
                </div>
                
            
            </section>
        
          
            <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
            <script src="home.js"></script>
            
            </body>
        </div>

    )
}

export default Login

