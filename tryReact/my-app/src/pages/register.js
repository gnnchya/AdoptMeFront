import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { uploadPic, createPostAdopt, createPostLost} from '../actions/posts'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {Auth} from "aws=amplify"


function Register() {
    const [postInfo, setPostInfo] = useState("") 
    const history = useHistory();

    useEffect(() => {
        setDefault()
    }, [])

    const setDefault = async(e) => {
        setPostInfo((oldValue) => ({ ...oldValue, ["birthdate"]: {todayDate}}))
        setPostInfo((oldValue) => ({ ...oldValue, ["gender"]: 'male'}))
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
        try {
            event.preventDefault()
            const SignupResponse = await Auth.signUp({
                    String(postInfo.username),
                    String(postInfo.password),
            })
    
            // history.push({pathname: "/posts/lost/all"})
            
        } catch (error) {
     
            alert( error)
        }

    }

    function todayDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 

        var date = yyyy+'-'+mm+'-'+dd
        return date
    }

    function firstDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear()-100;
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 

        var date = yyyy+'-'+mm+'-'+dd
        return date
    }


    return (
        <div>
           <body>
            
            <header class="header">
            
                <a href="index.html" class="logo"> <i class="fas fa-paw"></i> Adopt </a>
            
                <nav class="navbar">
                    <a href="index.html">home</a>
                    <a href="adoption.html">Adoption</a>
                    <a href="lost.html">Lost</a>
                </nav>
            
                <div class="icons">
                    <div class="fas fa-bars" id="menu-btn"></div>
                    
                    <a href = "create.html"> <div class="fas fa-pen" id="create-btn"> </div></a>
                    <a href="Login.html"> <div class="fas fa-user" id="login-btn"></div></a>
                    
                </div>
            </header>
            
            
            <h1 class="heading"> <span>login</span> now </h1>
            <section class="login" id="login">
            
                <h1 class="heading"> <span>Create free account</span> now </h1>
            
                <div class="row">
                    
                    <div class="image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAunfoVrQZQn0yUL5rY8PgTX9LVZPq1HMhSA&usqp=CAU" alt=""/>
                    </div>
            
                    <form action="">
                         <a class="links" >Name</a>
                        <div class="inputBox">
                            <input type="text" placeholder="Name" name="given_name" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Family Name</a>
                        <div class="inputBox">
                            <input type="text" placeholder="Family Name" name="family_name" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Email</a>
                        <div class="inputBox">
                            <input type="text" placeholder="@example.com" name="email" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Username</a>
                        <div class="inputBox">
                            <input type="text" placeholder="your Username" name="Username" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Gender</a>
                        <div class="inputBox">
                            <select name="gender" id="gender" defaultValue="Male" onChange={handlePostInput}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="lgbtqa">LGBTQA+</option>
                                <option value="not_disclose">Rather not to disclose</option>
                            </select>
                        </div>

                        <a class="links" >Birthdate</a>
                        <div class="inputBox">
                            <input type="date" name="birthdate" id="birthdate"  min={firstDate()} max={todayDate() }  onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Phone Number</a>
                        <div class="inputBox">
                            <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Password</a>
                        <div class="inputBox">
                            <input type="text" placeholder="your Password" name="password" onChange={handlePostInput}/>
                        </div>
                        
            
                        <input type="submit" value="register" class="btn" onclick={postUploadHandler} />
            
                    </form>
            
                </div>
            
            </section>
        
          
            <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
            <script src="home.js"></script>
            
            </body>
        </div>

    )
}

export default Register

