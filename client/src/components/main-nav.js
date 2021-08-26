import {NavLink} from "react-router-dom";
import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { FiPlusSquare, FiHome, FiCheck } from 'react-icons/fi'
import { HiOutlineArchive } from 'react-icons/hi'
import { VscGraph } from 'react-icons/vsc'
import { GiBrickWall } from 'react-icons/gi'
import { UPDATE_SEARCH } from '../utils/actions';

const MainNav = () => {

  const [state, dispatch] = useStoreContext();

  const productionReady = state.dataStore.filter( x => x.status === 'production-ready').length

  const materials = state.dataStore.filter( x => { 
    return x.statusMtl === 'need-order' || x.statusMtl === 'ordered'
  } ).length  

  console.log( materials )

  const clearSearchFilter = (e) => {
    dispatch({ 
      type: UPDATE_SEARCH,
      stringFilter: ''
    });
  }

  return (
  <div className="nav-menu">
    <NavLink
        to="/"
        exact
        className="nav-button"
        activeClassName="nav-button-active"
        onClick={ clearSearchFilter } 
      >
        <FiHome />All
    </NavLink>

    <NavLink
        to="/production"
        exact
        className={`nav-button ${ productionReady > 0 && 'pulse'}`}
        activeClassName="nav-button-active"
        onClick={ clearSearchFilter }
      >
        <FiCheck />Ready
    </NavLink>

    <NavLink
        to="/archive"
        exact
        className="nav-button"
        activeClassName="nav-button-active"
        onClick={ clearSearchFilter }
      >
        <HiOutlineArchive />Done
    </NavLink>

    <NavLink
        to="/add-new"
        exact
        className="nav-button"
        activeClassName="nav-button-active"
        onClick={ clearSearchFilter }
      >
      <FiPlusSquare />New
    </NavLink>

    <NavLink
        to="/mtl"
        exact
        className={`nav-button nomargin ${ materials > 0 && 'pulse'}`}
        activeClassName="nav-button-active"
        onClick={ clearSearchFilter }
      >
      <GiBrickWall />
    </NavLink>

    <NavLink
        to="/stats"
        exact
        className="nav-button nomargin"
        activeClassName="nav-button-active"
        onClick={ clearSearchFilter }
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
