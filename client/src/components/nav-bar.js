import React, { useEffect } from "react";
import { UPDATE_USER, UPDATE_DATASTORE } from '../utils/actions';
import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { useStoreContext } from "../utils/GlobalState";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_QUOTES } from '../utils/queries';
import { LOGIN_USER } from '../utils/mutations'
import Loading from "./loading";
import Auth from '../utils/auth';

const NavBar = () => {

  const [, dispatch] = useStoreContext();

  const [login, { error }] = useMutation(LOGIN_USER);

  // add user to global state
  const { user } = useAuth0()
  useEffect(() => {
    if (user) {
      tryLogin( user )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);


  const tryLogin = async ()  => {
    try {
      const { data } = await login({
        variables: {email: user.email }
      });
      Auth.login( data.login.token );

      let permissionsAuth = {
        data: {
          userPermissions: []
        }
      }

      permissionsAuth = Auth.getProfile( data.login.token )

      let userData = { user: user, permissions: permissionsAuth.data.userPermissions }

      dispatch({
        type: UPDATE_USER,
        currentUser: userData
      });
    } catch (e) {
      console.error(e);
    }
  };


  // refresh query every 5 minutes
  const { loading, data } = useQuery(QUERY_QUOTES,{pollInterval: 300000});
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_DATASTORE,
        dataStore: data.quotes
      });
    }
  }, [data, dispatch]);

  return (
    <>
    {loading || error ? (
      <Loading />
    ) : (
      <nav>
        <div className="container">
          <MainNav />
          <img id="logo" src="https://deboertool.com/img/logo-white.png" alt="logo"/><br />
          <AuthNav />
        </div>
      </nav>
    )}
    </>
  );
};

export default NavBar;
