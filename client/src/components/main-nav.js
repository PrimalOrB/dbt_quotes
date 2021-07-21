import {NavLink} from "react-router-dom";
import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { FiPlusSquare, FiHome, FiCheck } from 'react-icons/fi'
import { HiOutlineArchive } from 'react-icons/hi'
import { VscGraph } from 'react-icons/vsc'

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
      <FiHome />Dashboard
    </NavLink>
    <NavLink
      to="/production"
      exact
      className={`nav-button ${ productionReady > 0 && 'pulse'}`}
      activeClassName="nav-button-active"
    >
      <FiCheck />Production
    </NavLink>
    <NavLink
      to="/archive"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      <HiOutlineArchive />Archive
    </NavLink>
    <NavLink
      to="/add-new"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
    <FiPlusSquare /> Add New
    </NavLink>

    <NavLink
      to="/stats"
      exact
      className="nav-button nomargin"
      activeClassName="nav-button-active"
    >
    <VscGraph />
    </NavLink>
    
    {/* <NavLink
      to="/profile"
      exact
      className="nav-button"
      activeClassName="nav-button-active"
    >
      Profile
    </NavLink> */}
  </div>
  )
};

export default MainNav;
