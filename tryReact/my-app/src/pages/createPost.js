import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { uploadPic, createPostAdopt, createPostLost} from '../actions/posts'
import {generateUploadURL} from '../s3.js'
import axios from 'axios'

function CreatePost() {
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
        
        const tempAnimal = {type: postInfo.type, age: +postInfo.age, species: postInfo.species, gender: postInfo.gender
                        , generalInformation: postInfo.info,  spay: spay.spay, image: picURL
                        , medical_condition: postInfo.medical_condition}
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
        
        
        // try {
        //     event.preventDefault()
        //     const url =  await generateUploadURL()
        //     var options = {
        //         headers: {
        //         'Content-Type': "multipart/form-data"
        //         }
        //     };

        //     // const picURL = await uploadPic(url, file.picFile, options) 
        //     axios.put(url, file, options).then((response) => {
        //         console.log("response")
        //         console.log(response)
        //     })
        //     const picURL = url.split('?')[0]
            
        //     const tempAnimal = {type: postInfo.type, age: +postInfo.age, species: postInfo.species, gender: postInfo.gender, generalInformation: postInfo.info,  spay: spay.spay, image: picURL, medical_condition: postInfo.medical_condition}
        //     const temp = {...postInfo, animal:tempAnimal, UID: "", location: postInfo.location}
        //     const response = ""
        //     if (postInfo.postType === 'adopt'){
        //         response =  await createPostAdopt(temp)
        //         console.log(response)
        //     }else{
        //         response =  await createPostLost(temp)
        //         console.log(response)
        //     }

        //     if (response.status === 201) {
        //         console.log("create", response)
        //         alert("created")
        //     }
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
                    <a href = "#"> <div class="fas fa-pen" id="create-btn"> </div></a>
                    {<Link to={{pathname:"/login"}}> 
                        <div class="fas fa-user" id="login-btn" ></div>
                    </Link>}
                </div>  
            
            </header>
            
            <h1 class="heading"> our <span>lost and found</span> </h1>
            <section class="blogs" id="blogs">
            
                <h1 class="heading"> Create <span>your post</span> </h1>                               
                    <div class = "create-form">
                        <h3>Lost</h3>
                        <div class = "box">
                            <div class="content">
                                <h3>Create lost pet post</h3>
                                <p>Type</p>
                                <input type="text" placeholder="pet type eg. cat, dog" class="box" name = "type" onChange={handlePostInput}/>
                                <p>Species</p>
                                <input type="text" placeholder="pet species" class="box"  name="species" onChange={handlePostInput} />
                                <p>Age</p>
                                <input type="text" placeholder="Age of pet" class="box" name="age"  onChange={handlePostInput} />
                                <p>Gender</p>
                                <input type="text" placeholder="gender of pet" class="box" name="gender" onChange={handlePostInput} />
                               
                                <p>Medical Condition</p>
                                <input type="text" placeholder="medical condition" class="box" name="medical_condition" onChange={handlePostInput} />
                                <p>Spay</p>
                                <div class="spay">
                                    <input type="checkbox" name="spay" id="spay" onChange={handleSpayInput}/>
                                    <label for="spay">Still spay</label>
                                </div>
                                <p>Photo</p>
                                <div class="photo">
                                    <input type="file" accept="image/png, image/jpeg" class="pics" onChange={fileSelectedHandler}/>
                                </div>

                                <p>Location</p>
                                <input type="text" placeholder="location" class="box" name="location" onChange={handlePostInput} />

                                <p>Type of Post</p>
                                <select name="postType" id="postType" onChange={handlePostInput}>
                                    <option value="adopt">Adopt</option>
                                    <option value="lost">Lost</option>
                                </select>

                                <p>Post caption</p>
                                <input type="text" placeholder="post info" class="box-info" name="info" onChange={handlePostInput} />
                                                        
                            </div>
                            {<Link to={{pathname:"/posts/lost/all"}}> 
                            <input type="submit"  class="btn" onClick={postUploadHandler}/>
                            </Link>}
                        </div>
        
                    </div>
                            
            </section>
            
            <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

            <script src="script.js"></script>
            
            </body>
        </div>

    )
}

export default CreatePost

