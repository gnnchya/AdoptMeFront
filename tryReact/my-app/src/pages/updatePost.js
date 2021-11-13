import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { uploadPic, createPostAdopt, createPostLost} from '../actions/posts'
import {generateUploadURL} from '../s3.js'
import axios from 'axios'

function UpdatePost() {
    const [postInfo, setPostInfo] = useState("") 
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 

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
        const name = event.target.name
        const value = event.target.value
        setFile((oldValue) => ({ ...oldValue, [name]: value }))
    }

    const postUploadHandler = async (event) =>{

        
        try {
            event.preventDefault()
            const url =  await generateUploadURL()
            var options = {
                headers: {
                'Content-Type': "multipart/form-data"
                }
            };

            // const picURL = await uploadPic(url, file.picFile, options) 
            axios.put(url, file, options).then((response) => {
                console.log("response")
                console.log(response)
            })
            const picURL = url.split('?')[0]
            
            const tempAnimal = {type: postInfo.type, age: +postInfo.age, species: postInfo.species, gender: postInfo.gender, generalInformation: postInfo.info,  spay: spay.spay, image: picURL, medical_condition: postInfo.medical_condition}
            const temp = {...postInfo, animal:tempAnimal, UID: "", location: postInfo.location}
            const response = ""
            if (postInfo.postType === 'adopt'){
                response =  await createPostAdopt(temp)
                console.log(response)
            }else{
                response =  await createPostLost(temp)
                console.log(response)
            }

            if (response.status === 201) {
                console.log("create", response)
                alert("created")
            }
        } catch (error) {
     
            alert( error)
        }

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
                    <div class="fas fa-user" id="login-btn" ></div>
            </div>            
            </header>
            
            
            <h1 class="heading"> our <span>lost and found</span> </h1>
            <section class="blogs" id="blogs">
            
                <h1 class="heading"> our <span>lost and found</span> </h1>
            
                <div class="box-container">
                <div class= "icons">
                                    
            
                </div>
                    <div class="box">
                        <div class="content">
                            <div class="icons">
                                <a > <i class="fas fa-user"></i> by user </a>
                                <a > <i class="fas fa-calendar"></i> 1st January, 2000 </a>
                            </div>
                            <h3>Funny dog</h3>
                            <p>Dog around the beach.</p>
                            <div class="box">
                            <div class="box">
                            <h3>info</h3>
                            <a  class="links"> <i class="fas fa-paw"></i>  <input type="text" placeholder="pet type eg. cat, dog" class="box" name = "type" onChange={handlePostInput}/> </a>
                            <a  class="links"> <i class="fas fa-birthday-cake"></i> <input type="text" placeholder="Age of pet" class="box"/> </a>
                            <a  class="links"> <i class="fas fa-male"></i> <i class="fas fa-female"></i> <input type="text" placeholder="gender of pet" class="box"/> </a>
                            <a  class="links"> <i class="fab fa-font-awesome"></i> <input type="text" placeholder="spay of pet" class="box"/></a>
                            <a  class="links"> <i class="fas fa-map-marker-alt"></i> <input type="text" placeholder="location of pet" class="box"/> </a>
                            <a  class="links"> <i class="fas fa-check"></i>  available  </a>
                            </div>
                            
                            <h3>contact info</h3>
                            <a class="links"> <i class="fas fa-phone"></i> --------- </a>
                            <a class="links"> <i class="fas fa-phone"></i> ----------- </a>
                            <a class="links"> <i class="fas fa-envelope"></i> --------- </a>
                            <a class="links"> <i class="fas fa-map-marker-alt"></i> ---------- </a>
                            </div>
            
                        
                        </div>
                    </div>
            
                    
            
            
                </div>
            
            </section>
   
            <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
            
            <script src="script.js"></script>
            
            </body>
        </div>

    )
}

export default UpdatePost

