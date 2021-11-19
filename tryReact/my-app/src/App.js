import './App.css';
import { useState, useEffect } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom"; 
import HomePage from './pages/homePage';
import ReadAllPostAdopt from './pages/readAllPostAdopt';
import ReadAllPostLost from './pages/readAllPostLost';
import ReadPostLost from './pages/readPostLost';
import ReadPostAdopt from './pages/readPostAdopt';
import UpdatePost from './pages/updatePost';
import CreatePost from './pages/createPost';
import Register from './pages/register';
import Login from './pages/login';
import React, { Component }  from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';

function App() {

    const [authen, setAuthen] = useState(false) 
    const [user, setUser] = useState({}) 
    // useEffect(() => {
    //     setDefault()
    // }, [])

    // const setDefault = async(e) => {
    //     setAuthen(false)
    // }
    
    //set authen status when user login 
    const handleAuthen = (e) => {
        setAuthen(e)
        // console.log("after", authen)
    }
    //set user, take in user object from aws
    const handleUser = (e) => {
        setUser(e)
        // console.log("after", user)    
    }


    const authProps = {
        authen,
        user,
        handleAuthen,
        handleUser
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage auth={authProps}/>
                </Route>
                <Route exact path="/home">
                    <HomePage auth={authProps}/>
                </Route>
                <Route exact path="/posts/adopt/:keyword">
                    <ReadAllPostAdopt auth={authProps}/>
                </Route>
                <Route exact path="/posts/lost/:keyword">
                    <ReadAllPostLost auth={authProps}/>
                </Route>
                <Route exact path="/post/lost/:id" >
                    <ReadPostLost auth={authProps}/>
                </Route>
                <Route exact path="/post/adopt/:id" >
                    <ReadPostAdopt auth={authProps}/>
                </Route>
                <Route exact path="/updatePost/:id">
                    <UpdatePost auth={authProps}/>
                </Route>
                <Route exact path="/createPost">
                    <CreatePost auth={authProps}/>
                </Route>
                <Route exact path="/register">
                    <Register auth={authProps}/>
                </Route>
                <Route exact path="/login">
                    <Login auth={authProps}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

