import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'

function ReadAllPostAdopt() {
    let limit = 100
    const {page, keyword} = useParams();

    const petType = keyword
    const [postItem, setPostItems] = useState([])
    const [keywords, setKeyword] = useState("")
    const [retrieve, setRetrieve] = useState(true)

    const getList = async (e) => {
        try {
            axios.get(`http://127.0.0.1:8080/AdoptMe/AdoptionPost?keyword=${keyword}&limit=${limit}&page=${page}`
            ).then((response) => {
                console.log(response);
                setPostItems(response.data.data|| [])
                console.log(postItem)
            })
        } catch (error) {
            alert(error)
        }
    }

    const changeToTrue = (e) =>{
        setRetrieve(true)
    }


    function ShowAnimals(keyword) {
        if (retrieve === true){
            getList()
            setRetrieve(false)
        }

        return(
            <section class="adoption" id="adoption">

            <h1 class="heading"> our <span> {`${petType}`} </span> </h1>

            <div class="box-container">

                {postItem.map((item, index) => {
                    return(
                    <div class="box" key={index}>
                            <div>
                                <img src={item.animal.image}  key={index} alt=""/>
                                <h3 key={index}>{item.animal.type}</h3>
                                <p key={index}>{item.animal.general_information} </p>
                            </div>
                        
                            <Link to={{pathname:`/post/adopt/${item.id}`}} >
                                    <a class="btn">See more</a>
                            </Link>
                    </div>
                    )
                })}

            </div>

        </section>
        )

    }

    const handleChangeInput = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setKeyword((oldValue) => ({ ...oldValue, [name]: value }))
    }

    return (
        <div>  
            <head>
                <title>Adopt pet</title>
            </head>
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
                        
                        {<Link to={`/posts/adopt/${keywords.keyword}`} onClick={changeToTrue}> 
                        <div class= "icons">
                        <label for="search-box" class="fas fa-search"></label>
                        </div>
                        </Link>}
                    </form>

                    <div class="icons">
                    <div class="fas fa-bars" id="menu-btn" ></div>
                    {<Link to={{pathname:"/createPost"}}> 
                        <div class="fas fa-pen" id="create-btn" ></div>
                    </Link>}
                    {<Link to={{pathname:"/login"}}> 
                        <div class="fas fa-user" id="login-btn" ></div>
                    </Link>}
                </div>  

                    </header>

                <h1 class="heading"> our <span> Dog </span> </h1>

                <ShowAnimals></ShowAnimals>
                <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

                
                <script src="../script.js"></script>

            </body>

        </div>
       
    )
}

export default ReadAllPostAdopt