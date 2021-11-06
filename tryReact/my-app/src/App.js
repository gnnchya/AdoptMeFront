import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom"; 
import HomePage from './pages/homePage';
import ReadAllPost from './pages/readAllPost';
import ReadPost from './pages/readPost';
import UpdatePost from './pages/updatePost';
import CreatePost from './pages/createPost';
import DeletePost from './pages/deletePost';
import SearchPost from './pages/searchPost'
import FilterPost from './pages/filterPost'
import React, { Component }  from 'react';

function App() {
    return (
        // <TestAxios></TestAxios>
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/homepage">
                    <HomePage />
                </Route>
                <Route exact path="/posts/:page">
                    <ReadAllPost />
                </Route>
                <Route exact path="/post/:id" >
                    <ReadPost />
                </Route>
                <Route exact path="/post/:id">
                    <UpdatePost />
                </Route>
                <Route exact path="/createPost">
                    <CreatePost />
                </Route>
                <Route exact path="/deletePost/:id">
                    <DeletePost />
                </Route>
                <Route exact path="/searchPost/:keyword">
                    <SearchPost />
                </Route>
                <Route exact path="/filterPost">
                    <FilterPost />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

