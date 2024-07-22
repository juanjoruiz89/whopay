import React, { useContext, useEffect, useState } from 'react';
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from '@aws-amplify/auth';
import { Switch, Link, useRouteMatch, Route } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { UserPage } from "./UserPage";
import { ManagerPage } from "./ManagerPage";
import { SignOutButton } from "../components/SignOutButton";
import AWS from 'aws-sdk';

export const ProtectedPage = () => {
  const { path, url } = useRouteMatch();
  const [accessToken, setAccessToken] = useState("");
  const { UserData, setUserData } = useContext(UserContext);
  function userObj(user) {
    const session = user.getSignInUserSession();
    if (!session) {
    }
    else {
      let accessToken = session.getAccessToken().jwtToken;
    }
    let accessToken = session.getAccessToken().jwtToken;
    return (
      userObj = {
        id: user.attributes.sub,
        nickName: user.attributes.nickname,
        name: user.attributes.name,
        email: user.attributes.email,
        role: 'test',
        manager: '',
        accessToken: accessToken
      }
    );
  }
  
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async user => await setUserData(userObj(user)))
      .catch(() => setUserData(null));
  }, []);

  const dataToShow = (user, isManager) => {
    let UserData2 = {};
    if (UserData != null)
      UserData2 = UserData;
    else
      UserData2 = {
        id: user.attributes.sub,
        nickName: user.attributes.nickname,
        name: user.attributes.name,
        email: user.attributes.email,
        role: '',
        manager: '',
        accessToken: ''
      }
    return (
        <div>
            <div>
              <SignOutButton />
            </div>
            <h3>Protected Page</h3>
            <div>
              <span>Hi, {UserData2.name} ({UserData2.nickName})</span><br></br>
              <span>Manager: {UserData2.manager}</span>
            </div>
            <div>
              <ul>
                <li>
                  <Link to={`${url}`}>User</Link>
                </li>
                {isManager && (
                  <li>
                    <Link to={`${url}/manager`}>Admin</Link>
                  </li>
                )}
              </ul>
            </div>
            <hr />
            <Switch>
              <Route path={`${path}`} exact>
                <UserPage />
              </Route>
              <Route path={`${path}/manager`}>
                <ManagerPage />
              </Route>
            </Switch>
          </div>
      )
    }
  return (
    <Authenticator signUpAttributes={['name','nickname']}>
      {({ user }) => {
        const session = user.getSignInUserSession();
        if (!session) throw new Error("SignInSession is empty!");
        //setAccessToken(session.getAccessToken());
        const accessToken2 = session.getAccessToken();
        const groups = accessToken2.payload["cognito:groups"] || [];
        const isManager = true;//groups.includes("admin");
        return (
          dataToShow(user, isManager)
        );
      }}
  </Authenticator>
  );
};


// THINGS TO BE DONE
/*
FORM 




<div>
            <div>
              <SignOutButton />
            </div>
            <h3>Protected Page</h3>
            <div>
              <span>Hi, {UserData.name} ({UserData.nickName})</span><br></br>
              <span>Manager: {UserData.manager}</span>
            </div>
            <div>
              <span>{`Your group is ${
                groups.length > 0 ? groups : "user"
              }`}</span>
              <ul>
                <li>
                  <Link to={`${url}`}>User</Link>
                </li>
                {isAdmin && ( //isAdmin
                  <li>
                    <Link to={`${url}/admin`}>Admin</Link>
                  </li>
                )}
              </ul>
            </div>
            <hr />
            <Switch>
              <Route path={`${path}`} exact>
                <UserPage />
              </Route>
              <Route path={`${path}/admin`}>
                <AdminPage />
              </Route>
            </Switch>
          </div>
*/