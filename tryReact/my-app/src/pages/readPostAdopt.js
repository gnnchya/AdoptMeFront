import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {readPostAdopt , uploadPic, createPost,} from '../actions/posts'
import {generateUploadURL} from '../s3.js'

// import PostList from '../components/PostList'

function ReadPostAdopting() {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [postItem, setPostItems] = useState([])
    const [postInfo, setPostInfo] = useState("")

    const [keywords, setKeyword] = useState("")
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 

    useEffect(() => {
        getList()
    }, [])

    let {id} = useParams("id")


    const getList = async (e) => {
        try {
            axios.get(`http://127.0.0.1:8080/AdoptMe/AdoptionPost?keyword=${keyword}&limit=${limit}&page=${page}`
            ).then((response) => {
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
                            <a href="#" class="links" key={index}> <i class="fas fa-hospital"></i> {aitem.nimal.medical_condition} </a>
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
