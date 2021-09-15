import React from 'react';
import firebase from 'firebase';
import { Route } from 'react-router-dom';
import { RouteCmp } from '$types';
import { useCurrentUser } from '$utils/firebase';
import { Button } from '@material-ui/core';

export const HomeRoute: RouteCmp = () => {
  const [user] = useCurrentUser();

  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <p>Welcome, {user.email}</p>
      <Button variant="contained" color="primary" onClick={handleLogOut}>
        Log out
      </Button>
    </>
  );
};

HomeRoute.path = '/home';
HomeRoute.routes = [<Route exact path={HomeRoute.path} component={HomeRoute} />];
HomeRoute.allowAuthenticated = true;
