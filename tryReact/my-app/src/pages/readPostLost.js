import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'
import Amplify, { Auth } from 'aws-amplify'
import { deletePostLost } from '../actions/posts';
// import PostList from '../components/PostList'

function ReadPostLost(props) {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [postItem, setPostItems] = useState({})
    const [userItem, setUserItems] = useState({})
    const [keywords, setKeyword] = useState("")
    const [animal, setAnimal] = useState({})

    const handleLogout = (e) => {
        try{
            Auth.signOut();
            props.auth.handleAuthen(false);
            props.auth.handleUser(null);
        }catch(error){
            console.log(error.message);
        } 
    }


    useEffect(() => {
        getList()
    }, [])
    
    let {id} = useParams("id")
    console.log("iddd", id)
    const getList = async (e) => {
        try {
            axios.get(`http://10.0.20.154:8080/AdoptMe/LostPetPost/${id}`
            ).then((response) => {
                console.log(response);
                setPostItems(response.data.data)
                // postItem.UID to get UID
                setAnimal(response.data.data.animal)
                console.log(postItem)

                axios.get(`http://10.0.20.154:8080/AdoptMe/UserInfo/${response.data.data.uid}`
                ).then((response) => {
                    console.log(response);
                    setUserItems(response.data.data)
                    // postItem.UID to get UID
                    console.log(userItem)
                })

            })

           
        } catch (error) {
            alert(error)
        }
    }
    const handleChangeInput = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setKeyword((oldValue) => ({ ...oldValue, [name]: value }))
    }
    const handleDelete =  async (e) => {
        try {
            await deletePostLost(id)
        } catch (error) {
            alert(error)
        }
    }

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year  ;
        return time;
      }

    function ShowUpdate() {
        console.log(String(postItem.uid))

        // console.log(String(props.auth.user.attributes.sub))
        if ((typeof postItem.uid === 'undefined') || (typeof props.auth.user.attributes === 'undefined' ) ) {
            return (null)
          }
        if (String(postItem.uid) === String(props.auth.user.attributes.sub)){
            // console.log("function showUpdate used")
            
            return(

                <div class= "icons">

                <Link to={{pathname:`/updatePostLost/${id}`}}> 
                    <a> <div class="fas fa-pen" id="create-btn"> </div></a>
                </Link>
                <Link to={{pathname:`/posts/lost/all`}}> 
                <a> <div class="fas fa-trash" id="create-trash" onClick={handleDelete}> </div></a>
                </Link>

                </div>

                )
        } else {
            return null
        }   
    }

    function ShowLost() {
        console.log(String(postItem.uid))
        // console.log(String(props.auth.user.attributes.sub))
        if ((typeof postItem.uid === 'undefined') || (typeof props.auth.user.attributes=== 'undefined' ) ) {
            return (null)
          }
        if (!(String(postItem.uid) === String(props.auth.user.attributes.sub)) && !(Boolean(postItem.found))){
            // console.log("function showUpdate used")
            
            return(
                <Link to={{pathname:`/found/${id}`}} target="_blank"> 
                    <a class="btn">Found</a>
                </Link>
        )
        } else {
            return null
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

                <form action="" class="search-form">
                        <input type="text" name="keyword" id="search-box" placeholder="search here..."  onChange={handleChangeInput} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
                        
                        {<Link to={`/posts/lost/1/${keywords.keyword}`}> 
                        <div class= "icons">
                        <label for="search-box" class="fas fa-search"></label>
                        </div>
                        </Link>}
                </form>

                <div class="icons">
                <div class="fas fa-bars" id="menu-btn" ></div>
                    {/* {<Link to={{pathname:"/createPost"}}> 
                        <div class="fas fa-pen" id="create-btn" ></div>
                    </Link>} */}
                    {/* <showUpdate></showUpdate> */}

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

            
            <h1 class="heading"> our <span>lost and found</span> </h1>
            
            <section class="blogs" id="blogs">
            
                <h1 class="heading"> our <span>lost and found</span> </h1>

            
                <div class="box-container">

                    <div class="box">
                           
                            <img src={animal.image} alt=""/>
                            
                            <ShowUpdate></ShowUpdate>
                      

                            <div class="content">

                                <div class="icons">
                                    {/* aow user name mar sai tan uid */}
                                    <a href="#"> <i class="fas fa-user"></i> {userItem.name} </a>
                                    <a href="#"> <i class="fas fa-calendar"></i> {timeConverter(postItem.post_at)}</a>
                                </div>
                                <h3>{animal.species}</h3>
                                <p>{animal.general_information}</p>
                                <div class="box">
                                    <div class="box">
                                        <h3>info</h3>
                                        <a href="#" class="links"> <i class="fas fa-paw"></i> {animal.type} </a>
                                        <a href="#" class="links"> <i class="fas fa-dog"></i> {animal.species} </a>
                                        <a href="#" class="links"> <i class="fas fa-birthday-cake"></i> {animal.age} </a>
                                        <a href="#" class="links"> <i class="fas fa-hospital"></i> {animal.medical_condition} </a>
                                        <a href="#" class="links"> <i class="fas fa-male"></i> <i class="fas fa-female"></i> {animal.gender} </a>
                                        <a href="#" class="links"> <i class="fab fa-font-awesome"></i> {String(animal.spay)} </a>
                                        <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> {postItem.lost_location}</a>
                                        <a href="#" class="links"> <i class="fas fa-check"></i> {String(postItem.found)}  </a>
                                    </div>
                                    
                                    <h3>contact info</h3>
                                    <a href="#" class="links"> <i class="fas fa-phone"></i> {userItem.name} </a>
                                    <a href="#" class="links"> <i class="fas fa-envelope"></i> {userItem.email} </a>
                                    <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> {userItem.address}  </a>
                                </div>

                                <ShowLost></ShowLost>
                                
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

export default ReadPostLost