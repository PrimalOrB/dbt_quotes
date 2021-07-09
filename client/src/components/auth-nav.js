import React from "react";
import AuthenticationButton from "./authentication-button";
import { useAuth0 } from "@auth0/auth0-react";

const AuthNav = () => {
    const { user } = useAuth0();

    if( user ){
        const { given_name, picture } = user;
        return (
        
            <div className="navbar-nav ml-auto">
                <div className="col-md-2 mb-3">
                    <img
                        src={picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </div>
                <h2>{given_name}</h2>
                <AuthenticationButton />
            </div>
        )
    }

    return (
            <div className="navbar-nav ml-auto">
                <AuthenticationButton />
            </div>
    )

};

export default AuthNav;
