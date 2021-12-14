import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {uploadPic, createPost, readAllPostLost } from "../actions/posts.js";
import {generateUploadURL} from '../s3.js'
import axios from 'axios'
import Amplify, { Auth } from 'aws-amplify'

function Adopted(props){
    let {id} = useParams("id");

    useEffect(() => {
        console.log("before getiing response")
        getList()
    }, []);

    const handleLogout = (e) => {
        try{
            Auth.signOut();
            props.auth.handleAuthen(false);
            props.auth.handleUser(null);
        }catch(error){
            console.log(error.message);
        } 
    }

    const getList = (e) => {
        const temp = {uid :String(props.auth.user.attributes.sub), id:id}
        try {
        axios.post(`http://10.0.0.204:8080/AdoptMe/Adopt`, temp ).then((response) => {
            console.log(response);
        })

        } catch (error) {
                alert(error)
         }


    }

    return(
        <div>
           <body>

           <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
            <script src="../home.js"></script>


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
                   
                    {/* hide login button when logged in */}
                    {!props.auth.authen && (
                        <div>
                        {<Link to={{pathname:"/login"}}> 
                            <div class="fas fa-user" id="login-btn" ></div>
                        </Link>}
                        </div>
                    )}
                    
                    {props.auth.authen &&props.auth.user && (
                        <div>
                            {<Link to={{pathname:"/createPost"}}> 
                                <div class="fas fa-pen" id="create-btn" ></div>
                            </Link>}

                            {/* logout button*/}
                            {<Link to={{pathname:"/home"}}> 
                                <div class="fas fa-door-open" id="login-btn" onClick={handleLogout} ></div>     
                            </Link>}

                            {/* show hello username */}
                            <p>
                                Hello {props.auth.user.username}
                            </p>
                        </div>
                        )}

                </div>            
            
            </header>
            
            <section class="home" id="home">

                <div class="content">
                    <h3>We would like to <span>THANK YOU</span> for your kindness</h3>
                    <p>The adoption request has been sent to current pet holder, be patient! Please wait for the reply.</p>
                    
                    {<Link to={{pathname:"/posts/adopt/all"}}> 
                        <a  class="btn">OK</a>
                    </Link>}
                </div>

            </section>
            </body>
        </div>
    )
}

export default Adopted