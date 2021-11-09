import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {uploadPic, createPost, readAllPostLost } from "../actions/posts.js";
import {generateUploadURL} from '../s3.js'
import axios from 'axios'


function HomePage(){

    let limit = 3
   
    const [postItem, setPostItems] = useState({})

    const [postInfo, setPostInfo] = useState("") 
    const [spay, setSpay] = useState(false)
    const [file, setFile] = useState({}) 
    

    useEffect(() => {
        console.log("before getiing response")
        getList()
    }, []);

    const getList = (e) => {
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
            const temp = response.data.data
            setPostItems(temp|| [])
            console.log(postItem)
        })

        } catch (error) {
                alert(error)
         }


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
                    <div class="fas fa-pen" id="create-btn" ></div>
                    <div class="fas fa-user" id="login-btn" ></div>
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
                                    <input type="file" accept="image/png, image/jpeg" name="picFile" class="pics" onChange={fileSelectedHandler}/>
                                </div>
                                            
                            </div>

                            {<Link to="/posts/lost/1"> 
                            <input type="submit" class="btn" onClick={postUploadHandler}/>
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
            
            <section class="home" id="home">

                <div class="content">
                    <h3>Adopt and <span>help</span> animal</h3>
                    <p>With more adoptable pets than ever, we have an urgent need for pet adopters. Search for dogs, cats, and other available pets for adoption near you.</p>
                    {<Link to={{pathname:"/posts/adopt/1/all"}}> 
                        <a class="btn">adoption</a>
                    </Link>}
                    
                </div>

            </section>

            <section class="adoption" id="adoption">

                {<Link to={{pathname:"/posts/adopt/1/all"}}> 
                <a ><h1 class="heading"> our <span> Adoption</span> </h1></a>
                </Link>}
                


                <div class="box-container">

                    <div class="box">
                        <img src="../images/dog-icon" alt=""/>
                        <h3>Dog</h3>
                        <p>View all our DOGS available for adoption!</p>
                        {<Link to={{pathname:"/posts/adopt/1/dog"}}> 
                        <a class="btn">See more Dogs</a>
                        </Link>}
                        
                
                    </div>

                    <div class="box">
                        <img src="../images/cat-icon"  alt=""/>
                        <h3>Cat</h3>
                        <p>View all our CATS available for adoption!</p>
                        
                        {<Link to={{pathname:"/posts/adopt/1/cat"}}> 
                        <a href="/posts/adopt/1/cat" class="btn">See more Cats</a>
                        </Link>}
                        
                    </div>

                    <div class="box">
                        <img src="https://cdn-icons-png.flaticon.com/512/185/185810.png" alt=""/>
                        <h3>Bunny</h3>
                        <p>View all our BUNNIES available for adoption!</p>
                        
                        {<Link to={{pathname:"/posts/adopt/1/bunny"}}> 
                        <a href="/posts/adopt/1/bunny" class="btn">See more Bunnies</a>
                        </Link>}
                        
                        
                    </div>
                
                </div>

            </section>

            <section class="blogs" id="blogs">

                {<Link to={{pathname:"/posts/lost/1/all"}}> 
                <a ><h1 class="heading"> our <span>lost and found</span> </h1></a>
                </Link>}
             

                

               <div class="box-container">

                    {postItem.map((item, index) => {
                        
                        <div class="box" key={index}>
                            <Link to={{pathname:`/post/${item.id}`}} >
                                {item.AnimalStruct.map((animal, index) => {
                                    <div>
                                        <img src={animal.image} alt=""/>
                                        <div class="content">
                                            <div class="icons">
                                                <a href="#" key={index}> <i class="fas fa-user"></i> {item.uid} </a>
                                                <a href="#" key={index}> <i class="fas fa-calendar"></i> {Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(item.postAt)} </a>
                                            </div>
                                            <h3 key={index}>{animal.type}</h3>
                                            <p key={index}>{animal.generalInformation}</p>
                                            <a href={`/post/${item.id}`} class="btn">See more</a>
                                        </div>
                                    </div>
                                })}
                                
                            </Link>
                        </div>
                            
                        })}                
                
                    </div>

            </section>


            

            </body>
        </div>
    )
}

export default HomePage