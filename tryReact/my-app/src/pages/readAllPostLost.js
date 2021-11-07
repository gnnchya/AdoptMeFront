import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {readAllPost } from '../actions/posts'
// import PostList from '../components/PostList'

function ReadAllPostLost() {
    let limit = 100
    let {keyword, page} = useParams()

    const petType = keyword
    const [postItem, setPostItems] = useState([])
    useEffect(() => {
        getList()
    }, [])
    
    const getList = async (e) => {
        try {
            const response = await readAllPost('lost',String(keyword),limit,Number(page))
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
        this.setState({
            selectedFile : event.target.files[0]
        })
    }

    const postUploadHandler = event =>{
        try {
            event.preventDefault()
            const {url} = await generateUploadURL()
            var options = {
                headers: {
                'Content-Type': this.state.selectedFile.type
                }
            };

            this.setState({
                picURL : await uploadPic(url, this.state.selectedFile, options)
            })

            const tempAnimal = {type:"lost", age: +postInfo.age, species: postInfo.species, gender: postInfo.gender, generalInformation: postInfo.info,  spay: spay.spay, image: this.state.picURL, medical_condition: ""}
            const temp = {...postInfo, animal:tempAnimal, adopt: false}
            const response = await createPost(temp)
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




    return (
        <div>  
           <body>    
                <header class="header">
                
                    <a href="index.html" class="logo"> <i class="fas fa-paw"></i> Adopt </a>
                
                    <nav class="navbar">
                        <a href="/home">home</a>
                        <a href="/posts/adopt/all/1">Adoption</a>
                        <a href="/posts/lost/all/1">Lost</a>
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
                        {<Link to={`/posts/lost/${keyword}/1`}> 
                            // TODO button here
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
                                <p>Spay</p>
                                <input type="checkbox" id="spay" name="spay" onChange={handleSpayInput}/>
                                <label for="spay"> Still spay</label>
                                <p>Photo</p>
                                <input type="file" accept="image/png, image/jpeg" value="Add photo" class="pics" onChange={fileSelectedHandler}/>
                                                            
                            </div>
                        </div>
                        {<Link to="/posts/lost/all/1"> 
                            <input type="submit" value="Create" class="btn" onClick={postUploadHandler}/>
                        </Link>}
                        
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
                
                <section class="blogs" id="blogs">
                
                    <h1 class="heading"> our <span>lost and found</span> </h1>
                
                    <div class="box-container">

                    {postItem.map((item, index) => {
                        return (
                            <div class="box">
                                <Link to={{pathname:`/post/${item.id}`}} >
                                <img src={item.picURL} alt=""/>
                                <h3 key={index}>{item.type}</h3>
                                <p key={index}>{item.info}</p>
                                <a href={`/post/${item.id}`} class="btn">See more</a>
                                </Link>
                            </div>
                            )
                        })}

                        <div class="box">
                            <Link to={{pathname:`/post/${item.id}`}} >
                            {item.AnimalStruct.map((animal, index) => {
                                <img src={animal.image} alt=""/>

                            })}
                            
                            <div class="content">
                                <div class="icons">
                                    <a href="#" key={index}> <i class="fas fa-user" ></i> {item.user} </a>
                                    <a href="#" key={index}> <i class="fas fa-calendar"></i> {item.postAt} </a>
                                </div>
                                
                                {item.AnimalStruct.map((animal, index) => {
                                    <div>
                                        <h3 key={index}>{animal.name}</h3>
                                        <p key={index}>{animal.GeneralInformation} </p>
                                    </div>

                                })}
        
                                <a href={`/post/${item.id}`} class="btn">read more</a> 
                            </div>
                            </Link>
                        </div>
                
                
                    </div>
                
                </section>             
                
                
                <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
                
                <script src="script.js"></script>
                
                </body>

        </div>
       
    )
}

export default ReadAllPostLost