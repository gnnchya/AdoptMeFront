import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import {Link} from "react-router-dom";

function HomePage(){
    return(
        <div>
           <body>
            <header class="header">
            
                <a href="#home" class="logo"> <i class="fas fa-paw"></i> Adopt </a>
            
                <nav class="navbar">
                    <a href="#home">home</a>
                    <a href="#adoption">Adoption</a>
                    <a href="#blogs">Lost</a>
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
            
            <section class="home" id="home">
            
                <div class="content">
                    <h3>Adopt and <span>help</span> animal</h3>
                    <p>With more adoptable pets than ever, we have an urgent need for pet adopters. Search for dogs, cats, and other available pets for adoption near you.</p>
                    <a href="#adoption" class="btn">adoption</a>
                </div>
            
            </section>
            
            <section class="adoption" id="adoption">
            
                <h1 class="heading"> our <span>Adoption</span> </h1>
            
                <div class="box-container">
            
                    <div class="box">
                        <img src="https://cdn-icons.flaticon.com/png/512/3093/premium/3093463.png?token=exp=1636225889~hmac=3ac19dafd1d886e7605b29bb4d186449" alt=""/>
                        <h3>Dog</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!</p>
                        <a href="adoption.html" class="btn">See more</a>
                    </div>
            
                    <div class="box">
                        <img src="https://cdn-icons.flaticon.com/png/512/906/premium/906265.png?token=exp=1636225948~hmac=7cc5c0accba656d3af432ddd081649fc" alt=""/>
                        <h3>Cat</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!</p>
                        <a href="adoption.html" class="btn">See more</a>
                    </div>
            
                    <div class="box">
                        <img src="https://cdn-icons-png.flaticon.com/512/185/185810.png" alt=""/>
                        <h3>Bunny</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!</p>
                        <a href="adoption.html" class="btn">See more</a>
                    </div>
            
                </div>
            
            </section>

            <section class="blogs" id="blogs">
            
                <h1 class="heading"> our <span>lost and found</span> </h1>
            
                <div class="box-container">
            
                    <div class="box">
                        <img src="https://wallpaperaccess.com/full/506691.jpg" alt=""/>
                        <div class="content">
                            <div class="icons">
                                <a href="#"> <i class="fas fa-user"></i> by user </a>
                                <a href="#"> <i class="fas fa-calendar"></i> 1st January, 2000 </a>
                            </div>
                            <h3>Funny dog</h3>
                            <p>Dog around the beach.</p>
                            <a href="#" class="btn">read more</a>
                        </div>
                    </div>
            
                    <div class="box">
                        <img src="https://images.wallpaperscraft.com/image/single/dog_black_underwater_swimming_water_74417_300x168.jpg" alt=""/>
                        <div class="content">
                            <div class="icons">
                                <a href="#"> <i class="fas fa-user"></i> by user </a>
                                <a href="#"> <i class="fas fa-calendar"></i> 1st Febuary, 2000 </a>
                            </div>
                            <h3>Dog</h3>
                            <p>Swimming at samui be like.</p>
                            <a href="#" class="btn">read more</a>
                        </div>
                    </div>
            
                    <div class="box">
                        <img src="https://coolwallpapers.me/picsup/5048351-dog-golden-retriever-headphones-pet.jpg" alt=""/>
                        <div class="content">
                            <div class="icons">
                                <a href="#"> <i class="fas fa-user"></i> by user </a>
                                <a href="#"> <i class="fas fa-calendar"></i> 1st may, 2021 </a>
                            </div>
                            <h3>doggie</h3>
                            <p>let me goooo.</p>
                            <a href="#" class="btn">read more</a>
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

export default HomePage