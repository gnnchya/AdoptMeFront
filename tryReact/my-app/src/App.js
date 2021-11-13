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
import React, { Component }  from 'react';

function App() {
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
            </Switch>
        </Router>
    )
}

export default App;

