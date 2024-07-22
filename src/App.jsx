import React, { useContext, useEffect } from 'react';
import { Amplify } from "aws-amplify";
import Auth from '@aws-amplify/auth';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { PublicPage } from "./pages/PublicPage";
import { ProtectedPage } from "./pages/ProtectedPage";
import { DashboardPage } from "./pages/DashboardPage";
import logo from './whopay-logo.png'

Amplify.configure({
  Auth: {
    userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
  },
});

export default function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='app'>
        <div className="upper-menu">
          <div className="upper-menu-left">
            <a href="/"><img src={logo}></img></a>
          </div>
          <div className="upper-menu-right">
            <Link to="/dashboard"><button className="button-29">Dashboard</button></Link>
          </div>
        </div>
        {/* <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard Page</Link>
          </li>
        </ul> */}
        <Switch>
          <Route exact path="/">
            <PublicPage />
          </Route>
          <Route path="/protected">
            <ProtectedPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
