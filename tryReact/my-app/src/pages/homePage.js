import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {uploadPic, createPost, readAllPostLost } from "../actions/posts.js";
import {generateUploadURL} from '../s3.js'
import axios from 'axios'

function HomePage(props){

    let limit = 3
   
    const [postItem, setPostItems] = useState([])

    const [postInfo, setPostInfo] = useState("") 
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 
    

    useEffect(() => {
        console.log("before getiing response")
        getList()
    }, []);

    const getList = (e) => {
        console.log("home", props.auth.authen)
        console.log("home", props.auth.user)
        // try {
        //     const response = await readAllPostLost("all",limit,1)
        //     console.log(response.data.data)
        //     // alert(response.data.data[0])
        //     if (response.status === 200) {
        //         setPostItems(response.data.data || [])
        //     }
        // } catch (error) {
        //     alert(error)
        // }
        try {
        axios.get(`http://127.0.0.1:8080/AdoptMe/LostPetPost?keyword=${"all"}&limit=${limit}&page=${1}`
        ).then((response) => {
            console.log(response);
            setPostItems(response.data.data || [])
            console.log(postItem)
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
            
                <a href="#home" class="logo"> <i class="fas fa-paw"></i> Adopt </a>
            
                <nav class="navbar">
                        <a href="#home">home</a>
                        <a href="#adoption">Adoption</a>
                        <a href="#blogs">Lost</a>
                </nav>
            
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
            
            <section class="home" id="home">

                <div class="content">
                    <h3>Adopt and <span>help</span> animal</h3>
                    <p>With more adoptable pets than ever, we have an urgent need for pet adopters. Search for dogs, cats, and other available pets for adoption near you.</p>
                    {<Link to={{pathname:"/posts/adopt/all"}}> 
                        <a class="btn">adoption</a>
                    </Link>}
                    
                </div>

            </section>

            <section class="adoption" id="adoption">

                {<Link to={{pathname:"/posts/adopt/all"}}> 
                <a ><h1 class="heading"> our <span> Adoption</span> </h1></a>
                </Link>}
                


                <div class="box-container">

                    <div class="box">
                        <img src={process.env.PUBLIC_URL + './images/dog-icon.png'} alt="dog-icon"/>
                        <h3>Dog</h3>
                        <p>View all our DOGS available for adoption!</p>
                        {<Link to={{pathname:"/posts/adopt/dog"}}> 
                        <a class="btn">See more Dogs</a>
                        </Link>}
                        
                
                    </div>

                    <div class="box">
                    <img src={process.env.PUBLIC_URL + './images/cat-icon.png'} alt="cat-icon"/>
                        <h3>Cat</h3>
                        <p>View all our CATS available for adoption!</p>
                        
                        {<Link to={{pathname:"/posts/adopt/cat"}}> 
                        <a href="/posts/adopt/1/cat" class="btn">See more Cats</a>
                        </Link>}
                        
                    </div>

                    <div class="box">
                        <img src="https://cdn-icons-png.flaticon.com/512/185/185810.png" alt=""/>
                        <h3>Bunny</h3>
                        <p>View all our BUNNIES available for adoption!</p>
                        
                        {<Link to={{pathname:"/posts/adopt/bunny"}}> 
                        <a href="/posts/adopt/1/bunny" class="btn">See more Bunnies</a>
                        </Link>}
                        
                        
                    </div>
                
                </div>

            </section>

            <section class="blogs" id="blogs">

                {<Link to={{pathname:"/posts/lost/all"}}> 
                <a ><h1 class="heading"> our <span>lost and found</span> </h1></a>
                </Link>}
             

               <div class="box-container">

                    {postItem.map((item, index) => {
                        return (
                            <div class="box" key={index}>

                                    <div>
                                        <img src={item.animal.image} alt=""/>
                                        <div class="content">
                                            <div class="icons">
                                                <a href="#" key={index}> <i class="fas fa-user"></i> {item.uid} </a>
                                                <a href="#" key={index}> <i class="fas fa-calendar"></i> {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(item.post_at)} </a>
                                            </div>
                                            <h3 key={index}>{item.animal.type}</h3>
                                            <p key={index}>{item.animal.general_information}</p>
                                            <Link to={{pathname:`/post/lost/${item.id}`}} >
                                            <div class="btn">See more</div>
                                            </Link>
                                        </div>
                                    </div>
                        </div>
                        )
                            
                        })}                
                
                    </div>

            </section>

            <section class="login" id="login">

                <h1 class="heading"> <span>login</span> now </h1>

                <div class="row">
                    
                    <div class="image">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAunfoVrQZQn0yUL5rY8PgTX9LVZPq1HMhSA&usqp=CAU" alt=""/>
                    </div>

                    <form action="">

                        <div class="inputBox">
                            <input type="email" placeholder="email"/>
                        </div>

                        <div class="inputBox">
                            <input type="text" placeholder="username name"/>
                        </div>

                        <input type="submit" value="login now" class="btn"/>

                    </form>

                </div>

            </section>


            

            </body>
        </div>
    )
}

export default HomePage