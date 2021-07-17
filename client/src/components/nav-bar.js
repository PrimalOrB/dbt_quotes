import React, { useEffect } from "react";
import { UPDATE_USER, UPDATE_DATASTORE } from '../utils/actions';
import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { useStoreContext } from "../utils/GlobalState";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from '@apollo/client';
import { QUERY_QUOTES } from '../utils/queries';
import Loading from "./loading";

const NavBar = () => {

  const [, dispatch] = useStoreContext();

  // add user to global state
  const { user } = useAuth0()
  useEffect(() => {
    if (user) {
      dispatch({
        type: UPDATE_USER,
        currentUser: user
      });
    }
  }, [user, dispatch]);

  // add quotes to global state
  const { loading, data } = useQuery(QUERY_QUOTES);
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
    {loading ? (
      <Loading />
    ) : (
      <nav>
        <div className="container">
          <MainNav />
          <img src="https://deboertool.com/img/logo-white.png" alt="logo"/><br />
          <AuthNav />
        </div>
      </nav>
    )}
    </>
  );
};

export default NavBar;
