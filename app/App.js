import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Login from "./views/Login";
import SignUp from "./views/SignUp";

function App() {
    return (
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
        </Router>
    );
}

export default App;