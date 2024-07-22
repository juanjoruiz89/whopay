import React, { useContext, useEffect, useState } from 'react';
import { Switch, Link, useRouteMatch, Route, useNavigate, useHistory } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { ReactSVG } from "react-svg";
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import profileIcon from '../profile.svg'
import { ProtectedPage } from './ProtectedPage';
import { SignOutButton } from "../components/SignOutButton";
import { ExpensesPage } from "./ExpensesPage";
import { ManagerPage } from "./ManagerPage";
//const profileIcon = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.9 122.9" style="enable-background:new 0 0 122.9 122.9" xml:space="preserve"><g><path d="M61.4,0c17,0,32.3,6.9,43.4,18c11.1,11.1,18,26.5,18,43.4c0,17-6.9,32.3-18,43.4c-11.1,11.1-26.5,18-43.4,18 s-32.3-6.9-43.4-18C6.9,93.8,0,78.4,0,61.4c0-17,6.9-32.3,18-43.4C29.1,6.9,44.5,0,61.4,0L61.4,0z M41.3,54.3c-1.1,0-2,0.3-2.5,0.7 c-0.3,0.2-0.6,0.5-0.7,0.8c-0.2,0.4-0.3,0.8-0.2,1.4c0,1.5,0.8,3.5,2.4,5.8l0,0l0,0l5,8c2,3.2,4.1,6.5,6.8,8.9 c2.5,2.3,5.6,3.9,9.6,3.9c4.4,0,7.6-1.6,10.2-4.1c2.7-2.5,4.9-6,7-9.5l5.7-9.3c1.1-2.4,1.4-4,1.2-5c-0.1-0.6-0.8-0.8-1.8-0.9 c-0.2,0-0.5,0-0.7,0c-0.3,0-0.5,0-0.8,0c-0.2,0-0.3,0-0.4,0c-0.5,0-1,0-1.6-0.1l1.9-8.6c-14.4,2.3-25.2-8.4-40.4-2.1L43,54.4 C42.4,54.4,41.8,54.4,41.3,54.3L41.3,54.3L41.3,54.3L41.3,54.3z M18.8,95.7c7.1-2.5,19.6-3.8,25.4-7.7c1-1.3,2.1-2.9,3.1-4.3 c0.6-0.9,1.1-1.7,1.6-2.3c0.1-0.1,0.2-0.2,0.3-0.3c-2.4-2.5-4.4-5.5-6.3-8.5l-5-8C36,61.8,35,59.3,35,57.3c0-1,0.1-1.9,0.5-2.6 c0.4-0.8,1-1.5,1.7-2c0.4-0.2,0.8-0.5,1.2-0.6c-0.3-4.3-0.4-9.8-0.2-14.4c0.1-1.1,0.3-2.2,0.6-3.3c1.3-4.6,4.5-8.3,8.5-10.8 c1.4-0.9,2.9-1.6,4.6-2.2c2.9-1.1,1.5-5.5,4.7-5.6c7.5-0.2,19.8,6.2,24.6,11.4c2.8,3,4.6,7,4.9,12.3l-0.3,13.1l0,0 c1.4,0.4,2.3,1.3,2.7,2.7c0.4,1.6,0,3.8-1.4,6.9l0,0c0,0.1-0.1,0.1-0.1,0.2l-5.7,9.4c-2.2,3.6-4.5,7.3-7.5,10.1L73.7,82l0,0 c0.4,0.5,0.8,1.1,1.2,1.7c0.8,1.1,1.6,2.4,2.5,3.6c5.3,4.5,19.3,5.9,26.7,8.6c7.6-9.4,12.1-21.4,12.1-34.4c0-15.1-6.1-28.8-16-38.7 c-9.9-9.9-23.6-16-38.7-16s-28.8,6.1-38.7,16c-9.9,9.9-16,23.6-16,38.7C6.7,74.4,11.2,86.3,18.8,95.7L18.8,95.7z M77,90.5 c-1.4-1.6-2.8-3.7-4.1-5.5c-0.4-0.5-0.7-1.1-1.1-1.5c-2.7,2-6,3.3-10.3,3.3c-4.5,0-8-1.6-10.9-4.1c0,0,0,0.1-0.1,0.1 c-0.5,0.7-1,1.4-1.6,2.3c-1.1,1.6-2.3,3.3-3.4,4.8C45.6,100,71.1,106,77,90.5L77,90.5z"/></g></svg>'

export const DashboardPage = () => {
  const { path, url } = useRouteMatch();
  const { push } = useHistory();
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

  const logoutOnClick = async () => {
    await Auth.signOut();
    //alert("Signed out");
    push("/");
    //const navigate = useNavigate();
    //navigate('/')
  };

  const dataToShow = (user, isManager) => {
    return (
      <div>
        <div className="page-content">
          <div className="navbar">
            <ul className="pages-list">
              <Link to={`${url}/profile`}>
                <li>
                  {/* <ReactSVG src={profileIcon}/> */}
                  <span className='fa fa-user-circle-o'></span>
                  <span>Profile</span>
                </li>
              </Link>
              <Link to={`${url}/expenses`}>
                <li>
                  <span className='fa fa-file-text-o'></span>
                  <span>Expenses</span>
                </li>
              </Link>
              { isManager && (
              <Link to={`${url}/manager`}>
                <li>
                  <span className='fa fa-tasks'></span>
                  <span>Manager zone</span>
                </li>
              </Link>
              )}
            </ul>
            <div className="logout" onClick={logoutOnClick}>
              <li>
                <span className='fa fa-power-off'></span>
                <span>Logout</span>
              </li>
            </div>
          </div>
          <div className="content">
            <Switch>
              <Route path={`${path}/profile`}>
                <ExpensesPage user={user}/>
              </Route>
              <Route path={`${path}/expenses`}>
                <ExpensesPage user={user} />
              </Route>
              <Route path={`${path}/manager`}>
                <ManagerPage user={user}/>
              </Route>
            </Switch>
            {/* <ProtectedPage></ProtectedPage> */}
          </div>
        </div>
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
