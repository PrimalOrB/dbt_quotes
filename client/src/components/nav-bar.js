import React from "react";

import MainNav from "./main-nav";
import AuthNav from "./auth-nav";


const NavBar = () => {
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
