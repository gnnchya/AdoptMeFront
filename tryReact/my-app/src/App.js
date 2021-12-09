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
import UpdatePostLost from './pages/updatePostLost';
import UpdatePostAdopt from './pages/updatePostAdopt';
import CreatePost from './pages/createPost';
import Register from './pages/register';
import Login from './pages/login';
import Adopted from './pages/adopted';
import Found from './pages/found';
import React, { Component }  from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import Amplify, { Auth } from 'aws-amplify'



function App() {

    const [authen, setAuthen] = useState(false) 
    const [user, setUser] = useState({}) 
    const [isAuthenticating, setAuthenticating ] = useState(true)

    useEffect(() => {
        componentDidMount()
    }, [])

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
    const handleAuthenticating = (e) => {
        setAuthenticating(e)
        // console.log("after", user)       
    }


    const componentDidMount = async (e) => {
        try{
        const session = await Auth.currentSession();
        handleAuthen(true);

        const user = await Auth.currentAuthenticatedUser();
        handleUser(user);
        console.log("from app", user);
        console.log("sub from:", user.attributes.sub )
        
        }
        catch(error){
            console.log(error);
        }
        handleAuthenticating(false);
    }

    const authProps = {
        authen,
        user,
        handleAuthen,
        handleUser
    }

    return (
        !isAuthenticating && 
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
                <Route exact path="/updatePostLost/:id">
                    <UpdatePostLost auth={authProps}/>
                </Route>
                <Route exact path="/updatePostAdopt/:id">
                    <UpdatePostAdopt auth={authProps}/>
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
                <Route exact path="/adopted/:id">
                    <Adopted auth={authProps}/>
                </Route>
                <Route exact path="/found/:id">
                    <Found auth={authProps}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

