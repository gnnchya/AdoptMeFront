import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'
// import PostList from '../components/PostList'

function ReadPostLost() {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [postItem, setPostItems] = useState({})
    const [keywords, setKeyword] = useState("")


    useEffect(() => {
        getList()
    }, [])
    let {id} = useParams("id")
    console.log("iddd", id)
    const getList = async (e) => {
        try {
            axios.get(`http://127.0.0.1:8080/AdoptMe/LostPetPost/${id}`
            ).then((response) => {
                console.log(response);
                setPostItems(response.data.data)
                console.log(postItem)
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
                    {<Link to={{pathname:"/posts/adopt/1/all"}}> 
                    <a>Adoption</a>
                    </Link>}
                    {<Link to={{pathname:"/posts/lost/1/all"}}> 
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
                    <div class="fas fa-bars" id="menu-btn"></div>
                    <div class="fas fa-pen" id="create-btn"></div>
                    <div class="fas fa-user" id="login-btn"></div>
                </div>

                <form action="" class="login-form">
                    <h3>login now</h3>
                    <input type="email" placeholder="your email" class="box"/>
                    <input type="password" placeholder="your password" class="box"/>
                    <p>forget your password <a href="#">click here</a></p>
                    <p>don't have an account <a href="#">create now</a></p>
                    <input type="submit" class="btn"/>
                </form>
            
            </header>

            
            <h1 class="heading"> our <span>lost and found</span> </h1>
            
            <section class="blogs" id="blogs">
            
                <h1 class="heading"> our <span>lost and found</span> </h1>
            
                <div class="box-container">
                
                {/* {postItem.map((item, index) => { */}
                    <div class="box">
                            <div>
                            <img src={postItem.animal.image} alt="" key={index}/>
                            <div class= "icons">
                                {<Link to={{pathname:{}`/updatePost/${id}`}}> 
                                    <a> <div class="fas fa-pen" id="create-btn"> </div></a>
                                </Link>}
                            </div>

                            <div class="content">
                                <div class="icons">
                                    <a href="#"> <i class="fas fa-user"></i> {postItem.uid} </a>
                                    <a href="#"> <i class="fas fa-calendar"></i> {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(postItem.postAt)}</a>
                                </div>
                                <h3>{postItem.animal.species}</h3>
                                <p>{postItem.animal.generalInformation}</p>
                                <div class="box">
                                    <div class="box">
                                        <h3>info</h3>
                                        <a href="#" class="links" key={index}> <i class="fas fa-paw"></i> {postItem.animal.type} </a>
                                        <a href="#" class="links" key={index}> <i class="fas fa-dog"></i> {postItem.animal.species} </a>
                                        <a href="#" class="links" key={index}> <i class="fas fa-birthday-cake"></i> {postItem.animal.age} </a>
                                        <a href="#" class="links" key={index}> <i class="fas fa-hospital"></i> {postItem.animal.medical_condition} </a>
                                        <a href="#" class="links" key={index}> <i class="fas fa-male"></i> <i class="fas fa-female"></i> {postItem.animal.gender} </a>
                                        <a href="#" class="links" key={index}> <i class="fab fa-font-awesome"></i> {postItem.animal.spay} </a>
                                        <a href="#" class="links" key={index}> <i class="fas fa-map-marker-alt"></i> {postItem.location}</a>
                                        <a href="#" class="links" key={index}> <i class="fas fa-check"></i> {postItem.adopt}  </a>
                                    </div>
                                    
                                    <h3>contact info</h3>
                                    <a href="#" class="links"> <i class="fas fa-phone"></i> +123-456-7890 </a>
                                    <a href="#" class="links"> <i class="fas fa-phone"></i> +111-222-3333 </a>
                                    <a href="#" class="links"> <i class="fas fa-envelope"></i> pain@gmail.com </a>
                                    <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> bkk, th - 11111 </a>
                                </div>

                                <a href="#" class="btn">Found</a>
                                
                            </div>
                            </div>
                    </div>
                    
                
                {/* })}            */}
                    
            
            
                </div>
            
            </section>

            <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
            
            <script src="script.js"></script>
            
            </body>
        </div>

    )
}

export default ReadPostLost

