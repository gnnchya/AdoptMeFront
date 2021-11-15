import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updatePostLost} from '../actions/posts'
import axios from 'axios'

function UpdatePost() {
    const [postInfo, setPostInfo] = useState("") 
    const [spay, setSpay] = useState(false)

    const [postItem, setPostItems] = useState({})
    const [animal, setAnimal] = useState({})

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
                setAnimal(response.data.data.animal)
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

    const postUploadHandler = async (event) =>{

        event.preventDefault()            
        const tempAnimal = {type: postInfo.type, age: +postInfo.age, species: postInfo.species, gender: postInfo.gender, generalInformation: postInfo.info,  spay: spay.spay, image: "", medical_condition: postInfo.medical_condition}
        const temp = {...postInfo, id: postItem.id ,animal:tempAnimal, UID: "", location: postInfo.location, found: spay.found}
        const response = ""

        response =  await updatePostLost(temp)
        console.log(response)

        // try {
        //     event.preventDefault()            
        //     const tempAnimal = {type: postInfo.type, age: +postInfo.age, species: postInfo.species, gender: postInfo.gender, generalInformation: postInfo.info,  spay: spay.spay, image: "", medical_condition: postInfo.medical_condition}
        //     const temp = {...postInfo, id: postItem.id ,animal:tempAnimal, UID: "", location: postInfo.location, found: spay.found}
        //     const response = ""

        //     response =  await updatePostLost(temp)
        //     console.log(response)

        // } catch (error) {
     
        //     alert( error)
        // }

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
            
            <div class="icons">
                    <div class="fas fa-bars" id="menu-btn" ></div>
                    {<Link to={{pathname:"/createPost"}}> 
                        <div class="fas fa-pen" id="create-btn" ></div>
                    </Link>}
                    <div class="fas fa-user" id="login-btn" ></div>
            </div>            
            </header>
            
            
            <h1 class="heading"> our <span>lost and found</span> </h1>
            <section class="blogs" id="blogs">
            
                <h1 class="heading"> our <span>lost and found</span> </h1>
            
                <div class="box-container">
                <div class= "icons">
                                    
            
                </div>
                    <div class="box">
                        <div class="content">
                            <div class="icons">
                                <a > <i class="fas fa-user"></i> {postItem.uid}</a>
                                <a > <i class="fas fa-calendar"></i> {postItem.postAt} </a>
                            </div>
                            <h3>{animal.species}</h3>
                            <p>{animal.generalInformation}</p>
                            <div class="box">
                            <div class="box">
                            <h3>info</h3>
                                <a  class="links"> <i class="fas fa-paw"></i>  <input type="text" placeholder="pet type eg. cat, dog" class="box" name = "type" defaultValue={animal.type} onChange={handlePostInput}/>  </a>
                                <a  class="links"> <i class="fas fa-dog"></i>  <input type="text" placeholder="pet species e.g. Bull dog" class="box" name = "species" defaultValue={animal.species}  onChange={handlePostInput}/></a>
                                <a  class="links"> <i class="fas fa-birthday-cake"></i> <input type="text" placeholder="Age of pet" class="box" name = "age" defaultValue={animal.age}  onChange={handlePostInput}/> </a>
                                <a  class="links"> <i class="fas fa-male"></i> <i class="fas fa-female"></i> <input type="text" placeholder="gender of pet" class="box" name = "gender" defaultValue={animal.gender}  onChange={handlePostInput}/></a>
                                <a  class="links"> <i class="fas fa-hospital"></i> <input type="text" placeholder="Pet medical condition" class="box" name = "medical_condition" defaultValue={animal.medical_condition} onChange={handlePostInput}/>  </a>
                                <a  class="links"> <i class="fas fa-map-marker-alt"></i> <input type="text" placeholder="location of pet" class="box" name = "location" defaultValue={postItem.lost_location} onChange={handlePostInput}/></a>

                                <a  class="links"> <i class="fab fa-font-awesome"></i>  <input type="checkbox" name="spay" id="spay" onChange={handleSpayInput}/> <label for="spay">Still spay</label></a>
                                <a  class="links"> <i class="fas fa-check"></i>   <input type="checkbox" name="found" id="found" onChange={handleSpayInput}/> <label for="found">FOUND!!</label></a>
                                

                            </div>
                            
                            <h3>contact info</h3>
                            <a class="links"> <i class="fas fa-phone"></i> --------- </a>
                            <a class="links"> <i class="fas fa-phone"></i> ----------- </a>
                            <a class="links"> <i class="fas fa-envelope"></i> --------- </a>
                            <a class="links"> <i class="fas fa-map-marker-alt"></i> ---------- </a>
                            </div>

                            {<Link to={{pathname:`/post/lost/${id}`}}> 
                            <input type="submit"  class="btn" onClick={postUploadHandler}/>
                            </Link>}
                        
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

export default UpdatePost

