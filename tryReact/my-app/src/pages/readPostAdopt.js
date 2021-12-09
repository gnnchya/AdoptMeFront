import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'
import Amplify, { Auth } from 'aws-amplify'

// import PostList from '../components/PostList'

function ReadPostAdopting(props) {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [postItem, setPostItems] = useState({})

    const [userItem, setUserItems] = useState({})

    const [keywords, setKeyword] = useState("")

    const [animal,setAnimal] = useState({})

    const handleLogout = (e) => {
        try{
            Auth.signOut();
            props.auth.handleAuthen(false);
            props.auth.handleUser(null);
        }catch(error){
            console.log(error.message);
        } 
    }

    const handleChangeInput = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setKeyword((oldValue) => ({ ...oldValue, [name]: value }))
    }

    useEffect(() => {
        getList()
    }, [])

    let {id} = useParams("id")


    const getList = async (e) => {
        try {
            axios.get(`http://127.0.0.1:8080/AdoptMe/AdoptionPost/${id}`
            ).then((response) => {
                console.log(response);
                setPostItems(response.data.data)
                setAnimal(response.data.data.animal)
                console.log(postItem)
                console.log(postItem.adopt)
                console.log(typeof postItem.adopt)

                axios.get(`http://127.0.0.1:8080/AdoptMe/UserInfo/${response.data.data.uid}`
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
                        
                        {<Link to={`/posts/adopt/1/${keywords.keyword}`}> 
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
                    <div>
                        {<Link to={{pathname:"/createPost"}}> 
                            <div class="fas fa-pen" id="create-btn" ></div>
                        </Link>}

                        <p>
                            Hello {props.auth.user.username}
                        </p>

                    </div>             
                    )}

                    {/* logout button*/}
                    {props.auth.authen &&props.auth.user && (
                        <div>
                            {/* fark find log out icon aow ma tan login icon */}
                            {<Link to={{pathname:"/home"}}> 
                                <div class="fas fa-door-open" id="login-btn" onClick={handleLogout} ></div> 
                            </Link>}
                        </div>
                        )}
                </div>            
            
            </header>

        <h1 class="heading"> Adoption's <span>info</span> </h1>

        <section class="info" id="info">

            <h1 class="heading"> Adoption's <span>info</span> </h1>

            <div class="swiper info-slider">

                <div class="swiper-wrapper">

                    <div class="swiper-slide box" >

                            <div>
                            <img src={animal.image} alt=""/>

                            <div class="box">
                            <h3>info</h3>
                            <a href="#" class="links"> <i class="fas fa-paw"></i> {animal.type} </a>
                            <a href="#" class="links"> <i class="fas fa-dog"></i> {animal.species} </a>
                            <a href="#" class="links"> <i class="fas fa-birthday-cake"></i> {animal.age} </a>
                            <a href="#" class="links"> <i class="fas fa-hospital"></i> {animal.medical_condition} </a>
                            <a href="#" class="links"> <i class="fas fa-male"></i> <i class="fas fa-female"></i> {animal.gender} </a>
                            <a href="#" class="links"> <i class="fab fa-font-awesome"></i> {String(animal.spay)} </a>
                            <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> {postItem.location}</a>
                            <a href="#" class="links"> <i class="fas fa-check"></i> {String(postItem.adopt)}  </a>
                            </div>


                            <p>{animal.general_information}</p>
                            <h3>{animal.type}</h3>

                            <h3>contact info</h3>
                                    <a href="#" class="links"> <i class="fas fa-phone"></i> {userItem.name} </a>
                                    <a href="#" class="links"> <i class="fas fa-envelope"></i> {userItem.email} </a>
                                    <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> {userItem.address}  </a>

                            <a  type = "submit"
                            href="#" class="btn">Adopt</a>
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

export default ReadPostAdopting
