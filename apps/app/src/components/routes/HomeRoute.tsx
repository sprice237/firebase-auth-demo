import React from 'react';
import firebase from 'firebase';
import { Route } from 'react-router-dom';
import { RouteCmp } from '$types';
import Button from '@mui/material/Button';
import { useMeQuery } from '@sprice237/firebase-auth-demo-gql';

export const HomeRoute: RouteCmp = () => {
  const { data } = useMeQuery();
  const me = data?.me;

  const handleLogOut = async () => {
    await firebase.auth().signOut();
  };

  if (!me) {
    return null;
  }

  return (
    <>
      <p>
        Welcome, {me.name} ({me.email})
      </p>
      <Button variant="contained" color="primary" onClick={handleLogOut}>
        Log out
      </Button>
    </>
  );
};

HomeRoute.path = '/home';
HomeRoute.routes = [<Route exact path={HomeRoute.path} component={HomeRoute} />];
HomeRoute.allowAuthenticated = true;
