import React from "react";
import AuthenticationButton from "./authentication-button";
import { useAuth0 } from "@auth0/auth0-react";

const AuthNav = () => {
    const { user } = useAuth0();

    if( user ){
        const { given_name, picture } = user;
        return (
        
            <div className="access-block">
                <div className="profile-img">
                    <img
                        src={picture}
                        alt="Profile"
                    />
                </div>
                <h2>{given_name}</h2>
                <AuthenticationButton />
            </div>
        )
    }

    return (
            <div className="access-block">
                <AuthenticationButton />
            </div>
    )

};

export default AuthNav;
