import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {readAllPost } from '../actions/posts'
// import PostList from '../components/PostList'

function ReadAllPost() {
    let limit = 100
    let {keyword, page} = useParams()

    const petType = keyword
    const [postItem, setPostItems] = useState([])
    useEffect(() => {
        getList()
    }, [])
    
    const getList = async (e) => {
        try {
            const response = await readAllPost('adopt',String(keyword),limit,Number(page))
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setPostItems(response.data.data || [])
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>  
            <head>
                <title>Adopt pet</title>
            </head>
            <body>
                
                <header class="header">

                    <a href="#home" class="logo"> <i class="fas fa-paw"></i> Adopt </a>

                    <nav class="navbar">
                        <a href="/home">home</a>
                        <a href="/posts">Adoption</a>
                        <a href="/blogs">Lost</a>
                    </nav>

                    <div class="icons">
                        <div class="fas fa-bars" id="menu-btn"></div>
                        <div class="fas fa-search" id="search-btn"></div>
                        <div class="fas fa-pen" id="create-btn"></div>
                        <div class="fas fa-user" id="login-btn"></div>
                    </div>

                    <form action="" class="search-form">
                        <input type="search" id="search-box" placeholder="search here..."/>
                        <label for="search-box" class="fas fa-search"></label>
                    </form>

                    <div class = "create-form">
                        <h3>Lost</h3>
                        <div class = "box">
                        
                            <div class="content">
                                <h3>Create adopt pet post</h3>
                                <p>Title</p>
                                <input type="text" placeholder="your title post" class="box"/>
                                <p>Age</p>
                                <input type="text" placeholder="Age of pet" class="box"/>
                                <p>Gender</p>
                                <input type="text" placeholder="gender of pet" class="box"/>
                                <p>Post caption</p>
                                <input type="text" placeholder="post info" class="box-info"/>
                                <p>Location</p>
                                <input type="text" placeholder="location" class="box"/>
                                <p>Photo</p>
                                <input type="file" accept="image/png, image/jpeg" value="Add photo" class="pics"/>
                                    
                            </div>
                        </div>
                        <input type="submit" value="Create" class="btn"/>
                    </div>



                    <form action="" class="login-form">
                        <h3>login now</h3>
                        <input type="email" placeholder="your email" class="box"/>
                        <input type="password" placeholder="your password" class="box"/>
                        <p>forget your password <a href="#">click here</a></p>
                        <p>don't have an account <a href="#">create now</a></p>
                        <input type="submit" value="login now" class="btn"/>
                    </form>

                    </header>

                <section class="adoption" id="adoption">

                    <h1 class="heading"> our <span> `${petType}` </span> </h1>

                    <div class="box-container">

                        {postItem.map((item, index) => {
                        return (
                            <div class="box">
                                <Link to={{pathname:`/post/${item.id}`}} >

                                {item.AnimalStruct.map((animal, index) => {
                                    <div>
                                        <img src={animal.image} alt=""/>
                                        <h3 key={index}>{animal.type}</h3>
                                        <p key={index}>{animal.GeneralInformation} </p>
                                    </div>
                                })}
                                <a href={`/post/${item.id}`} class="btn">See more</a>
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

export default ReadAllPost