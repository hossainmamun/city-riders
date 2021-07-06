import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Component/Home/Home.js';
import Header from './Component/Header/Header.js';
import NotFound from './Component/NotFound/NotFound.js';
import Destination from './Component/Destination/Destination.js';
import LoginSignUp from './Component/LoginSignUp/LoginSignUp.js';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute.js';

export const userContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/destination/">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/login">
              <LoginSignUp></LoginSignUp>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
