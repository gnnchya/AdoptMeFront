import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updatePostLost} from '../actions/posts'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify'

function UpdatePostLost(props) {

    let {id} = useParams("id")
    console.log("iddd", id)
    const history = useHistory();

    const [postInfo, setPostInfo] = useState("") 
    const [spay, setSpay] = useState(false)

    const [postItem, setPostItems] = useState({})
    const [userItem, setUserItems] = useState({})
    const [animal, setAnimal] = useState({})

    const handleLogout = (e) => {
        try{
            Auth.signOut();
            props.auth.handleAuthen(false);
            props.auth.handleUser(null);
        }catch(error){
            console.log(error.message);
        } 
    }

    useEffect(() => {
        getList()
    }, [])

    const getList = async (e) => {
        try {
            axios.get(`http://localhost:8080/AdoptMe/LostPetPost/${id}`
            ).then((response) => {
                console.log(response);
                setPostItems(response.data.data)
                setAnimal(response.data.data.animal)
                setPostInfo(response.data.data.animal)
                // setPostInfo((oldValue) => ({ ...oldValue, ["lost_location"]: String(postItem.lost_location)}))
                // setPostInfo((oldValue) => ({ ...oldValue, ["type"]: postItem.type}))
                // setPostInfo((oldValue) => ({ ...oldValue, ["age"]: postItem.age}))
                // setPostInfo((oldValue) => ({ ...oldValue, ["species"]: postItem.species}))
                // setPostInfo((oldValue) => ({ ...oldValue, ["gender"]: postItem.gender}))
                // setPostInfo((oldValue) => ({ ...oldValue, ["general_information"]: postItem.general_information}))
                // setPostInfo((oldValue) => ({ ...oldValue, ["medical_condition"]: postItem.medical_condition}))
                setSpay((oldValue) => ({ ...oldValue, ["spay"]: Boolean(animal.spay )}))
                setSpay((oldValue) => ({ ...oldValue, ["found"]: Boolean(postItem.found )}))

                axios.get(`http://localhost:8080/AdoptMe/UserInfo/${response.data.data.uid}`
                ).then((response) => {
                    console.log(response);
                    setUserItems(response.data.data)
                    // postItem.UID to get UID
                    console.log(userItem)
                })
               
            })

        } catch (error) {
            alert(error)
        }
    }


    const handlePostInput = (e) =>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setPostInfo((oldValue) => ({ ...oldValue, [name]: String(value) }))
    }

   
    const handleSpayInput = (e) =>{
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setSpay((oldValue) => ({ ...oldValue, [name]: value }))
    }

    function handleSubmission(){
        console.log("here")
        if (postInfo.type === ''){
            console.log("type")
            return true

        }
        if (postInfo.age === ''){
            console.log("age")
            return true
        }
        if (postInfo.species === ''){
            console.log("species")
            return true
        }
        if (postInfo.gender === ''){
            console.log("gender")
            return true
        }
        if (postInfo.general_information === ''){
            console.log("gen")
            return true
        }
        if (postInfo.medical_condition === ''){
            console.log("med")
            return true
        }
        else{
            return false
        }
    }

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year  ;
        return time;
      }

    const postUploadHandler = async (event) =>{
        try {
            // event.preventDefault()
            const tempAnimal = {type: String(postInfo.type), age: +postInfo.age, species: String(postInfo.species)
                , gender: String(postInfo.gender), general_information: String(postInfo.general_information),  spay: Boolean(spay.spay)
                ,image: String(animal.image), medical_condition: String(postInfo.medical_condition)}
            const temp = {...postItem, id: String(postItem.id) , uid: String(postItem.uid), animal:tempAnimal, found: Boolean(spay.found)
                        , lost_location:String( postItem.lost_location), post_at : +postItem.post_at
                        , update_at : +postItem.update_at, delete_at : +postItem.delete_at}
            await updatePostLost(temp)

            console.log(temp)
            
            history.push({pathname:`/post/lost/${id}`})
            

        } catch (error) {

            alert( error)
        }
        event.preventDefault()

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
                    {/* {<Link to={{pathname:"/createPost"}}> 
                        <div class="fas fa-pen" id="create-btn" ></div>
                    </Link>} */}

                    {/* hide login button when logged in */}
                    {!props.auth.authen && (
                        <div>
                        {<Link to={{pathname:"/login"}}> 
                            <div class="fas fa-user" id="login-btn" ></div>
                        </Link>}
                        </div>
                    )}
                    
                    {props.auth.authen &&props.auth.user && (
                        <div>
                            {<Link to={{pathname:"/createPost"}}> 
                                <div class="fas fa-pen" id="create-btn" ></div>
                            </Link>}

                            {/* logout button*/}
                            {<Link to={{pathname:"/home"}}> 
                                <div class="fas fa-door-open" id="login-btn" onClick={handleLogout} ></div>     
                            </Link>}

                            {/* show hello username */}
                            <p>
                                Hello {props.auth.user.username}
                            </p>
                        </div>
                        )}
            </div>            
            </header>
            
            
            <h1 class="heading"> our <span>lost and found</span> </h1>
            <section class="blogs" id="blogs">
            
                <h1 class="heading"> our <span>lost and found</span> </h1>
            
                <div class="box-container">
        
                    <div class="box">
                        <div class="content">
                            <div class="icons">
                                <a > <i class="fas fa-user"></i> {userItem.name}</a>
                                <a > <i class="fas fa-calendar"></i> {timeConverter(postItem.post_at)} </a>
                            </div>
                            <h3>{animal.species}</h3>
                            <p>{animal.generalInformation}</p>
                            <div class="box">
                            <h3>info</h3>
                                <a  class="links"> <i class="fas fa-paw"></i>  <input type="text" placeholder="pet type eg. cat, dog" class="box" name = "type" defaultValue={animal.type} onChange={handlePostInput}/>  </a>
                                <a  class="links"> <i class="fas fa-dog"></i>  <input type="text" placeholder="pet species e.g. Bull dog" class="box" name = "species" defaultValue={animal.species}  onChange={handlePostInput}/></a>
                                <a  class="links"> <i class="fas fa-birthday-cake"></i> <input type="text" placeholder="Age of pet" class="box" name = "age" defaultValue={animal.age}  onChange={handlePostInput}/> </a>
                                <a  class="links"> <i class="fas fa-male"></i> <i class="fas fa-female"></i> <input type="text" placeholder="gender of pet" class="box" name = "gender" defaultValue={animal.gender}  onChange={handlePostInput}/></a>
                                <a  class="links"> <i class="fas fa-hospital"></i> <input type="text" placeholder="Pet medical condition" class="box" name = "medical_condition" defaultValue={animal.medical_condition} onChange={handlePostInput}/>  </a>
                                {/* <a  class="links"> <i class="fas fa-map-marker-alt"></i> <input type="text" placeholder="location of pet" class="box" name = "lost_location" defaultValue={postItem.lost_location} onChange={handlePostInput}/></a> */}

                                <a  class="links"> <i class="fas fa-paw"></i>  <input type="text" placeholder="General Information" class="box" name = "general_information" defaultValue={animal.general_information} onChange={handlePostInput}/>  </a>

                                <a  class="links"> <i class="fab fa-font-awesome"></i>  <input type="checkbox" name="spay" id="spay" onChange={handleSpayInput}/> <label for="spay">Still spay</label></a>
                                <a  class="links"> <i class="fas fa-check"></i>   <input type="checkbox" name="found" id="found" onChange={handleSpayInput}/> <label for="found">FOUND!!</label></a>
                            
                            </div>
                            
                            <h3>contact info</h3>
                            <a href="#" class="links"> <i class="fas fa-phone"></i> {userItem.name} </a>
                            <a href="#" class="links"> <i class="fas fa-envelope"></i> {userItem.email} </a>
                            <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> {userItem.address}  </a>

                            <input type="submit"  disabled={handleSubmission()} class="btn" onClick={postUploadHandler}/>

                        
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

export default UpdatePostLost

