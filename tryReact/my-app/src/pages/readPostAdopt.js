import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'

// import PostList from '../components/PostList'

function ReadPostAdopting() {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [postItem, setPostItems] = useState([])

    const [keywords, setKeyword] = useState("")

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
                setPostItems(response.data.data|| [])
                console.log(postItem)
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
                    {<Link to={{pathname:"/posts/adopt/1/all"}}> 
                    <a>Adoption</a>
                    </Link>}
                    {<Link to={{pathname:"/posts/lost/1/all"}}> 
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

        <h1 class="heading"> Adoption's <span>info</span> </h1>

        <section class="info" id="info">

            <h1 class="heading"> Adoption's <span>info</span> </h1>

            <div class="swiper info-slider">

                <div class="swiper-wrapper">

                {postItem.map((item, index) => {
                    return(
                    <div class="swiper-slide box" >

                            <div>
                            <img src={item.animal.image} alt="" key={index}/>

                            <div class="box">
                            <h3>info</h3>
                            <a href="#" class="links" key={index}> <i class="fas fa-paw"></i> {item.animal.type} </a>
                            <a href="#" class="links" key={index}> <i class="fas fa-dog"></i> {item.animal.species} </a>
                            <a href="#" class="links" key={index}> <i class="fas fa-birthday-cake"></i> {item.animal.age} </a>
                            <a href="#" class="links" key={index}> <i class="fas fa-hospital"></i> {item.nimal.medical_condition} </a>
                            <a href="#" class="links" key={index}> <i class="fas fa-male"></i> <i class="fas fa-female"></i> {item.animal.gender} </a>
                            <a href="#" class="links" key={index}> <i class="fab fa-font-awesome"></i> {item.animal.spay} </a>
                            <a href="#" class="links" key={index}> <i class="fas fa-map-marker-alt"></i> {item.location}</a>
                            <a href="#" class="links" key={index}> <i class="fas fa-check"></i> {item.adopt}  </a>
                            </div>

                            <p>{item.animal.generalInformation}</p>
                            <h3>{item.animal.type}</h3>

                            <a  type = "submit"
                            href="#" class="btn">Adopt</a>
                            </div>

                    </div>
                    
                    )
                })}  
                    
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
