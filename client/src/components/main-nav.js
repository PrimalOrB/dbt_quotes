import {NavLink} from "react-router-dom";
import React from "react";

const MainNav = () => (
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
    </NavLink>
    <NavLink
      to="/external-api"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      External API
    </NavLink> */}
  </div>
);

export default MainNav;
