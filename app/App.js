import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Administrador from './views/Administrador';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/home" exact component={Administrador} />
            </Switch>
        </Router>
    );
}

export default App;