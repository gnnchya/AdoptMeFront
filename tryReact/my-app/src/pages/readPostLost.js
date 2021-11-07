import React, { useState, useEffect } from 'react'
import testUtils from 'react-dom/test-utils';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createPost, getEachMenu, addToCart } from '../actions/posts'
// import PostList from '../components/PostList'
export default MenuInfo

function MenuInfo() {
    // const customer_id = "c3ok6a2mvdvh8i865tag"

    const [menuItem, setMenuItems] = useState([])
    const [menu, setMenu] = useState([])
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState()
    const [cart, setCart] = useState([])
    useEffect(() => {
        getList()
    }, [])
    let {id} = useParams("id")
    console.log("iddd", id)
    const getList = async (e) => {
        try {
            const response = await getEachMenu(id)
            console.log(response.data.data)
            // alert(response.data.data[0])
            if (response.status === 200) {
                setMenuItems(response.data.data || [])
            }

        } catch (error) {
            alert(error)
        }
    }

    const addCart = async (e) => {
        try {
            e.preventDefault()
            console.log("menuItem", menuItem)
            const temp = {_id:menuItem.id, category: menuItem.category, name:menuItem.name, ingredient:menuItem.ingredient, price:+menuItem.price, available:menuItem.available, amount:+amount, option:description}

            let tempMenu = [...menu]
            tempMenu = menu.push(temp)
            const cartData = {_id: "c3ok6a2mvdvh8i865ta0", customer_id: "c3ok6a2mvdvh8i865tag", menu: menu}
            let test2 = [...cart]
            test2 = cart.push(cartData)
            // setCart(cartData)
            console.log("cart", cart)
            // const response = await addToCart({id:id, menu:cart})
            const response = await addToCart(id, cart[0])
            console.log(response.data.data)
            // alert(response.data.data[0])
            // if (response.status === 200) {
            //     setCart(response.data.data || [])
            // }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <body>

            <header class="header">

                <a href="#home" class="logo"> <i class="fas fa-paw"></i> Adopt </a>

                <nav class="navbar">
                    <a href="index.html">home</a>
                    <a href="adoption.html">Adoption</a>
                    <a href="lost.html">Lost</a>
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


            <section class="info" id="info">

                <h1 class="heading"> customer's <span>info</span> </h1>

                <div class="swiper info-slider">

                    <div class="swiper-wrapper">

                        <div class="swiper-slide box">
                            <img src="https://wallpaperaccess.com/full/506691.jpg" alt=""/>

                            <div class="box">
                                <h3>info</h3>
                                <a href="#" class="links"> <i class="fas fa-paw"></i> Type </a>
                                <a href="#" class="links"> <i class="fas fa-birthday-cake"></i> age of pet </a>
                                <a href="#" class="links"> <i class="fas fa-male"></i> <i class="fas fa-female"></i> male or female </a>
                                <a href="#" class="links"> <i class="fab fa-font-awesome"></i> spay </a>
                                <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> bkk, th </a>
                                <a href="#" class="links"> <i class="fas fa-check"></i>available  </a>
                            </div>

                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.</p>
                            <h3>Dog</h3>

                            <a  type = "submit"
                            href="#" class="btn">Adopt</a>
                        
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

