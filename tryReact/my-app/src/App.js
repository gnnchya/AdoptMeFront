import './App.css';
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

    
    useEffect(() => {
        setDefault()
    }, [])

    const setDefault = async(e) => {
        setAuthen((oldValue) => ({ ...oldValue, ["isAuthen"]: false}))
    }
    //set authen status when user login 
    const handleAuthen = (e) => {
        e.preventDefault()
        setAuthen((oldValue) => ({ ...oldValue, ["isAuthen"]: true}))
    }
    //set user, take in user object from aws
    const handleAuthen = (e) => {
        e.preventDefault()
        setAuthen((oldValue) => ({ ...oldValue, ["isUser"]: user}))
    }




    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/home">
                    <HomePage />
                </Route>
                <Route exact path="/posts/adopt/:keyword">
                    <ReadAllPostAdopt />
                </Route>
                <Route exact path="/posts/lost/:keyword">
                    <ReadAllPostLost />
                </Route>
                <Route exact path="/post/lost/:id" >
                    <ReadPostLost />
                </Route>
                <Route exact path="/post/adopt/:id" >
                    <ReadPostAdopt />
                </Route>
                <Route exact path="/updatePost/:id">
                    <UpdatePost />
                </Route>
                <Route exact path="/createPost">
                    <CreatePost />
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

