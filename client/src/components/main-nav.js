import {NavLink} from "react-router-dom";
import React from "react";
import { useStoreContext } from "../utils/GlobalState";

const MainNav = () => {

  const [state] = useStoreContext();
  const { dataStore } = state

  const productionReady = dataStore.filter( x => x.status === 'production-ready').length

  return (
  <div className="nav-menu">
    <NavLink
      to="/"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      Dashboard
    </NavLink>
    <NavLink
      to="/production"
      exact
      className={`nav-button ${ productionReady > 0 && 'pulse'}`}
      activeClassName="nav-button-active"
    >
      Production
    </NavLink>
    <NavLink
      to="/archive"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      Archive
    </NavLink>
    <NavLink
      to="/add-new"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      Add New
    </NavLink>
    
    {/* <NavLink
      to="/profile"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      Profile
    </NavLink> */}
     
    {/* <NavLink
      to="/external-api"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      External API
    </NavLink> */}
  </div>
  )
};

export default MainNav;
