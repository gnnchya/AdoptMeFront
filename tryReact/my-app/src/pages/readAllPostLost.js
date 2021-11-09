import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'

function ReadAllPostLost() {
    let limit = 100
    let {page, keyword} = useParams()


    const [postItem, setPostItems] = useState([])
    const [keywords, setKeyword] = useState("")

    useEffect(() => {
        getList()
    }, []);
    
    const getList = async (e) => {
        try {
            axios.get(`http://127.0.0.1:8080/AdoptMe/LostPetPost?keyword=${keyword}&limit=${limit}&page=${page}`)
            .then((response) => {
                console.log(response);
                const temp = response.data.data
                setPostItems(temp|| [])
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

                    

                    <div class = "create-form">
                        <h3>Lost</h3>
                        <div class = "box">
                            <div class="content">
                                <h3>Create adopt pet post</h3>
                                <p>Species</p>
                                <input type="text" placeholder="pet species" class="box"  name="species" onChange={handlePostInput} />
                                <p>Age</p>
                                <input type="text" placeholder="Age of pet" class="box" name="age"  onChange={handlePostInput} />
                                <p>Gender</p>
                                <input type="text" placeholder="gender of pet" class="box" name="gender" onChange={handlePostInput} />
                                <p>Post caption</p>
                                <input type="text" placeholder="post info" class="box-info" name="info" onChange={handlePostInput} />
                                <p>Location</p>
                                <input type="text" placeholder="location" class="box" name="location" onChange={handlePostInput} />
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
                                            
                            </div>

                            {<Link to={{pathname:"/posts/lost/1"}}> 
                            <input type="submit"  class="btn" onClick={postUploadHandler}/>
                            </Link>}

                        </div>
                        
                        
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

                <h1 class="heading"> our <span> Dog </span> </h1>

                <section class="blogs" id="blogs">
                
                    <h1 class="heading"> our <span>lost and found</span> </h1>
                
                    <div class="box-container">

                    {postItem.map((item, index) => {
                       return(
                        <div class="box" key={index}>
                            <Link to={{pathname:`/post/${item.id}`}} >
                                
                                    <div>
                                        <img src={item.animal.image} alt=""/>
                                        <div class="content">
                                            <div class="icons">
                                                <a href="#" key={index}> <i class="fas fa-user"></i> {item.uid} </a>
                                                <a href="#" key={index}> <i class="fas fa-calendar"></i> {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(item.postAt)} </a>
                                            </div>
                                            <h3 key={index}>{item.animal.type}</h3>
                                            <p key={index}>{item.animal.generalInformation}</p>
                                            <a href={`/post/${item.id}`} class="btn">See more</a>
                                        </div>
                                    </div>
                                
                            </Link>
                        </div>
                       )
                        })}                
                
                    </div>
                
                </section>             
                
                
                <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
                
                <script src="script.js"></script>
                
                </body>

        </div>
       
    )
}

export default ReadAllPostLost