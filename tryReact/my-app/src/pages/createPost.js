import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { uploadPic, createPostAdopt, createPostLost} from '../actions/posts'
import {generateUploadURL} from '../s3.js'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify'


function CreatePost(props) {
    const [postInfo, setPostInfo] = useState({}) 
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 
    const history = useHistory();

    useEffect(() => {
        setDefault()
    }, [])

    const handleLogout = (e) => {
        try{
            Auth.signOut();
            props.auth.handleAuthen(false);
            props.auth.handleUser(null);
        }catch(error){
            console.log(error.message);
        } 
    }

    const setDefault = async(e) => {
        setSpay((oldValue) => ({ ...oldValue, ["spay"]: false}))
        setPostInfo((oldValue) => ({ ...oldValue, ["postType"]: 'adopt'}))
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
                    {/* <a href = "#"> <div class="fas fa-pen" id="create-btn"> </div></a> */}

                    {/* hide login button when logged in */}
                    {!props.auth.authen && (
                        <div>
                            {<Link to={{pathname:"/login"}}> 
                                <div class="fas fa-user" id="login-btn" ></div>
                            </Link>}
                        </div>
                    )}

                    {/* show hello username */}
                    {props.auth.authen &&props.auth.user && (
                        <p>
                            Hello {props.auth.user.username}
                        </p>
                        )}

                    {/* logout button*/}
                    {props.auth.authen &&props.auth.user && (
                        <div>
                            {/* fark find log out icon aow ma tan login icon */}
                            {<Link to={{pathname:"/home"}}> 
                                <div class="fas fa-user" id="login-btn" onClick={handleLogout} ></div> 
                            </Link>}
                        </div>
                        )}
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
                                <input type="text" placeholder="location" class="box" name="lost_location" onChange={handlePostInput} />

                                <p>Type of Post</p>
                                <select name="postType" id="postType" onChange={handlePostInput} defaultValue="adopt">
                                    <option value="adopt">Adopt</option>
                                    <option value="lost">Lost</option>
                                </select>

                                <p>Post caption</p>
                                <input type="text" placeholder="post info" class="box-info" name="general_information" onChange={handlePostInput} />
                                                        
                            </div>
                            {/* {<Link to={{pathname:"/posts/lost/all"}}>  */}
                            <input type="submit"  class="btn" onClick={postUploadHandler}/>
                            {/* </Link>} */}
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

