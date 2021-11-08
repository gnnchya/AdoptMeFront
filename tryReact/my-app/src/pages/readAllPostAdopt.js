import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {uploadPic, createPost, readAllPostAdopt } from "../actions/posts.js";
import {generateUploadURL} from '../s3.js'

function ReadAllPostAdopt() {
    let limit = 100
    let {page, keywords} = useParams()

    const petType = keywords
    const [postItem, setPostItems] = useState([])
    useEffect(() => {
        getList()
    }, [])

    const [keyword, setKeyword] = useState("")
    const [postInfo, setPostInfo] = useState("") 
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 

    
    const getList = async (e) => {
        try {
            const response = await readAllPostAdopt(String(keyword),limit,Number(page))
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setPostItems(response.data.data || [])
            }
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
        const name = event.target.name
        const value = event.target.value
        setFile((oldValue) => ({ ...oldValue, [name]: value }))
    }

    const postUploadHandler = async (event) =>{
        try {
            event.preventDefault()
            const {url} =  await generateUploadURL()
            var options = {
                headers: {
                'Content-Type': file.picFile
                }
            };

            const picURL = await uploadPic(url, file.picFile, options) 
               
            const tempAnimal = {type: postInfo.type, age: +postInfo.age, species: postInfo.species, gender: postInfo.gender, generalInformation: postInfo.info,  spay: spay.spay, image: picURL, medical_condition: postInfo.medical_condition}
            const temp = {...postInfo, animal:tempAnimal, UID: "", location: postInfo.location}
            const response =  await createPost(temp)
            console.log(response)
            

            if (response.status === 201) {
                console.log("create", response)
                alert("created")
            }
        } catch (error) {
            // if (error.status === 422){
            //     alert("422")
            // }
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
                        <a href="/posts/adopt/1">Adoption</a>
                        <a href="/posts/lost/1">Lost</a>
                    </nav>

                    <div class="icons">
                        <div class="fas fa-bars" id="menu-btn"></div>
                        <div class="fas fa-search" id="search-btn"></div>
                        <div class="fas fa-pen" id="create-btn"></div>
                        <div class="fas fa-user" id="login-btn"></div>
                    </div>

                    <form action="" class="search-form">
                        <input type="search" name="keyword" id="search-box" placeholder="search here..."  onChange={handleChangeInput} />
                        <label for="search-box" class="fas fa-search"></label>
                        {<Link to={`/posts/adopt/1/${keyword}`}> 
                        <div class= "icons">
                            <a href = "#"> <div class="fas fa-search" id="create-btn"> </div></a>
                        </div>
                        </Link>}
                    </form>

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
                                    <input type="file" accept="image/png, image/jpeg" value="Add photo" class="pics" onChange={fileSelectedHandler}/>
                                </div>
                                            
                            </div>

                            {<Link to={{pathname:"/posts/adopt/1"}}> 
                            <input type="submit" value="Create" class="btn" onClick={postUploadHandler}/>
                            </Link>}

                        </div>
                        
                        
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

                <h1 class="heading"> our <span> Dog </span> </h1>

                <section class="adoption" id="adoption">

                    <h1 class="heading"> our <span> `${petType}` </span> </h1>

                    <div class="box-container">

                        {postItem.map((item, index) => {
                        return (
                            <div class="box" key={index}>
                                <Link to={{pathname:`/post/${item.id}`}} >

                                {item.AnimalStruct.map((animal, index) => {
                                    <div>
                                        <img src={animal.image} alt=""/>
                                        <h3 key={index}>{animal.type}</h3>
                                        <p key={index}>{animal.generalInformation} </p>
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

                
                <script src="../script.js"></script>

            </body>

        </div>
       
    )
}

export default ReadAllPostAdopt