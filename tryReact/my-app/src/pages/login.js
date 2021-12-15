import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { uploadPic, createPostAdopt, createPostLost} from '../actions/posts'
import {generateUploadURL} from '../s3.js'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify'
import { PresignedPost } from 'aws-sdk/clients/s3';



function Login(props) {
    const ip = String(process.env.IP)
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
               
        try 
        {
            // console.log("before", props.auth.authen)
            // console.log("before", props.auth.user)

            event.preventDefault()
            const user = await Auth.signIn(postInfo.username, postInfo.password);
            
            console.log("from login", user)

            props.auth.handleAuthen(true)
            props.auth.handleUser(user)
        

            history.push({pathname: "/home"})            
        } catch (error) {
    
            alert( error)
            let err = null;
            !error.message ? err = {"message": error}: err = error;
            // setPostInfo({
            //         ...postInfo.state.errors,
            //         cognito: err
            //     }
            // });
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
                {/* {<Link to={{pathname:"/createPost"}}> 
                    <div class="fas fa-pen" id="create-btn" ></div>
                </Link>}
                    <div href="#" class="fas fa-user" id="login-btn" ></div> */}

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
                        <input type="text" placeholder="your Username" name="username" onChange={handlePostInput}/>
                        </div>
            
                        <div class="inputBox">
                            <input type="text" placeholder="your Password" name="password" onChange={handlePostInput}/>
                        </div>
            
                        <input type="submit" value="login now" class="btn" onClick={postUploadHandler} />
                        
                    </form>                 
                </div>

                <div class="row">
                    
                    <form action="">
                        <h2 class="links" >Do not have an account? create one</h2>

                        {<Link to={{pathname:"/register"}}> 
                            <a href="register.html" class="btn">Sign UP</a>            
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

