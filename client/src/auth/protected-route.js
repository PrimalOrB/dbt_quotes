import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../components/index";
import { useStoreContext } from "../utils/GlobalState";

const ProtectedRoute = ({ component, ...args }) => {

  const [ state, ] = useStoreContext();
  const { currentUser } = state

  let authorized = false

  if( currentUser?.permissions ){
    authorized = true
  }

  if( authorized ){ 
    return (
      <Route
        component={withAuthenticationRequired(component, {
          onRedirecting: () => <Loading />,
        })}
        {...args}
      />
    )
  } else {
    return <Route to="/"/>
  }

};

export default ProtectedRoute;
