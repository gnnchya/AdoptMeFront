import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify'
import { register} from '../actions/posts'


function Register(props) {
    const ip = String(process.env.REACT_APP_IP)
    const [postInfo, setPostInfo] = useState("") 
    const history = useHistory();

    useEffect(() => {
        setDefault()
    }, [])

    const setDefault = async(e) => {
        setPostInfo((oldValue) => ({ ...oldValue, ["birthdate"]: toUnix(todayDate()) }))
        setPostInfo((oldValue) => ({ ...oldValue, ["gender"]: 'male'}))
    }

    const handlePostInput = (e) =>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
    
        setPostInfo((oldValue) => ({ ...oldValue, [name]: value }))
    }

    const postUploadHandler = async (event) =>{
               
        try 
        {
            event.preventDefault()
            console.log(postInfo)
            const email = postInfo.email
            const username = postInfo.username
            const password = postInfo.password
            const name = postInfo.name
            const gender = postInfo.gender
            const birthdate = postInfo.birthdate
            const address = postInfo.address


            console.log(String(email))
            console.log(String(username))
            console.log(String(password))
            const SignupResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email,
                    name: name,
                    gender: gender,
                    birthdate: birthdate,
                    address: address
                }
            })
            console.log(SignupResponse)
            
            const temp = {...postInfo, uid: String(SignupResponse.userSub), username:String(postInfo.username), name: String(postInfo.name)
                , address :String( postInfo.address), birthdate : +toUnix(postInfo.birthdate)
                , email : String(postInfo.email), gender : String(postInfo.gender) 
            }
            console.log(temp)

             await register(temp)

            history.push({pathname: "/home"})
            
        } catch (error) {
    
            alert( error)
            let err = null;
            !error.message ? err = {"message": error}: err = error;
            // setPostInfo({
            //     errors: {
            //         ...postInfo.state.errors,
            //         cognito: err
            //     }
            // });
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

    function toUnix(dateTime){
        var date = new Date(dateTime);
        var unixTimeStamp = Math.floor(date.getTime() / 1000);
        return unixTimeStamp
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
                    {/* <a href = "#"> <div class="fas fa-pen" id="create-btn"> </div></a>
                    {<Link to={{pathname:"/login"}}> 
                        <div class="fas fa-user" id="login-btn" ></div>
                    </Link>} */}
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
                        
                        <a class="links" >Email</a>
                        <div class="inputBox">
                            <input type="text" placeholder="@example.com" name="email" onChange={handlePostInput}/>
                        </div>

                         <a class="links" >Name</a>
                        <div class="inputBox">
                            <input type="text" placeholder="Name" name="name" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Username</a>
                        <div class="inputBox">
                            <input type="text" placeholder="your Username" name="username" onChange={handlePostInput}/>
                        </div>

                        <a class="links" >Password</a>
                        <div class="inputBox">
                            <input type="text" placeholder="your Password" name="password" onChange={handlePostInput}/>
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

                        <a class="links" >Address</a>
                        <div class="inputBox">
                            <input type="text" placeholder="address" name="address" onChange={handlePostInput}/>
                        </div>
                        
            
                        <input type="submit" class="btn"  onClick={postUploadHandler} />
            
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

