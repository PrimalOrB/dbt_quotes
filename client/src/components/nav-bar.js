import React, { useEffect } from "react";
import { UPDATE_USER } from '../utils/actions';
import MainNav from "./main-nav";
import AuthNav from "./auth-nav";
import { useStoreContext } from "../utils/GlobalState";
import { useAuth0 } from "@auth0/auth0-react";



const NavBar = () => {

  const [state, dispatch] = useStoreContext();

  const { currentUser } = state;

  const { user } = useAuth0()

  useEffect(() => {
    if (user) {
      dispatch({
        type: UPDATE_USER,
        currentUser: user
      });
    }
  }, [user, dispatch]);


  return (
      <nav>
        <div className="container">
          <MainNav />
          <img src="https://deboertool.com/img/logo-white.png" alt="logo"/><br />
          <AuthNav />
        </div>
      </nav>
  );
};

export default NavBar;
