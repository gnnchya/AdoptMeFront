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
import ReadPost from './pages/readPostLost';
import UpdatePost from './pages/updatePost';
import React, { Component }  from 'react';

function App() {
    return (
        // <TestAxios></TestAxios>
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/home">
                    <HomePage />
                </Route>
                <Route exact path="/posts/adopt/dog/:page">
                    <ReadAllPostAdopt />
                </Route>
                <Route exact path="/posts/adopt/cat/:page">
                    <ReadAllPostAdopt />
                </Route>
                <Route exact path="/posts/adopt/bunny/:page">
                    <ReadAllPostAdopt />
                </Route>
                <Route exact path="/posts/lost/lost/:page">
                    <ReadAllPostLost />
                </Route>
                <Route exact path="/post/:id" >
                    <ReadPost />
                </Route>
                <Route exact path="/updatePost/:id">
                    <UpdatePost />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;

