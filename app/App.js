import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Hola from "./views/Login";
function App() {
  return (
    <Router>
      <Route path="/" exact component={Hola} />
    </Router>
  );
}

export default App;