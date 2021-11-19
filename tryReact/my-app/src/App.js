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
                    <HomePage authen={authen} user={user}/>
                </Route>
                <Route exact path="/home">
                    <HomePage authen={authen} user={user}/>
                </Route>
                <Route exact path="/posts/adopt/:keyword">
                    <ReadAllPostAdopt authen={authen} user={user}/>
                </Route>
                <Route exact path="/posts/lost/:keyword">
                    <ReadAllPostLost  authen={authen} user={user}/>
                </Route>
                <Route exact path="/post/lost/:id" >
                    <ReadPostLost  authen={authen} user={user}/>
                </Route>
                <Route exact path="/post/adopt/:id" >
                    <ReadPostAdopt authen={authen} user={user}/>
                </Route>
                <Route exact path="/updatePost/:id">
                    <UpdatePost authen={authen} user={user}/>
                </Route>
                <Route exact path="/createPost">
                    <CreatePost authen={authen} user={user}/>
                </Route>
                <Route exact path="/register">
                    <Register authen={authen} user={user}/>
                </Route>
                <Route exact path="/login">
                    <Login authen={authen} user={user}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

